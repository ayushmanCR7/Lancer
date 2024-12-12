import conversation from "../models/conversation.js"

export const getConversations = async(req,res)=>{
    try {
        const con = await conversation.find(req.isSeller? {sellerId: req.userId}: {buyerId: req.userId}).sort({updatedAt:-1});

        return res.status(200).send(con)
    } catch (error) {
        return res.status(501).send("Cannot get all the conversation")
    }
}
export const createConversation = async(req,res)=>{
    const conver = new conversation({
        id: req.isSeller? req.userId + req.body.to: req.body.to + req.userId,
        buyerId: req.isSeller? req.body.to: req.userId,
        sellerId: req.isSeller? req.userId: req.body.to,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller 
    })
    try {
        const r = await conver.save();

        return res.status(200).send(r)
    } catch (error) {
        return res.status(501).send("Cannot strat the conversation")
    }
}
export const getConversation = async(req,res)=>{
    try {
        const con = await conversation.findOne({id: req.params.id});
        if(!con) return res.status(500).send("No conversation find")
        return res.status(200).send(con)
    } catch (error) {
        return res.status(400).send("Cannot get the siingle conversation")
    }
}
export const updateConversation = async(req,res)=>{
    try {
        const updated = await conversation.findOneAndUpdate({id:req.params.id},{
            $set: {
               ...(req.isSeller? {readBySeller: true}: {readByBuyer: true})
            },
        },
    {new: true})
    return res.status(200).send(updated)
    } catch (error) {
        return res.status(400).send("Cannot update the conversation")
    }
}