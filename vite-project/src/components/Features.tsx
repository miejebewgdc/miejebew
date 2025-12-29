export function Features() {
    return (
        <section className="w-full bg-primary py-10">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-white text-4xl">restaurant</span>
                    <p className="text-white font-bold text-lg">Fresh Ingredients</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-white text-4xl">room_service</span>
                    <p className="text-white font-bold text-lg">Quick Service</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-white text-4xl">workspace_premium</span>
                    <p className="text-white font-bold text-lg">Best Quality</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-white text-4xl">verified</span>
                    <p className="text-white font-bold text-lg">Halal Certified</p>
                </div>
            </div>
        </section>
    )
}
