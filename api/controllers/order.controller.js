
import Gig from "../models/gig.js"

import Order from "../models/order.js"
import Stripe from "stripe"

export const getOrder = async(req,res)=>{
    try {
        const orders = await Order.find({
            ...(req.isSeller? {sellerId:req.userId} : {buyerId:req.userId}),
            isCompleted: true,
        }).sort({createdAt:-1})
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(404).send("ERORO");
    }
}

export const intent = async(req,res)=>{
   const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
   )
   const gig = await Gig.findById(req.params.id);

   const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price*100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
 
    const order =  new Order({
            gigId: req.params.id,
            img: gig.cover,
            title: gig.title,
            price: gig.price,
            sellerId: gig.userId,
            buyerId: req.userId,
            payment_intent: paymentIntent.id
    })
    await order.save();

    res.status(200).send({clientSecret: paymentIntent.client_secret,})
}
export const confirm = async(req,res)=>{
    try {
        const r = await Order.findOneAndUpdate({payment_intent: req.body.payment_intent},{
            $set:{
                isCompleted: true,
            }
        })
        return res.status(200).send("Order has been confirmed successfully")
    } catch (error) {
        return res.status(404).send("Cannot find orders")
    }
}
export const delOrder = async(req,res)=>{
   
    try {
        if(req.isSeller) return res.status(401).send("A seller cannot delete a order")
        const resu = await Order.findByIdAndDelete(req.params.id);
        
        return res.status(200).send("Order deleted successfully")
    } catch (error) {
          return res.status(404).send("Cant delete")
    }
}