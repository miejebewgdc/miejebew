/**
 * LocationSection Component
 * Location & Contact section for Mie Jebew GDC
 */

// ========================================
// CONSTANTS
// ========================================
const WHATSAPP_NUMBER = "628989419121" // Format: country code + number
const WHATSAPP_MESSAGE = "Halo, saya ingin pesan Mie Jebew!"
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Grand+Depok+City+Mie+Jebew"

export function LocationSection() {
    // WhatsApp handler
    const handleWhatsApp = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
        window.open(url, "_blank")
    }

    // Google Maps handler
    const handleDirections = () => {
        window.open(GOOGLE_MAPS_URL, "_blank")
    }

    return (
        <section id="location" className="w-full px-4 md:px-10 lg:px-40 py-20 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1280px] mx-auto">
                {/* Hero / Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Content & Details */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        <div className="flex flex-col gap-4">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/20 dark:text-red-400 uppercase tracking-wider">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                Lokasi Outlet
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-text-main dark:text-white">
                                Temukan Pedasnya <span className="text-primary">Di Sini</span>
                            </h2>
                            <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed max-w-lg">
                                Rasakan sensasi pedas nendang di outlet kami. Tempat yang nyaman untuk menikmati mie pedas, kebab, dan lumpia beef favoritmu.
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="flex flex-col gap-4">
                            {/* Address Card */}
                            <div className="group flex gap-5 rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined">storefront</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-bold text-text-main dark:text-white">Alamat Lengkap</h3>
                                    <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                                        Jl. Grand Depok City, Tirtajaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412
                                    </p>
                                </div>
                            </div>

                            {/* Hours Card */}
                            <div className="group flex gap-5 rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-bold text-text-main dark:text-white">Jam Operasional</h3>
                                    <p className="text-sm text-text-muted dark:text-gray-400">
                                        Setiap Hari: 10.00 - 22.00 WIB
                                    </p>
                                </div>
                            </div>

                            {/* Contact Card */}
                            <div className="group flex gap-5 rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-bold text-text-main dark:text-white">Kontak & Pemesanan</h3>
                                    <p className="text-sm text-text-muted dark:text-gray-400">
                                        0898-9419-121 (WhatsApp Available)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button
                                onClick={handleDirections}
                                className="flex h-14 min-w-[180px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
                            >
                                <span className="material-symbols-outlined">directions</span>
                                <span>GET DIRECTIONS</span>
                            </button>
                            <button
                                onClick={handleWhatsApp}
                                className="flex h-14 min-w-[180px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-transparent px-8 text-base font-bold text-text-main dark:text-white transition-colors hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-green-600">chat</span>
                                <span>Order via WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Map Visual */}
                    <div
                        onClick={handleDirections}
                        className="relative order-1 lg:order-2 h-[300px] lg:h-auto min-h-[400px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200 dark:shadow-black/50 group cursor-pointer"
                    >
                        {/* Map Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANDJkMlQWP5aObJyPtkBrbYhBBk3YljIN6ynJmECZa02Z0bNqx6kspeLhp6IVpC-pb03cZtwqCCi-t4FuT-p53olth-l1gfyeaGB5b5CGwSNQb7TNcQTutLEQCNuAmkNlWCdAOd0L3oqE4KxiJUxTAdJvEUCxWByWXF63zv4CXKMmTq_5kn4Na1Zh9Cy9PSFAgrmVI13b_UTXkMZAW4lsjDbdAjCDV9pC4LMdyxRtcyxB2y0MZca8MRxEEzn6MUPYJWAsXdNlJB20')" }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Map Pin Element */}
                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center drop-shadow-lg animate-bounce" style={{ animationDuration: "2s" }}>
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl ring-4 ring-white dark:ring-background-dark">
                                <span className="material-symbols-outlined text-4xl">restaurant</span>
                            </div>
                            <div className="mt-2 rounded-full bg-white dark:bg-background-dark px-4 py-1 text-xs font-bold text-primary shadow-lg">
                                Mie Jebew GDC
                            </div>
                            {/* Triangle pointer */}
                            <div className="h-3 w-3 -translate-y-2 rotate-45 bg-white dark:bg-background-dark" />
                        </div>

                        {/* Map Controls Simulation */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md text-gray-600 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">add</span>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md text-gray-600 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">remove</span>
                            </div>
                        </div>

                        {/* Map Badge */}
                        <div className="absolute top-6 left-6">
                            <div className="flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 shadow-md">
                                <span className="material-symbols-outlined text-primary">map</span>
                                <span className="text-xs font-bold text-gray-800">Klik untuk buka Maps</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
