import { Link } from "react-router-dom"

function ProjectCards({ item }) {
    return (
        <>
            <Link to="/gig/123">
                <div className="flex flex-col items-center h-80 p-10"> {/* Add padding to space out cards */}
                    <img src={item.img} alt="" className="w-56 h-48" />
                    <div className="text-xs h-28 flex justify-center items-center">
                        <div className="p-3 flex flex-col gap-2 justify-center items-center">
                            <div className="left flex gap-2">
                            
                            <img src={item.pp} alt="" className="w-12 rounded-full h-9 relative"/>
                            <div className="text-sx">{item.username}</div>
                            </div>
                            <div className="right flex flex-col font-bold items-center justify-center text-wrap">
                                {item.cat}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default ProjectCards;
