import {PrismaClient} from "@prisma/client";
import path from "path";

let prisma = new PrismaClient();


const UploadFileServices = async (req) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
           console.log('no file upload')
        }
        const currentTimestamp = Date.now();
        let uploadedFile = req.files['files'];
        const __dirname = path.resolve();
        const uploadPath = path.join(__dirname, '/uploadFile/', `${currentTimestamp}_${uploadedFile.name}`);
        console.log("uploadPath :",uploadPath)
        await uploadedFile.mv(uploadPath);

        const relativeFilePath = `/uploadFile/${currentTimestamp}_${uploadedFile.name}`;

        let upload =await prisma.files.create({
            data: {
                userId:parseInt(req.headers.user_id),
                files: relativeFilePath,
            },
        });
        return {status: "success", data: upload};

        }catch(e){
            console.error("Error in DetailsService:", e);
            return { status: "fail", data: e.message };
        }
    };

export {UploadFileServices};