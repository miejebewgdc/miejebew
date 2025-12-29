import { Button } from "@/components/ui/button"

export function CTA() {
    return (
        <section className="w-full px-4 md:px-10 lg:px-40 pb-20 pt-10 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1280px] mx-auto bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-16 gap-10">
                    <div className="flex flex-col gap-6 flex-1 items-start text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Siap Merasakan Pedasnya? <br /> Pesan Sekarang!
                        </h2>
                        <p className="text-white/90 text-lg max-w-md">
                            Dapatkan promo spesial untuk pesanan pertama via aplikasi atau website kami.
                        </p>
                        <div className="flex flex-wrap gap-4 w-full">
                            <Button
                                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-primary px-8 py-6 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                View Menu
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => window.open('https://www.youtube.com/watch?v=lXPkNtDtySA', '_blank')}
                                className="bg-primary hover:bg-primary-dark text-white border border-white/30 px-8 py-6 rounded-full font-bold text-lg transition-colors shadow-lg"
                            >
                                Watch Video
                                <span className="material-symbols-outlined ml-2">play_circle</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end relative">
                        <div className="relative w-[300px] md:w-[400px]">
                            {/* Phone Mockup Abstract */}
                            <img alt="Food Delivery App" className="rounded-2xl rotate-3 shadow-2xl border-4 border-white/20" src="https://i.ibb.co/k65ntvJm/unnamed-1.png" />
                            {/* Floating Sticker */}
                            {/* Floating Sticker */}
                            <div className="absolute -bottom-6 -left-6 bg-accent-yellow text-black font-black p-4 rounded-full w-28 h-28 flex flex-col items-center justify-center animate-float-rotate shadow-lg text-center leading-none">
                                <span className="material-symbols-outlined text-3xl mb-1">room_service</span>
                                <span className="text-xs">QUICK<br />SERVICE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
