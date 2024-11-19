import {PrismaClient} from "@prisma/client";
import path from "path";

let prisma = new PrismaClient();


const UploadFileServices = async (req) => {
    try {
        // Check if files are provided in the request
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No files uploaded');
            return { status: "fail", data: "No files uploaded" };
        }

        const uploadedFiles = req.files['files'];
        const __dirname = path.resolve();

        // Ensure `uploadedFiles` is treated as an array
        const filesArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
        const uploadsData = [];

        for (const file of filesArray) {
            const currentTimestamp = Date.now();
            const uploadPath = path.join(__dirname, '/uploadFile/', `${currentTimestamp}_${file.name}`);
            console.log("uploadPath :", uploadPath);

            // Move the file to the desired upload directory
            await file.mv(uploadPath);

            const relativeFilePath = `/uploadFile/${currentTimestamp}_${file.name}`;

            // Save file information to the database using Prisma
            const upload = await prisma.files.create({
                data: {
                    userId: parseInt(req.headers.user_id),
                    files: relativeFilePath,
                },
            });

            uploadsData.push(upload);
        }

        return { status: "success", data: uploadsData };

    } catch (e) {
        console.error("Error in UploadFileServices:", e);
        return { status: "fail", data: e.message };
    }
};


export {UploadFileServices};