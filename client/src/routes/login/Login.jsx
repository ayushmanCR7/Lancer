import { Link, useNavigate } from "react-router-dom"
import { useContext, useState} from "react"
import  apiRequest  from "../../utilis/request"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../authContext/Context"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Login(){
    const navigate = useNavigate();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const {updateUser,currentUser} = useContext(AuthContext)
    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const res = await apiRequest.post("/auth/login",{
                username,password
            })
            updateUser(res.data);
            console.log(res.data)
            navigate("/")
        } catch (error) {
            const notify = () => toast(error.response.data);
            notify()
        }
        
    }
    return (
        <>
        <div className="flex pl-40 pr-36 pt-4">

        <div className="left flex flex-col justify-center items-center gap-10 pl-52 pr-48  rounded-xl">
        <div className="text-3xl font-bold">Welcome Back</div>
            <form className="flex flex-col gap-5 text-black justify-center items-center pt-10 p-10 rounded-xl" onSubmit={handleSubmit}>
                
                <div className="flex gap-2 flex-col">
                    <label htmlFor="" className="font-bold">Username</label>
                    <input type="text" name="username" id="username" className="border border-1px border-black" onChange={(e)=>setusername(e.target.value)}/>    
                </div>
                <div className="flex gap-2 flex-col">
                    <label htmlFor="password" className="font-bold">Password</label>
                    <input type="text" name="password" id="password" className="border border-1px border-black" onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                <div className = "font-bold">
                    No account? <Link to="/register" className="text-blue-400">Sign in</Link>
                </div>
                <div>
                    <button className="bg-green-600 p-3 rounded-xl w-full text-white">Login</button>
                </div>
                <ToastContainer />

            </form>
        </div>
        <div className="right"></div>
                <img src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png" alt="" className="w-1/2 h-[410px] relative rounded-xl"/>     
                <div className="flex flex-col gap-3 absolute text-white left-2/3 top-36 font-bold">
                    <div>Over 700 categories</div>
                    <div>Quality work done faster</div>
                    <div>Proper intercations</div>
                </div>
        </div>
        </>
    )
}
export default Login