import GigCard from "../../components/gigCard/GigCard"
import { gigs } from "../../data"
import { useRef, useState,useEffect } from "react"
import apiRequest from "../../utilis/request"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  import { useLocation } from "react-router-dom"

function Gigs(){
    const [click, setclick] = useState(false)
    const [sort, setsort] = useState("createdAt")
    const [type, settype] = useState("Best Selling")
    const maxRef = useRef();
    const minRef = useRef()
 
    const handleClick = ()=>{
         if(click){
            setclick(false);
         }
         else{
            setclick(true);
         }
    }
    
    const {search} = useLocation()
    console.log(search)
    const { isPending, error, data,refetch } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
          apiRequest
            .get(
              `/gig${search? search:"?"}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            ).then((res) => {return res.data})
            
      })
      const apply = ()=>{
        refetch()
      }
      useEffect(() => {
        refetch();
      }, [sort]);
    return (
        <>
        <div className="pl-40 pr-36 pt-4 flex flex-col gap-4 pb-3">
          <div>LANCER</div>
          <div className="font-bold text-2xl"><p></p></div>
          <div><p>Explore the boundaries of art and technology with Fiverr's artist</p></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center"><p>Budget</p>
            <form action="" className="flex gap-3">
                <input type="number" className="border-black border-[1px] rounded-lg p-1" placeholder="min" ref={minRef}/>
                <input type="number" className="border-black border-[1px] rounded-lg p-1" placeholder="max" ref={maxRef} />             
            </form>
            <button className="bg-green-500 p-2 rounded-lg pl-3 pr-3" onClick={apply}>Apply</button>
            </div>
            <div className="flex gap-4 justify-center items-center relative ">
                <p>Sort by <b>{type}</b></p>
                <div onClick={handleClick} className="flex justify-center items-center">
                {!click?<img src="/download (8).png" alt="" className="w-5"/>:
                <img src="/download (8).png" alt="" className="w-5 rotate-180 "/>}
                </div>
                {click && <div className="flex flex-col z-100 bg-white p-2 absolute top-14 left-20 w-full cursor-pointer">
                    <p onClick={()=>{settype("Newest"),setsort("createdAt")}}>Newest</p>
                    <p onClick={()=>{settype("Best Selling"),setsort("numberStars")}}>Best Selling</p>
                </div>}
                
            </div>
            
          </div>
        <div className="flex flex-wrap gap-5">
        {isPending?"loading" : error ? "Something Went Wrong": data.map((gig)=>
            <GigCard item = {gig} key = {gig._id}/>
        )}
        </div>
        </div>
        </>
    )
}
export default Gigs