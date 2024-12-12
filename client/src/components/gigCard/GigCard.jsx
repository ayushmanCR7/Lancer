import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import apiRequest from "../../utilis/request"
import { Link } from "react-router-dom";
function GigCard({ item }) {
    const [heart, setheart] = useState(false)
    const handleClick = () => {
        if (heart) {
            setheart(false);
        }
        else {
            setheart(true);
        }
    }
    
    const { isPending, error, data} = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
          apiRequest.get(`/user/${"674f2c9061b3a168a8d90e4f"}`).then((res)=>{
            return res.data
          })
      })
    return <>
    <Link to={`/gig/${item._id}`}>
        <div className="w-56 flex flex-col border-gray-500 border-[1px] rounded-lg">
            <img src={item.cover} alt="" className="h-48 rounded-lg" />
            <div>
                <div className="p-2 flex flex-col gap-2">
                    {isPending? "loading" : error? "something went wrong" :<div className="flex gap-3 items-center p-2">
                        <img src={data.img || "/anonymous.png"} alt="" className="w-9 h-9 rounded-full" />
                        <p>{data.username}</p>
                    </div>}
                    <p className="h-20">{item.desc}</p>
                    <div className="flex gap-1"> <img src="/star.png" alt="" className="w-5" /><p>{Math.round(item.totalStars/item.numberStars)}</p></div>
                </div>
            </div>
            <div>
                <div className="flex p-2 items-center justify-between border-gray-500 border-t-[1px] rounded-lg">
                    <div className="flex justify-center items-center" onClick={handleClick}>
                        {!heart ? <img src="/download (6).png" alt="" className="w-5" /> :
                            <img src="/download (7).png" alt="" className="w-5" />}
                    </div>
                    <div className="flex flex-col text-xs">
                        <p>STARTING AT ${item.price}</p>

                    </div>
                </div>
            </div>
        </div>
        </Link>
    </>
}
export default GigCard