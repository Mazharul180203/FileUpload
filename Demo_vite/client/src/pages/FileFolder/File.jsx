import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {BASE_URL} from "../../../../config.js";

const FileUpload = () => {
    const [files, setFiles] = useState({ file: '' });

    const handleSubmit = async (e) => {
        console.log("file : ",files)
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', files.file);
            console.log(formData.file);
            const res = await axios.post(`${BASE_URL}/api/v1/uploadFile`, formData, {
                headers: { 'content-type': "multipart/form-data" },
                withCredentials: true,
            });
            console.log(res.data);
        } catch (e) {
            toast.error("Something went wrong!");
            console.error(e);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 pt-4">
                    <input className="form-control" type="file" accept=".jpg,.png,.jpeg" onChange={(e) =>
                        setFiles({ ...files, file: e.target.files[0] })} />
                </div>
                <div className="col-md-6 pt-4">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success submit-button">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
