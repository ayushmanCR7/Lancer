import { Link } from "react-router-dom"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation
  } from '@tanstack/react-query'
  import apiRequest from "../../utilis/request.js"
  import moment from "moment";
  import { AuthContext } from "../authContext/Context.jsx";
import { useContext } from "react";
function Messages(){
    const {currentUser} = useContext(AuthContext)
    const { isPending, error, data} = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
          apiRequest.get(`/conversation`).then((res)=>{
            return res.data
          })
      })
      console.log(data)
      const handleRead = async(id)=>{
            try {
          const res= await apiRequest.put(`/conversation/${id}`)
              if(res){
                window.location.reload()
              }
            } catch (error) {
                
            }
      }
    const message = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur molestiae quasi eum amet sunt qui perferendis repellat, placeat delectus nostrum provident cum sapiente a doloremque corporis libero nisi sequi quod!"
    return (
        <>
        <div>
            {isPending? "loading" : error? "wriong" : <div className="pl-40 pr-36 pt-4 flex flex-col">
                <div className="flex justify-between">
                    <div>
                       <p className="text-2xl font-bold">Messages</p>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <table className="w-full justify-center  gap-2">
                        <tr className="w-full">
                            <th className="text-left">Buyer</th>
                            <th className="text-left">Last Message</th>
                            <th className="text-left">Date</th>
                       
                            <th className="text-centre">Action</th>
                        </tr>
                        {data.map((item)=>{
                         return <tr className={`w-full ${
                            (currentUser.isSeller && !item.readBySeller) || (!currentUser.isSeller && !item.readByBuyer)
                              ? "bg-green-100"
                              : "bg-white"
                          }`}
                          key={item.id}>
                         <td className="pr-4">{currentUser.isSeller? item.buyerId: item.sellerId}</td>
                       <Link to = {`/message/${item.id}`}>  <td className="text-sm">{item.lastMessage}...</td></Link>
                         <td className="text-sm">{moment(item.updatedAt).fromNow()}</td>

                         <td className="p-2">
                            {((currentUser.isSeller && !item.readBySeller) || (!currentUser.isSeller && !item.readByBuyer))
                            && (<button className="p-2 bg-green-700 text-white h-10 text-sm w-full" onClick={handleRead(item.id)}>Mark as Read</button>)}
                            </td>
                     </tr>
                        })}
                       
                    </table>
                </div>

            </div>}
        </div>
        </>
    )
}
export default Messages