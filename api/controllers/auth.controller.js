import User from "../models/user_model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const login = async (req,res)=>{
      try {
         const user = await User.findOne({username: req.body.username});
         if(!user){
            console.log("user not found")
           return res.status(404).send("Not found");
         }
         const isright = bcrypt.compareSync(req.body.password,user.password);
         if(!isright) return res.status(404).send("invalid credentials")
         const {password,...info} = user._doc
         const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
         },process.env.SECRET_KEY)
            res.cookie("accessToken" , token,{
               httpOnly: true
            }).status(200).send(info);
      } catch (error) {
        console.log(error)
        res.status(501).send("User Details not found")
      }
}
export const register = async (req,res)=>{
    try{
        
        const hash = bcrypt.hashSync(req.body.password,10)
        const newuser = new User({
            ...req.body,
            password:hash
        });
        await newuser.save();
        res.status(200).send("user created successfully")
        }
        catch(error){
           console.log(error);
           res.status(501).send("no")
        }
   
}
export const logout = async (req,res)=>{
   res.clearCookie("accessToken",{
      sameSite: "none",
      secure: true
   }).status(200).send("User logout is successfull")

}
