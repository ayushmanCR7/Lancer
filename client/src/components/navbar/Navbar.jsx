import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../routes/authContext/Context";
import apiRequest from "../../utilis/request";

function Navbar() {
    const [iactive, setActive] = useState(false);
    const {currentUser,updateUser} = useContext(AuthContext)
    const [user, setuser] = useState(false);
    console.log(currentUser)
    const [click,setClick] = useState(false);
    const {pathname} =  useLocation();

    useEffect(() => {
        setuser(currentUser !== null);
      }, [currentUser]);
    
    
    const isActive = () => {
        console.log("Checking scroll position");
        setActive(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        };
    }, []);
    
    const handleClick = ()=>{
        if(click === true){
            setClick(false);
        }
        else{
            setClick(true);
        }
    }
    const handleClicks = async()=>{
        try {
           const res =  await apiRequest.post("/auth/logout");
            updateUser(null);
            setuser(false)

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
          
            <div className={`${iactive || pathname !=="/" ? 'bg-white text-black' : 'bg-green-700 text-white'} pl-40 pr-36 pt-4 pb-1 font-mono flex-col items-center justify-center transition-all sticky top-0 z-10`}>
                <div className="flex justify-between pb-4">
                    <Link to = "/">
                    <div className="text-2xl font-bold">Lancer</div>
                    </Link>
                    
                    <div className={`flex gap-4 items-center ${iactive || pathname !=="/" ? 'text-black' : 'text-white'}`}>
                        <Link to="/">
                            <div>Lancer Business</div>
                        </Link>
                        <Link to="/">
                            <div>Explore</div>
                        </Link>
                        <Link to="/">
                            <div>English</div>
                        </Link>
                        {!user?
                          <Link to = "/register">
                          <div>Become a Seller</div> 
                        </Link>: <img src={currentUser.img || "/anonymous.png"} className="w-6"/>}
                        {!user? <Link to="/login">
                            <div>LogIn</div>
                        </Link>: <div className="relative cursor-pointer" onClick={handleClick}>
                            {currentUser.username}
                            {click && <div className="flex flex-col absolute border-white border-2 rounded -xl bg-white text-black p-2 gap-2 cursor-pointer">
                                {currentUser.isSeller && 
                                <Link to="/mygigs"><div>
                                    MyGigs
                                </div>
                                </Link>}

                                {currentUser.isSeller && 
                                <Link to = "/add" ><div>
                                    AddGigs
                                </div></Link>}
                                <Link to = "/gigs">
                                <div>
                                    All Gigs
                                </div>
                                </Link>
                                <Link to = "/messages">
                                <div>
                                    Messages
                                </div>
                                </Link>
                                <Link to = "/orders">
                                <div>
                                    orders
                                </div>
                                </Link>
                                <div onClick={handleClicks}>
                                    Logout
                                </div>
                            </div>}
                            </div>
                            
                            }                    
                        {!user && 
                        <Link to = "/register">
                        <button className="border border-white rounded-lg p-2 hover:bg-green-900">
                            Join
                        </button></Link>}
                    </div>
                </div>
                {(iactive || pathname !=="/") && <hr className="bg-black" />}
                {(iactive || pathname !=="/") && (
                    <div className="flex justify-between text-black">
                        <div className="text-xs">Graphics&Design</div>
                        <div className="text-xs">Video&Animation</div>
                        <div className="text-xs">Writing&Translation</div>
                        <div className="text-xs">AI Services</div>
                        <div className="text-xs">Digital Marketing</div>
                        <div className="text-xs">Music&Audio</div>
                        <div className="text-xs">Programming&Tech</div>
                        <div className="text-xs">Business</div>
                        <div className="text-xs">Lifestyle</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;