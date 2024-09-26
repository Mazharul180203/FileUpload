import {DetailsService} from "../service/DetailsServices.js";

export const Details = async (req,res) =>{
    let result = await DetailsService(req);
    if(result['status']==="success"){
        return res.status(200).json(result);
    }else {
        return res.status(401).json(result);
    }

}