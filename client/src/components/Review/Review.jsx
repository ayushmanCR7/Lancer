import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  import apiRequest from "../../utilis/request.js";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Review({review}){
    const notify = () => toast("Review deleted successfully");
   
    const [yes, setyes] = useState(false)
    const handleClick = () => {
        if (yes) {
            setyes(false);
        }
        else {
            setyes(true);
        }
    }
    const [no, setno] = useState(false)
    const handleClicks = () => {
        if (no) {
            setno(false);
        }
        else {
            setno(true);
        }
    }
    const { isPending, error, data} = useQuery({
        queryKey: [review.userId],
        queryFn: () =>
          apiRequest.get(`/user/${review.userId}`).then((res)=>{
            return res.data
          })
      })
      const handledelClick = async()=>{
        try {
            await apiRequest.delete(`/review/${review._id}`)
            notify();
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            
        } catch (error) {  
            const notify1 = () => toast(error.response.data);
            notify1()
        }
      }
  return <>
  {isPending? "loading" : error? "error" : <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <img src={data.img} alt="" className="w-10 h-10 rounded-full" />
                                    </div>

                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="flex font-bold text-xs">{data.username}</div>
                                        <div className="flex items-center justify-center gap-2">
                                            <img src="/icons8-usa-50.png" alt="" className="w-4 h-4" />
                                            <p className="text-xs">{data.country}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex gap-1 -justify-center items-center">
                                {Array(review.star).fill().map((item,i)=>(
                                     <img src="/star.png" alt="" className="w-3 h-3" key={i}/>
                                ))}
                                    <p className="text-xs">{review.star}</p>
                                </div>
                                <div>
                                    <p className="text-sm">{review.desc}</p>
                                </div>
                                <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <p>Helpful?</p>
                                    {yes ? <img src="/download (10).png" alt="" className="w-3 h-3" onClick={handleClick} />
                                        : <img src="/download (9).png" alt="" className="w-3 h-3" onClick={handleClick} />}

                                    <p>Yes</p>
                                    {no ? <img src="/icons8-thumbs-down-24 (1).png" alt="" className="w-3 h-3" onClick={handleClicks} /> :
                                        <img src="/icons8-thumbs-down-24.png" alt="" className="w-3 h-3" onClick={handleClicks} />}
                                    <p>No</p>
                                </div>
                                <div className="cursor-pointer">
                                    <img src="/icons8-delete-30.png" alt="" className="w-5" onClick={handledelClick}/>
                                </div>
                                </div>
                                <ToastContainer />

                            </div>
                        }
                            <div className="bg-black border-[1px]"></div>
  </>
}
export default Review