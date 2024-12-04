import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const UploadFileServices = async (req) => {
    try {
        const { totalChunks, currentChunk, fileName } = req.body;

        if (!req.files || !req.files.chunk) {
            console.log("No file chunk uploaded");
            return { status: "fail", data: "No file chunk uploaded" };
        }

        const chunk = req.files.chunk;
        const __dirname = path.resolve();
        const uploadDir = path.join(__dirname, "/uploadFile/");

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Temporary file path for this chunk
        const tempChunkPath = path.join(uploadDir, `${fileName}_chunk_${currentChunk}`);
        await chunk.mv(tempChunkPath);

        console.log(`Chunk ${currentChunk} of ${totalChunks} uploaded for file ${fileName}`);

        // If it's the last chunk, combine all chunks into the final file
        if (parseInt(currentChunk, 10) === parseInt(totalChunks, 10)) {
            const finalFilePath = path.join(uploadDir, fileName);
            const writeStream = fs.createWriteStream(finalFilePath);

            for (let i = 1; i <= totalChunks; i++) {
                const chunkPath = path.join(uploadDir, `${fileName}_chunk_${i}`);
                const data = fs.readFileSync(chunkPath);
                writeStream.write(data);
                fs.unlinkSync(chunkPath); // Remove chunk file after writing
            }

            writeStream.end();

            // Save the file path in the database
            const relativeFilePath = `/uploadFile/${fileName}`;
            const upload = await prisma.files.create({
                data: {
                    userId: parseInt(req.headers.user_id),
                    files: relativeFilePath,
                },
            });

            console.log("File reassembled and saved:", fileName);
            return { status: "success", data: upload };
        }

        return { status: "success", data: `Chunk ${currentChunk} uploaded successfully` };
    } catch (e) {
        console.error("Error in UploadFileServices:", e);
        return { status: "fail", data: e.message };
    }
};

export { UploadFileServices };
