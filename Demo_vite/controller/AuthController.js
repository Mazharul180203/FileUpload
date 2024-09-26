import {RegistrationService, VerifyLoginService} from "../service/AuthServices.js";

export const Registration = async (req,res) =>{
    let result = await RegistrationService(req);
    if(result['status']==="success"){
        return res.status(200).json(result);
    }else {
        return res.status(401).json(result);
    }

}

export const VerifyLogin = async (req,res) =>{
    let result = await VerifyLoginService(req);
    if (result['status'] === "success") {
        let cookieOption={expires:new Date(Date.now()+2*24*60*60*1000), httpOnly:false}
        res.cookie('token',result['token'],cookieOption, { httpOnly: true, sameSite: 'strict'});
        return res.status(200).json(result);
    }else if(result['status'] === "invalid"){
        return res.status(200).json(result);
    }
    else {
        return res.status(401).json(result);
    }

}
