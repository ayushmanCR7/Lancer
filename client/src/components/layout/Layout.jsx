import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Ad from "../ad/Ad"
import { useContext } from "react"
import { AuthContext } from "../../routes/authContext/Context.jsx"
import { Navigate } from "react-router-dom"

function Layout(){
  
   return (
    <>
   
       <div className="w-full">
        <div className="sticky top-0 z-50">
        <Navbar/>
        </div>
       <div>
        <Outlet/>
       </div>
       
       <div>
         <Footer/>
       </div>
       <div className="bg-black w-full h-[1px]"></div>
       <div>
         <Ad/>
       </div>
       </div>
      
    </>
   )
}
function Requiredlayout(){
  
  const {currentUser} = useContext(AuthContext);

  if(!currentUser) return <Navigate to = "/login"/>;
  else{
    return <>
   
        <div className="w-full">
        <div className="sticky top-0 z-50">
        <Navbar/>
        </div>
       <div>
        <Outlet/>
       </div>
       
       <div>
         <Footer/>
       </div>
       <div className="bg-black w-full h-[1px]"></div>
       <div>
         <Ad/>
       </div>
       </div>
      
    </>
  }

}
export {Layout,Requiredlayout}