import { useNavigate } from "react-router-dom";

function Filter(){
    const navigate = useNavigate();
   const handleSubmit = (e)=>{
    
    
    const p = e.target[0].value
    try {
        navigate(`/gigs?cat=${p}`)
    } catch (error) {
        console.log(error)
    }
   }
    return(
        <>
        <div className="">
            <form action="" className="flex items-center" onSubmit={handleSubmit}>
                <input type="text" name="filter" id="filter" className="w-96 h-9 text-black text-lg"
                />
                <button className="text-lg bg-green-300 p-1"> 
                    Search
                </button>
            </form>
        </div>
        </>
    )
}
export default Filter