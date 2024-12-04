import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from "../../../../config.js";

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const chunkSize = 1024 * 1024; // 1MB chunks
        for (const file of files) {
            const totalChunks = Math.ceil(file.size / chunkSize);
            console.log("TotalChunk : ",totalChunks);
            let startByte = 0;

            for (let i = 1; i <= totalChunks; i++) {
                const endByte = Math.min(startByte + chunkSize, file.size);
                const chunk = file.slice(startByte, endByte);
                await uploadChunk(chunk, totalChunks, i, file.name);
                startByte = endByte;
            }
        }

        console.log("All files uploaded successfully");
        toast.success("All files uploaded successfully!");
    };

    const uploadChunk = async (chunk, totalChunks, currentChunk, fileName) => {
        try {
            const formData = new FormData();
            formData.append("chunk", chunk);
            formData.append("totalChunks", totalChunks);
            formData.append("currentChunk", currentChunk);
            formData.append("fileName", fileName);

            const res = await axios.post(`${BASE_URL}/api/v1/uploadFile`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.status === "success") {
                console.log(`Chunk ${currentChunk} of ${fileName} uploaded successfully`);
            }
        } catch (e) {
            toast.error("Error uploading chunk");
            console.error("Error uploading chunk:", e);
        }
    };

    return (
        <div className="container mt-5 p-4 shadow-lg bg-light rounded">
            <h2 className="mb-4 text-center text-success">Upload Your Files</h2>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="row mb-3">
                    <div className="col-md-8 mx-auto">
                        <label className="form-label" htmlFor="fileInput">
                            <strong>Choose files</strong>
                        </label>
                        <div className="input-group">
                            <input
                                id="fileInput"
                                type="file"
                                className="form-control form-control-lg"
                                onChange={(e) => setFiles(e.target.files)}
                                multiple
                                accept=".jpg, .png, .jpeg"
                            />
                        </div>
                        <small className="form-text text-muted">
                            Accepted file types: .jpg, .png, .jpeg
                        </small>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6 mx-auto text-center">
                        <button
                            type="submit"
                            className="btn btn-success btn-lg px-4"
                            disabled={files.length === 0}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FileUpload;
