import { Link } from "react-router-dom"

function CatCard({ item }) {
    return (
        <>
            <Link to="/gig/123">
                <div className="flex flex-col items-center h-800 p-10"> {/* Add padding to space out cards */}
                    <img src={item.img} alt="" className="w-48 h-52" />
                    <div className="flex flex-col items-center"> {/* Center text content */}
                        <span className="text-black text-xs">{item.desc}</span>
                        <span className="font-bold text-black">{item.title}</span>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default CatCard;
