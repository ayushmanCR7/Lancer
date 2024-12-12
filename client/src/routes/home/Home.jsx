import { Link } from "react-router-dom"
import CatCard from "../../components/catCard/catCard"
import Featured from "../../components/featured/Featured"
import Mid from "../../components/mid/Mid"
import Slide from "../../components/slider/Slider"
import Video from "../../components/video/Video"
import { cards } from "../../data"
import { projects } from "../../data"
import ProjectCards from "../../components/projectscard/ProjectsCard"
import Footer from "../../components/footer/Footer"

function Home() {
    return (
        <>
            <div>
                <div className="flex flex-col items-center"> {/* Add items-center to center contents */}
                    <Featured />
                    <Mid />
                    <div className="w-full flex justify-center bg-white"> {/* Center the slider container */}
                        <Slide slidesToShow={5} arrowScroll={5}>
                            {cards.map(card => (
                                <CatCard item={card} key={card.id} />
                            ))}
                        </Slide>
                    </div>
                    <div>
                        <Video />
                    </div>
                    <div className="w-full">
                        <div className="p-10 pl-36 pr-36 flex flex-col gap-5 w-full items-center">
                            <h1 className="flex justify-start text-2xl font-bold">Explore the MarketPlace</h1>
                            <div className="flex flex-wrap gap-10 justify-center items-center w-10/12">
                                    <Link to = "/gigs">
                                    <div className="flex flex-col items-center  border-green-700 border-2 rounded-xl p-2 w-28">
                                        <img src="/illustration.png" alt="" className="w-8" />
                                        <p>Graphics</p>
                                    </div>
                                    </Link> 
                                    <Link to = "/gigs">
                                    <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                        <img src="/social-media.png" alt="" className="w-8" />
                                        <p>Digital</p>
                                    </div>
                                    </Link>
                                    <Link to = "/gigs">
                                    <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                        <img src="/writing.png" alt="" className="w-8" />
                                        <p>Wriring</p>
                                    </div>
                                    </Link>
                                    <Link to = "/gigs">
                                    <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                        <img src="/play.png" alt="" className="w-8" />
                                        <p>Video</p>
                                    </div>
                                    </Link>
                                    <Link to = "/gigs">
                                    <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                        <img src="/guitar.png" alt="" className="w-8" />
                                        <p>Music</p>
                                       

                                </div>
                                </Link>

                                <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28 ">
                                    <img src="/programming.png" alt="" className="w-8" />
                                    <p>Programming</p>
                                </div>
                                <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                    <img src="/planning.png" alt="" className="w-8" />
                                    <p>Business</p>
                                </div>
                                <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                    <img src="/lifestyle.png" alt="" className="w-8" />
                                    <p>LifeStyle</p>
                                </div>
                                <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                    <img src="/icons8-bar-chart-50.png" alt="" className="w-8" />
                                    <p>Data</p>
                                </div>
                                <div className="flex flex-col items-center border-green-700 border-2 rounded-xl p-2 w-28">
                                    <img src="/icons8-photography-50.png" alt="" className="w-8" />
                                    <p>PhotoGraphy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-blue-700 font-mono">
                        <div className="p-10 pl-36 pr-36 text-white flex justify-between">
                            <div className="left flex flex-col gap-5">
                                    <h1 className="text-2xl"><b>lancer</b> <i>business</i></h1>
                                    <h1 className="text-3xl"><b>A Business designed for </b><i>teams</i></h1>
                                    <p>Update to a curated experience packed with tools and benefits</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-3">
                                            <img src="/icons8-checkmark-50.png" alt="" className="w-5"/>
                                            <p>Connect to freelancer with proper business projects</p>
                                        </div>
                                        <div className="flex gap-3">
                                        <img src="/icons8-checkmark-50.png" alt="" className="w-5"/>                                            <p>Connect to freelancer with proper business projects</p>
                                        </div>
                                        <div className="flex gap-3">
                                        <img src="/icons8-checkmark-50.png" alt="" className="w-5"/>                                            <p>Connect to freelancer with proper business projects</p>
                                        </div>
                                    </div>
                                    <button className="bg-green-500 p-3 font-bold rounded-sm w-1/2">
                                        Explore Lancer Business
                                    </button>
                            </div>
                            <div className="right w-1/2">
                                 <img src="/fiverr-pro_2x.webp" alt="" className=""/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center bg-white"> {/* Center the slider container */}
                        <Slide slidesToShow={5} arrowScroll={5}>
                            {projects.map(card=> (
                                <ProjectCards item={card} key={card.id} />
                            ))}
                        </Slide>
                    </div>
                    
                   
                   
                </div>
            </div>
        </>
    );
}

export default Home;
