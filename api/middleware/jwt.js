import jwt from "jsonwebtoken"


export const verifyToken = async(req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(501).send("You are not Authenticated");

    jwt.verify(token,process.env.SECRET_KEY, async(err,payload)=>{
        if(err) return res.status(501).send("You are not allowed to change");
        req.userId = payload.id;
        req.isSeller = payload.isSeller
        next()
    })

}