import Review from "../models/review.js"
import Gig from "../models/gig.js"


export const createReview = async(req,res)=>{
  if(req.isSeller) return res.status(500).send("You are a seller");

  const newR = new Review({
    gigId: req.body.gigId,
    userId: req.userId,
    star: req.body.star,
    desc: req.body.desc
  })
  try {
     const re = await Review.findOne({
        gigId: req.body.gigId,
        userId: req.userId
     })
     if(re)  return res.status(404).send("review already created")

        const saved = await newR.save();
        await Gig.findByIdAndUpdate(req.body.gigId,{
            $inc: {totalStars: req.body.star, numberStars: 1}
        });
        return res.status(200).send("Review created successfully")
  } catch (error) {
    return res.status(501).send("Cannot create new Review")
  }

}
export const getReviews = async(req,res)=>{
    try {
        const review = await Review.find({gigId: req.params.id});
        return res.status(200).send(review);
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const deleteReview = async(req,res)=>{
    try {
      if(req.isSeller) return res.status(500).send("A seller cannot delete a review")
       const re = await Review.findById(req.params.id);
       if(!re) return res.status(501).send("Review not present");
       if(re.userId!== req.userId) return res.status(400).send("This review don't belong to you");
       await Review.findByIdAndDelete(req.params.id);
       return res.status(200).send("Review deleted successfully")


    } catch (error) {
      return res.status(404).send("Cannot delete");
    }
}