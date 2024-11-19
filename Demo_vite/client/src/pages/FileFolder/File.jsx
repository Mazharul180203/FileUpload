import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from "../../../../config.js";

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append each file individually to formData
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]); // Use 'files' as the key (or any appropriate key that your backend expects)
            }

            console.log("FormData content:", formData.getAll('files')); // Debugging line to check FormData content

            const res = await axios.post(`${BASE_URL}/api/v1/uploadFile`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if(res.data.status === "success") {
                toast.success("Files uploaded successfully!");
            }

            setFiles([]);
        } catch (e) {
            toast.error("Something went wrong!");
            console.error(e);
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
                                name="files"
                                id="fileInput"
                                type="file"
                                className="form-control form-control-lg"
                                onChange={(e) => setFiles(e.target.files)}
                                multiple
                            />
                            <span className="input-group-text" id="fileAddon">
                                <i className="fas fa-upload"></i>
                            </span>
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
                            <i className="fas fa-paper-plane me-2"></i>Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FileUpload;
