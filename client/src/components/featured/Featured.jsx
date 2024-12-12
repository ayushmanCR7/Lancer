import Filter from "../Filter/Filter"
function Featured(){
    return (
        <>
         <div className="w-screen h-96 bg-green-700 pl-24 pr-20 flex justify-center gap-10 font-mono">
            <div className="left w-1/2 text-4xl text-white flex flex-col pt-28 gap-5">
               <div>
                     Find the perfect <i className="font-bold">Freelancer</i> For Your Business
               </div>
               <div>
                  <Filter/>
               </div>
               <div className="text-sm flex justify-centre items-center gap-6">
                <div>
                  Popular:
                </div>
                <div className="border-white border-2 p-0.5 rounded-lg text-xs">
                     Web Design
                </div>
                <div className="border-white border-2 p-0.5 rounded-lg text-xs">
                     Poster
                </div>
                <div className="border-white border-2 p-0.5 rounded-lg text-xs">
                     Guidance
                </div>
                <div className="border-white border-2 p-0.5 rounded-lg text-xs">
                     App Design
                </div>
               </div>
            </div>
            <div className=" flex justify-center items-center">
                <img src="/img.webp" alt="" className="right w-full object-cover rounded-xl h-full" />
            </div>
         </div>
        </>
    )
}
export default Featured