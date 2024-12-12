import User from "../models/user_model.js"
export const deleteUser = async (req,res)=>{
    const user = await User.findById(req.params.id);

    if(req.userId!== user._id.toString()){
        console.log(req.userId);
        console.log(user._id.toString())
        return res.status(501).send("You cannot delete");
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User deleted Successfully");
}
export const getUser = async(req,res)=>{
    try {
        const p = await User.findById(req.params.id);
    if(!p) return res.status(404).send("User doesn't exist");
    console.log(p)
    return res.status(202).send(p);
    } catch (error) {
        return res.status(500).send(error)
        console.log(error);
    }  
}
export const getUsers = async(req,res)=>{
    try {
         const p = await User.find();
         res.status(200).send(p)
    } catch (error) {
        return res.status(500).send(error)
    }
}