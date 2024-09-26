import {PrismaClient} from "@prisma/client";
let prisma = new PrismaClient();


const DetailsService = async (req) => {
    try {
        let {name} = req.body;
        let create = await prisma.details.create({
            data:{
                name,
                userId:parseInt(req.headers.user_id)
            }
        })

        return {status: "success", data: create};
    } catch (e) {
        console.error("Error in DetailsService:", e);
        return { status: "fail", data: e.message };
    }
};



export {DetailsService};
