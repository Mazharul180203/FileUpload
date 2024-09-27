import {UploadFileServices} from "../service/UploadFilesServices.js";

export const uploadFile = async (req,res) =>{
    let result = await UploadFileServices(req);
    if(result['status']==="success"){
        return res.status(200).json(result);
    }else {
        return res.status(401).json(result);
    }
}