import mongoose from "mongoose";
import { Schema } from "mongoose";

const Conversation = new Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
    buyerId:{
        type: String,
        required: true
    },
    sellerId:{
        type: String,
        required: true
    },
    readBySeller:{
        type: Boolean,
        required: true
    },
    readByBuyer:{
        type: Boolean,
        required: true
    },
    lastMessage:{
        type: String,
        required: false
    }
},{
    timestamps: true
})

export default mongoose.model("Conversation",Conversation)