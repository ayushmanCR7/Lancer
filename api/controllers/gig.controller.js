import Gig from "../models/gig.js";

export const createGig = async(req,res)=>{
   if(!req.isSeller) return res.status(501).send("You are not a seller");
   const newGig = new Gig({
    userId: req.userId,
    ...req.body
   })
   try {
     const saved = await newGig.save();
     return res.status(202).send("Added gig successfully")
   } catch (error) {
    return res.status(500).send("Failed Successfully")
   }
}
export const deleteGig = async(req,res)=>{
    try {
        const gig = await Gig.findById(req.params.id);

        if(gig.userId !== req.userId) return res.status(500).send("You are not the owner of gig");

        await Gig.findByIdAndDelete(req.params.id);
        return res.status(200).send("Gig deleted Successfully")
    } catch (error) {
        return res.status(500).send("cannot delete gig")
    }
  


}
export const getGig = async(req,res)=>{
   try {
      const r = await Gig.findById(req.params.id);
      if(!r) return res.status(500).send("No gig for you")

      return res.status(200).send(r)
    
   } catch (error) {
    return res.status(500).send("Cannot find you gig")
   }
}
export const getGigs = async(req,res)=>{
    const q = req.query;
    const filters = {
        ...(q.userId && {userId: q.userId}),
        ...(q.cat && {cat: q.cat}),
        ...((q.min || q.max) && {
         price: {...(q.min && {$gt: q.min}),...(q.max && {$lt: q.max})},
        }),
        ...(q.search && {title: {$regex: q.search, $options: "i"}}),

    };
    
   try {
      console.log(q.sort)
      console.log(q);
      const p = await Gig.find(filters).sort({[q.sort]:-1});

      return res.status(200).send(p);
    
   } catch (error) {
      return res.status(505).send(error)
   }
}