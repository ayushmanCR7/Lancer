import { useState} from "react"
import {useNavigate} from "react-router-dom"
import apiRequest from "../../utilis/request.js"
import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import upload from "../../utilis/upload.js";
  

function Register(){
    const [first, setfirst] = useState(true)
    const [file, setfile] = useState(null)
    const notify = () => toast("Registered Successfully");
    const handleClick = ()=>{
        if(first === true){
            setfirst(false)
        }
        else{
            setfirst(true)
        }
        setuser((prev)=>{
            return {...prev,isSeller: first}
        })
    }
    
    const [user, setuser] = useState({
        username: "",
        email: "",
        password: "",
        img: "",
        country: "",
        phoneno: 0,
        desc: "",
        isSeller: false
    })
    const handleChange = (e)=>{
       setuser((prev)=>{
        return {...prev,[e.target.name]: e.target.value}
       })
    }
    console.log(user)
    const handleSubmit  = async(e)=>{
       
    e.preventDefault();
    const url = await upload(file)
    console.log(url)

    try {
        await apiRequest.post("/auth/register",{
            ...user,
            img: url
        })
        notify()
        setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
        const notify = () => toast(error.response.data);
        notify()
    }
    }
    const navigate = useNavigate();
    return (
        <>
         <div>
            <div className="pl-40 pr-36 pt-4">
                <div className="p-9">
                    <form action="" className="flex justify-center gap-16" onSubmit={handleSubmit}>
                     <div className="left flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Create a new Account</h1>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Username</label></div>
                            <div className=""><input type="text" className="border border-black p-1 w-full" name="username" onChange={handleChange}/></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Email</label></div>
                            <div className=""><input type="email" className="border border-black p-1 w-full" name="email" onChange={handleChange}/></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Password</label></div>
                            <div className=""><input type="password" className="border border-black p-1 w-full" /></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Confirm Password</label></div>
                            <div className=""><input type="text" className="border border-black p-1 w-full" name="password" onChange={handleChange}/></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Profile Picture</label></div>
                            <div className=""><input type="file" className="border border-black p-1 w-full" onChange={(e)=>{setfile(e.target.files[0]),console.log(file)}}/></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Country</label></div>
                            <div className=""><input type="text" className="border border-black p-1 w-full" name="country" onChange={handleChange}/></div>
                        </div>
                     </div>
                     
                     <div className="right flex flex-col gap-2">
                         <h1 className="text-2xl font-bold">I want to become a Seller</h1>
                         <div className="flex gap-4"><span>I want to activate seller account</span> {!first?<img src="/download (15).png" alt="" className="w-6" onClick={handleClick}/>:<img src="/download (14).png" alt="" className="w-6" onClick={handleClick}/>}</div>
                         <div className="flex flex-col gap-2">
                         <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Phone Number</label></div>
                            <div className=""><input type="number" className="border border-black p-1 w-full" name="phoneno" onChange={handleChange}/></div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div><label htmlFor="">Description</label></div>
                            <div className=""><textarea id=""className="border border-black w-full h-28" name="desc" onChange={handleChange}></textarea></div>
                        </div>
                         </div>
                         <button className="bg-green-700 p-2 text-white">Register</button>
                     </div>
                     <ToastContainer />

                    </form>
                </div>
            </div>
         </div>
        </>
    )
}
export default Register