import { Slider } from "infinite-react-carousel"
import { gigs } from "../../data"
import { useState } from "react"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation
  } from '@tanstack/react-query'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import apiRequest from "../../utilis/request"
import Reviews from "../../components/Reviews/Reviews.jsx"
function Gig() {
    const notify = () => toast("Review created successfully");

    const {id} = useParams();
    console.log(id);
    
    const { isPending, error, data} = useQuery({
        queryKey: [id],
        queryFn: () =>
          apiRequest.get(`/gig/single/${id}`).then((res)=>{
            return res.data
          })
      })
      const userId = data?.userId;
      const { isPending: isPendingUser, error: iserror, data: isdata} = useQuery({
        queryKey: [userId],
        queryFn: () =>
          apiRequest.get(`/user/${userId}`).then((res)=>{
            return res.data
          })
      })
      console.log(data)
      const navigate = useNavigate()
      console.log(isdata)
      const mutation = useMutation({
        mutationFn: (review) => {
          return apiRequest.post("/review", review);
        },
      });
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        try {
           const p =  await apiRequest.post("/review",{
                gigId: id,
                star: star,
                desc: desc
            })
            notify()
            setTimeout(() => {
                window.location.reload();   
            }, 2000);
               
        } catch (error) {
            console.log(error)
        }      
      }    
    return (
        <>
            <div>
                {isPending? "loading" : error? "something went wrong" : <div className="pl-40 pr-36 pt-4 flex gap-3">
                    {isPendingUser? "loading" : iserror? "error": <div className="left flex flex-col gap-3 w-4/5">
                        <div>
                            <p className="">Lancer>{data.cat}</p>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{data.title}</h1>
                        </div>
                         <div className="flex gap-3 w-full">
                            <div>
                                <img src={isdata.img || "/anonymous.png"} alt="" className="w-6 h-6 rounded-full" />
                            </div>
                            <div>
                                {isdata.username}
                            </div>
                            <div className="flex gap-2 -justify-center items-center">
                                {Array(Math.round(data.totalStars/data.numberStars)).fill().map((item,i)=>(
                                     <img src="/star.png" alt="" className="w-3 h-3" key={i}/>
                                ))}

                                <p>{Math.round(data.totalStars/data.numberStars)}</p>
                            </div>
                        </div>
                        <div className="justify-center items-center pl-20 pt-5 w-full ">
                            
                              <Slider slidetoShow={1} className="">
                              {data.img.map((i)=>(
                              <img src={i} key={i} alt="" className="rounded-lg" />
                            ))}
                          </Slider>
                           
                            
                        </div>
                        <div>
                            <p className="font-bold">About this gig</p>
                        </div>
                        <div className="w-full">
                            <p className="w-full">{data.desc}</p>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">About the Seller</h1>
                            <div className="flex items-center gap-3 p-2">
                                <div>
                                    <img src={isdata.img || "anonymous.png"} alt="" className="w-12 h-12 rounded-full" />
                                </div>
                                <div className="flex flex-col">
                                    <div>
                                        <p className="text-xs font-bold">{isdata.username}</p>
                                    </div>
                                    <div className="flex gap-1 -justify-center items-center">
                                    {Array(Math.round(data.totalStars/data.numberStars)).fill().map((item,i)=>(
                                     <img src="/star.png" alt="" className="w-3 h-3" key={i}/>
                                ))}
                                        <p className="text-xs">{Math.round(data.totalStars/data.numberStars)}</p>
                                    </div>
                                    <div>
                                        <button className="p-1 bg-green-700 rounded-sm">
                                            <p className="text-xs text-white font-bold">contact Me</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-[1px] border-black  w-full gap-2 rounded-lg">
                            <div className="flex justify-between p-5">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <p>From</p>
                                        <p><b>{isdata.country}</b></p>
                                    </div>
                                    <div>
                                        <p>Avg Response Time</p>
                                        <p><b>USA</b></p>
                                    </div>
                                    <div>
                                        <p>Language</p>
                                        <p><b>USA</b></p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <p>Members Since</p>
                                        <p><b>{isdata.createdAt.split('T')[0]}</b></p>
                                    </div>
                                    <div>
                                        <p>Last Delivery</p>
                                        <p><b>USA</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-center w-[90%] items-center flex ml-6">
                                <div className="bg-black w-full h-[1px]"></div>
                            </div>
                            <div className="p-5">
                                {isdata.desc}
                            </div>
                        </div>
                        <Reviews gigId={id}></Reviews>
                        <div className="flex flex-col gap-2">
                              <h1>Write a Review</h1>
                            <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
                                <textarea name="" id="" className="border border-black w-full h-32 p-1"></textarea>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Give stars of your choice</label>
                                <select name="" id="" className="w-20">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <button className="p-2 bg-green-600 text-white h-10 font-bold w-24">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                    <div className="right w-3/5 sticky top-20 max-h-96">
                        <div className="m-4 ml-16 border-[2px] rounded-lg">
                            <div className="flex flex-col gap-4 p-2 ">
                                <div className="flex justify-between">
                                    <div className="font-bold"> {data.shortTitle}</div>
                                    <div className="font-bold">$ {data.price}</div>
                                </div>
                                <div><p className="text-xs">{data.shortDesc}</p></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <img src="/download (11).png" alt="" className="w-4 h-4" />
                                        <p className="text-sm font-bold">{data.deliveryTime} Days Delivery</p>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <img src="/download (12).png" alt="" className="w-4 h-4 " />
                                        <p className="text-sm font-bold">{data.revisionNumber} Revision</p>
                                    </div>
                                </div>
                                <div>

                                    {data.features.map((gig)=>(
                                     <div className="flex items-center gap-2" key={gig}>
                                     <img src="/checked.png" alt="" className="w-4 h-4" />
                                     <p>{gig}</p>
                                 </div>
                                    ))}
                                   
                                </div>
                            <Link to={`/pay/${id}`}> <button className="p-2 w-full bg-green-600 font-bold text-white">
                                    Continue
                                </button>
                                </Link>   
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}
export default Gig