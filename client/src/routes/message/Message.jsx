import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation,
    useQueryClient
  } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../authContext/Context'
import apiRequest from '../../utilis/request'
import conversation from '../../../../api/models/conversation'
function Message(){
    const {currentUser} = useContext(AuthContext)
    const queryClient = useQueryClient()
    const {id} = useParams()
    console.log(id)
    const { isPending, error, data} = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
          apiRequest.get(`/message/${id}`).then((res)=>{
            return res.data
          })
      })
      console.log(data)
      const mutataion = useMutation({
        mutationFn: (message)=> {return apiRequest.post("/message",message)},
       onSuccess: ()=>{
         queryClient.invalidateQueries(["messages"])
       }

      })
      const handleSubmit = (e)=>{
       e.preventDefault();
       mutataion.mutate({
        conversationId: id,
        desc: e.target[0].value
       })
       e.target[0].value = ""
      }
    return (
        <>
       <div> <div className="pl-40 pr-36 pt-4">
                <h1>MESSAGES</h1>
               { isPending? "loading": error? "error": <div className="p-4 left h-[280px] overflow-y-auto border-gray-400 border rounded-lg">
                {data.map((item)=>{
                    return (item.userId === currentUser._id? <div className=" flex gap-5 p-3 flex-row-reverse" key={item._id}>
                        <img src="/anonymous.png" alt="" className="w-5 h-5"/>
                        <div className="border-2 rounded-lg bg-blue-600 p-2 text-sm  text-white">{item.desc}</div>
                    </div>:<div className=" flex gap-5 p-3" key={item._id}>
                    <img src="/anonymous.png" alt="" className="w-5 h-5"/>
                    <div className="border-2 rounded-lg bg-gray-300 p-2 text-sm ">{item.desc}</div>
                </div>)
                    
                })}
                </div>}
                <form className="flex justify-center items-center gap-3 pt-5 "onSubmit={handleSubmit} >
                    <textarea name="" id="" placeholder="write a message" cols="80" rows="4" className=" border-blue-600 border-[2px] p-2 rounded-lg"></textarea>
                    <button className="bg-blue-600 text-white p-4 rounded-xl font-bold">Send</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Message