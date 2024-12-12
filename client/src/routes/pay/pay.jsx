import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
const stripePromise = loadStripe("pk_test_51QUjXrEIsFdeVyZI8mhVCkiv21SfepnH1O613HJJOdSstp6lOC1oVbpdYiSu9fQr91OLGUBPbAAPWdqeDQMMJWvY00WclGfKng");
import apiRequest from "../../utilis/request.js"
import CheckoutForm from "../../components/checkout/CheckoutForm.jsx";
function Pay(){
    const [clientSecret, setClientSecret] = useState("");
     const {id} = useParams();
     console.log(id)
    useEffect(() => {
        const make = async()=>{ 
            try {
                const res =  await apiRequest.post(`/order/single-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        };
      make()
    }, []);
    const appearance = {
        theme: 'stripe',
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = 'auto';
      const options = {
        clientSecret,
        appearance,
      };
    return <>
        <div className="pl-40 pr-36 pt-4">
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </>
}
export default Pay