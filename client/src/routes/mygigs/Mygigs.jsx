import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext/Context"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation,
    useQueryClient
  } from '@tanstack/react-query'
import apiRequest from "../../utilis/request"
function Mygigs(){
    const queryClient = useQueryClient()
    const {currentUser} = useContext(AuthContext)
    const { isPending, error, data } = useQuery({
        queryKey: ["mygigs"],
        queryFn: () =>
          apiRequest
            .get(
              `/gig?userId=${currentUser._id}`
            ).then((res) => {return res.data})
            
      })
      console.log(data)
      const mutataion = useMutation({
        mutationFn: (id)=> {return apiRequest.delete(`/gig/${id}`)},
       onSuccess: ()=>{
         queryClient.invalidateQueries(["mygigs"])
       }

      })
      const navigate = useNavigate()
      const handleDelete = (id)=>{
        
        mutataion.mutate(id)
      }
      const handleClick = (e)=>{
     navigate(`/gig/${e}`)
      }
    return (
        <>
        <div>
            <div className="pl-40 pr-36 pt-4 flex flex-col">
                <div className="flex justify-between">
                    <div>
                       <p className="text-2xl font-bold">Gigs</p>
                    </div>
                    <div>
                    <Link to = "/add"><button className="bg-green-700 p-2 text-white">Add new Gig</button></Link> 
                    </div>
                </div>
                {isPending? "loading" : error? "error" : <div className="flex justify-center pt-4">
                    <table className="w-full justify-center ">
                        <tr className="w-full">
                            <th className="text-left">Image</th>
                            <th className="text-left">Title</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Sales</th>
                            <th className="text-left">Action</th>
                        </tr>
                        {data.map((item)=>{
                            return <tr className="w-full bg-green-100 p-2" key ={item._id}>
                            <td><img src={item.cover} alt="" className="w-7 h-7" onClick={()=>handleClick(item._id)}/></td>
                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>{item.sales}</td>
                            <td><img src="/icons8-delete-30.png" alt="" className="w-4 h-4 cursor-pointer" onClick={()=>handleDelete(item._id)}/></td>
                        </tr>
                        })}
                        
                       
                    </table>
                </div>}

            </div>
        </div>
        </>
    )
}
export default Mygigs