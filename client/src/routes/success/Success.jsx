import { useLocation, useNavigate } from "react-router-dom"
import apiRequest from "../../utilis/request";
import { useEffect } from "react";

function Success(){
    const {search} = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get("payment_intent")
  console.log(payment_intent)

    useEffect(() => {
      const fun = async()=>{
        try {
            const res = await apiRequest.put("/order",{payment_intent: payment_intent})
            setTimeout(() => {
                 navigate("/orders")
            }, 3000);
        } catch (error) {
            console.log(error)
        }
      }
      fun()
    }, [])
    
    return(
    <>
    <div className="pl-40 pr-36 pt-4">
        Payment Successfull. You are being redirected to orders page . Please do not close the page</div>
        </>
    )
}
export default Success