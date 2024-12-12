import express from "express"
import {verifyToken} from "../middleware/jwt.js"
import {getOrder,intent,confirm, delOrder } from "../controllers/order.controller.js";
const router = express.Router();
router.get("/",verifyToken,getOrder)
router.post("/single-payment-intent/:id",verifyToken,intent)
router.put("/",verifyToken,confirm)
router.delete("/:id",verifyToken,delOrder)
export default router