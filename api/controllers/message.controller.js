import conversation from "../models/conversation.js"
import Message from "../models/messages.js"

export const createMessage = async(req,res)=>{
    const newm = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc
    })
    try {
        const r = await newm.save();
        await conversation.findOneAndUpdate({id: req.body.conversationId},{$set:{
            readByBuyer: !req.isSeller,
            readBySeller: req.isSeller,
            lastMessage: req.body.desc
        }},
    {new: true});
        return res.status(200).send(r);
    } catch (error) {
        return res.status(404).send("Sorry cannot create the message")
    }
}
export const getMessages = async(req,res)=>{
    try {
        const r = await Message.find({
            conversationId: req.params.id
        })
        return res.status(200).send(r)
    } catch (error) {
        return res.status(400).send("Sorry some problem occured")
    }
}