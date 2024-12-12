function Video() {
    return (
        <>
            <div className="bg-blue-700 w-full h-1/2 flex justify-center items-center text-white font-mono">
                <div className="p-10 pl-16 pr-16 flex justify-center items-center gap-10">
                    <div className="left flex flex-col gap-5 w-1/2">
                    <h1 className="text-3xl font-bold text-white"><i>Whole world of FreeLance talent at your fingertips</i></h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-4">
                                <img src="/icons8-checkmark-50.png" alt="" className="w-6" />
                                <h3 className="text-lg font-bold text-white">The Best for Every Buget</h3>
                            </div>
                            <p className="text-sm">Find high quality services at every price point. No hourly rates just project based pricing</p>
                        </div>
                        <div>
                        <div className="flex gap-4">
                        <img src="/icons8-checkmark-50.png" alt="" className="w-6" />
                                <h3 className="text-lg font-bold text-white">Quality wirk done quickly</h3>
                            </div>
                            <p>Find the right FreeLancer to begin working on your project within minutes.</p>
                        </div>
                        <div>
                        <div className="flex gap-4">
                        <img src="/icons8-checkmark-50.png" alt="" className="w-6" />
                                <h3 className="text-lg font-bold text-white">Protected Payments, Evry time</h3>
                            </div>
                            <p>Always know waht you'll pay upfront. Your payment isn't released untill you approve the work</p>
                        </div>
                        <div>
                        <div className="flex gap-4">
                        <img src="/icons8-checkmark-50.png" alt="" className="w-6" />
                                <h3 className="text-lg font-bold text-white">24/7</h3>
                            </div>
                            <p>Find high quality services at every price point. No hourly rates just project based pricing</p>
                        </div>
                    </div>
                    <div className="right w-96">
                        <video src="/Left Right (Official Video) Ajay Hooda & Neha Rana __ S Surila __ New Haryanvi Song 2020 _ Mor Music.mp4" controls className="w- h-72"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video