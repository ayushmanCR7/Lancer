import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createReview, deleteReview, getReviews } from "../controllers/review.controller.js";

const router = express.Router();
router.post("/",verifyToken,createReview);
router.get("/:id",getReviews)
router.delete("/:id",verifyToken,deleteReview)

export default router