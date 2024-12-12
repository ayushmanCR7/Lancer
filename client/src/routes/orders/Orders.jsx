import { useContext } from "react"
import { AuthContext } from "../authContext/Context"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation,
    useQueryClient
  } from '@tanstack/react-query'
  import apiRequest from "../../utilis/request.js";
import { useNavigate } from "react-router-dom";
function Orders(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {currentUser} = useContext(AuthContext);
    const { isPending, error, data} = useQuery({
        queryKey: ["orders"],
        queryFn: () =>apiRequest.get(`/order/`).then((res)=>{
            return res.data
          })
      })
      console.log(data)
      const handleContact = async(item)=>{
        const sellerId = item.sellerId
        const buyerId = item.buyerId
        const id = sellerId + buyerId
        try {
            const r = await apiRequest.get(`/conversation/single/${id}`)
            navigate(`/message/${id}`)

        } catch (error) {
            if(error.response.status(500)){
              const res = await apiRequest.post("/conversation",{
                to: currentUser.isSeller? item.buyerId: item.sellerId
              })
              navigate(`/message/${id}`)

            }

        }
      }
      const handleClick = (id)=>{
        navigate(`/gig/${id}`)
      }
      const mutataion = useMutation({
        mutationFn: (id)=> {return apiRequest.delete(`/order/${id}`)},
       onSuccess: ()=>{
         queryClient.invalidateQueries(["orders"])
       }

      })
      
      const handleDelete = (id)=>{
        
         mutataion.mutate(id)
      }
    return (
        <>
        <div>
            {isPending? "loading" : error? "wrong" : <div className="pl-40 pr-36 pt-4 flex flex-col">
                <div className="flex justify-between">
                    <div>
                       <p className="text-2xl font-bold">Orders</p>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <table className="w-full justify-center ">
                        <tr className="w-full">
                            <th className="text-left">Image</th>
                            <th className="text-left">Title</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Contact</th>
                            <th className="text-left">Delete</th>
                        </tr>
                        {data.map((item)=>{
                         return <tr className="w-full bg-green-100 p-2" key={item._id}>
                         <td><img src={item.cover} alt="" className="w-7 h-7" onClick={()=>handleClick(item.gigId)}/></td>
                         <td>{item.title}</td>
                         <td>${item.price}</td>
                         <td><img src="/download (13).png" alt="" className="w-10 h-10" onClick={()=>handleContact(item)}/></td>
                         <td><img src="/icons8-delete-30.png" alt="" className="w-4 h-4 cursor-pointer" onClick={()=>handleDelete(item._id)}/></td>

                     </tr>
                        })}
                        
                       
                    </table>
                </div>

            </div>}
        </div>
        </>
    )
}
export default Orders