import { Link } from "react-router-dom"
function Ad(){
    return <>
          <div className="w-full p-3 pl-10 pr-10">
                    <div className="flex justify-between items-center">
                        <div>
                         <p className="text-lg"><b><i>Lancer</i></b></p>
                        </div>
                        
                        <div className="flex gap-5">
                            <Link to = "/">
                            <img src="/download (1).png" alt="" className="w-7 h-7" />
                            </Link>
                            
                            <Link to = "/">
                            <img src="/download (2).png" alt="" className="w-7 h-7" />
                            </Link>
                            <Link to = "/">
                            <img src="/download (3).png" alt="" className="w-7 h-7" />
                            </Link>
                            <Link to = "/">
                            <img src="/download (4).png" alt="" className="w-7 h-7" />
                            </Link>
                            <Link to = "/">
                            <img src="/download (5).png" alt="" className="w-7 h-7" />
                            </Link>
                        </div>
                    </div>
                   </div>
    </>
}
export default Ad