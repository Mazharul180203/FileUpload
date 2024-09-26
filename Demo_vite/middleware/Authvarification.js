import {DecodeToken} from "../utility/TokenHelper.js";


export default (req, res, next) => {
    let token = req.headers['token'] || req.cookies['token'];

    let decoded = DecodeToken(token);
    console.log("decodetoken : ",decoded);
    if (decoded === null) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
};