import { useReducer, useState } from "react"
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer"
import upload from "../../utilis/upload"
import {useNavigate} from "react-router-dom"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,useMutation,
    useQueryClient
  } from '@tanstack/react-query'
  import apiRequest from "../../utilis/request"
function Add(){
    const [single, setsingle] = useState(undefined)
    const [files, setfiles] = useState([])
    const [uploading, setuploading] = useState(false)

    const [state,dispatch] = useReducer(gigReducer,INITIAL_STATE)
    const handleChange = (e)=>{
        
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.value}
        })

    };

    const handleFeature = (e)=>{
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE",
            payload: e.target[0].value
        })
        console.log(e.target[0].value)
        e.target[0].value = "";
    }
    const handleUpload = async(e)=>{
        setuploading(true)
        try {
            const cover = await upload(single);
            const images = await Promise.all(
                [...files].map(async(file)=>{
                    const url = await upload(file);
                    return url;
                })
            )
            setuploading(false);
            dispatch({type: "ADD_IMAGE",payload: {cover,images}})

        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const mutataion = useMutation({
        mutationFn: (gig)=> {return apiRequest.post(`/gig`,gig)},
       onSuccess: ()=>{
         queryClient.invalidateQueries(["orders"])
       }

      })
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Payload:", state);
         mutataion.mutate(state)
       

    }
    return (
        <>
         <div>
            <div className="pl-40 pr-36 pt-4 flex flex-col">
            <div> <h1 className="text-2xl font-bold">Add New Gig</h1></div>
            <div className="flex p-4">
                <div className="left w-1/2 p-2 flex flex-col gap-2">
                   <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Title</label>
                    <input type="text" className="p-2 border border-gray-500 rounded-lg" name="title" onChange={handleChange}/>
                   </div>
                   <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Category</label>
                    <select name="cat" id="cats"className="p-2 border border-gray-500 rounded-lg" onChange={handleChange} >
                        <option value="design">Design</option>
                        <option value="design">AI & Services</option>
                        <option value="design">WEB Devlopment</option>
                        <option value="design">AWS</option>
                    </select>
                   </div>
                   <div className="flex  items-centre">
                    <div className="flex flex-col gap - 2">
                   <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Cover Image</label>
                    <input type="file" onChange={(e)=>setsingle(e.target.files[0])}/>
                   </div>
                   <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Upload Images</label>
                    <input type="file" multiple onChange={(e)=>setfiles(e.target.files)}/>
                   </div>
                   </div>
                   <div className="flex items-center ">
                    <button className="p-3 bg-green-700 text-white rounded-md" onClick={handleUpload}>{uploading? "Uploading": "Upload"}</button>
                   </div>
                   </div>
                  <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Description</label>
                    <textarea name="desc" id="" cols="10" rows="10" className="p-2 border border-gray-500 rounded-lg"  onChange={handleChange}></textarea>
                   </div>
                   <div className="flex flex-col gap-3 w-5/6">
                    <label htmlFor="">Price</label>
                    <input type="Number" name="price" className="p-2 border border-gray-500 rounded-lg" onChange={handleChange}/>
                   </div>
                   <div className="flex flex-col">
                    <button className="bg-green-700 text-white font-bold p-2 w-5/6 justify-center rounded-lg" onClick={handleSubmit}>Create</button>
                   </div>
                </div>
                <div className="right w-1/2 p-2 flex flex-col gap-2">
                <div className="flex flex-col gap-3 w-5/6">
                        <label htmlFor="">Service Title</label>
                        <input type="text" className="p-2 border border-gray-500 rounded-lg" name="shortTitle" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-3 w-5/6">
                        <label htmlFor="">Short Description</label>
                        <textarea name="shortDesc" id="" cols="10" rows="7" className="p-2 border border-gray-500 rounded-lg" onChange={handleChange}></textarea>
                    </div>
                    <div className="flex flex-col gap-3 w-5/6">
                        <label htmlFor="">Delivery Time</label>
                        <input type="number" className="p-2 border border-gray-500 rounded-lg" name="deliveryTime" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-3 w-5/6">
                        <label htmlFor="">Revision Number</label>
                        <input type="number" className="p-2 border border-gray-500 rounded-lg" name="revisionNumber" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-3 w-5/6">
                        <label htmlFor="">Add Feature</label>
                        <form action="" className="flex gap-2" onSubmit={handleFeature}>
                        <input type="text" name="" id="" className="p-2 border border-gray-500 rounded-lg w-80"/>
                        <button className="p-2 rounded-md bg-green-700 text-white font-bold" type="submit">Add</button>
                        </form>
                        <div className="flex gap-2 flex-col">
                            <span>{state?.features? "Added Features": ""}</span>
                            <div className="flex gap-4  flex-wrap">
                            {state?.features?.map((f)=>{
                               return <div key={f}>
                                    <button className="relative p-2 bg-green-700 text-white rounded-md" onClick={()=>dispatch({
                                        type: "REMOVE_FEATURE", payload: f
                                    })}>{f} <span className="text-xs bg-gray-500 absolute bottom-8 rounded-full w-4 h-4">X</span></button>
                                </div>
                            })}
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
         </div>
        </>
    )
}
export default Add