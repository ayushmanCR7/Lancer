import Review from "../Review/Review.jsx"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import apiRequest from "../../utilis/request.js"
function Reviews({gigId}){
  const notify = () => toast("Review created successfully");
    const { isPending, error, data} = useQuery({
        queryKey: ["reviews"],
        queryFn: () =>
          apiRequest.get(`/review/${gigId}`).then((res)=>{
            return res.data
          })
      })
    return <>
    <div className="flex flex-col gap-5">
                            <p className="text-xl"><b>Reviews</b></p>
                            {isPending? "loading": error? "error": data.map((review)=>(
                                <Review key={review._id} review = {review}/>
                            ))}
                        </div>
    </>
}
export default Reviews