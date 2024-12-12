import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import gigRoutes from "./routes/gig.js"
import authRoutes from "./routes/auth.js"
import reviewRoutes from "./routes/review.js"
import orderRoutes from "./routes/order.js"
import conersationRoutes from "./routes/conversation.js"
import messageRoutes from "./routes/message.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express();
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("connected")
    }catch(error){
       console.log(error);
    }
}
app.use(cookieParser());
app.use(express.json())
app.use(cors({origin: "http://localhost:5173",credentials: true,methods: 'GET,POST,PUT,DELETE'}))
app.use("/api/user",userRoutes)
app.use("/api/gig",gigRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/review",reviewRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/conversation",conersationRoutes)

app.listen(8000,()=>{
    connect();
    console.log("hello")
})