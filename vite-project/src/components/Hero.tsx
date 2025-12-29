

export function Hero() {
    return (
        <section className="w-full px-4 md:px-10 lg:px-40 py-12 md:py-20 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-yellow/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6 items-start z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-yellow/30 text-yellow-900 rounded-full text-xs font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                        Tantang Batas Pedasmu
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-text-main dark:text-white">
                        Berani Coba <br />
                        <span className="text-primary relative inline-block">
                            Pedasnya?
                            <svg className="absolute -bottom-2 left-0 w-full" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 53.6565 3.00004 98.4998 3.00002C143.343 3 197.5 7 197.5 7" stroke="#FFD600" strokeLinecap="round" strokeWidth="4"></path></svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted dark:text-gray-300 max-w-lg leading-relaxed">
                        Saatnya rasain sendiri pedas otentik yang bikin ketagihan dan susah move on. Nikmatnya bisa kamu temuin kapan pun, di mana pun!
                    </p>

                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 w-full max-w-md">
                        <div className="flex -space-x-3">
                            <img alt="Happy customer 1" className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1UlDspWiUJADNLgD1JwnLbtaYZjuwnRdtZkLAUapFb3TuIXE0awjil9-cIPiGYZldqOSyzStUtKmMZZp7Qre1ChNDj5l_3HzWEUNiJdkqxG7FmUcmaj_WtNpgkMmGKXExentaUKXwMCbaGK1arrIQJDFwG0yK8NUgSgMTzmFGIMZiz-WhCqk74s1YIKWyBv73yMePJX0PUi2pwNbGmQ2kXCztKNIYxjFHP1Zk99ZmeFFslx5OWyHo1bitsp_9DOr40NUMaTdGnSM" />
                            <img alt="Happy customer 2" className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn-8OJVq83xXDYpuyvAjU7v4gykACddZOlsFmkewFrfcCYYZaVnECwHaIHctX7cQtHnay2bbKC88qwUFTs5JLy3TezPO4Y0_0aY5Jqhi1tiKse8cz4mcXr0c82M32iB23myTNsLHCN3ltdrQd2cJW1upP8rBT8gd3DRONgeWqlA1FitaTfFh6iif3a-t3SqEl3QFqD-etvhDoJlIhESLiK6GfMlmUQUDGhOTrHtSxu6-JbouPvt0SenqzUFLdifV_r_uHdDxMrvzQ" />
                            <img alt="Happy customer 3" className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvOOeDlP00emOMRYlAez-HaxUAaDuUTWOMmlV4gtjNwSJWlU45hwKM2pV_OhdO1bE83uFSMkKJ2IpqPCMGztjr54kzSvyO-bIaUwkyuPNcNM-HTlBib3uhP81aAfKQXl3qk5ZAnHnaMN3mIGD8iYwkL1D9MoZxcOwznQW_frsHem7YjIFAJsOrDTU4WE91LlJyWHiMUKCses7IRfO7wwfMUeaibEmC1G9sk9X5syMjH1-eVMXqfp8pVxusQtr4T8P2iJ0tIJ-zE40" />
                            <div className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-xs font-bold border-2 border-white dark:border-background-dark text-text-main">+2k</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-accent-yellow">
                                <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                                <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                                <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                                <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                                <span className="material-symbols-outlined text-[18px] fill-1">star</span>
                            </div>
                            <span className="text-xs font-semibold text-text-muted dark:text-gray-400">Pecinta Pedas</span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full aspect-square lg:h-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent opacity-50 blur-2xl"></div>
                    {/* Using a circular mask for dynamic feel */}
                    <div className="relative w-full max-w-[500px] aspect-square rounded-full border-8 border-white/50 dark:border-white/10 shadow-2xl overflow-hidden animate-float">
                        <img alt="Spicy noodle bowl with chopsticks" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="/hero-image-new.jpg" />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute bottom-10 -left-4 md:left-10 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <span className="material-symbols-outlined">thumb_up</span>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted dark:text-gray-400 font-medium">Coba Sekali</p>
                            <p className="text-sm font-bold text-text-main dark:text-white">Nagih Berkali-Kali</p>
                        </div>
                    </div>
                    {/* Floating Badge 2 */}
                    <div className="absolute top-10 right-0 md:right-10 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-delayed">
                        <div className="bg-accent-yellow/20 p-2 rounded-full text-yellow-700">
                            <span className="material-symbols-outlined fill-1">local_offer</span>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted dark:text-gray-400 font-medium">Promo Harian</p>
                            <p className="text-sm font-bold text-text-main dark:text-white">Gratis Minuman</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
