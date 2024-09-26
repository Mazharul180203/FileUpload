import {PrismaClient} from "@prisma/client";

import  fs from "fs";
let prisma = new PrismaClient();


const UploadFileServices = async (req) => {
    try {
        const uploadedFile = req;
        console.log("esfsr : ",req);
        // let target_path = 'uploads/' + req.files.thumbnail.name;
        // fs.rename(tmp_path, target_path, function(err) {
        //     if (err) throw err;
        //     fs.unlink(tmp_path, function() {
        //         if (err) throw err;
        //         res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        //     });
        // });
        }catch(e){
        console.error("Error in DetailsService:", e);
        return { status: "fail", data: e.message };
        }
    };

export {UploadFileServices};