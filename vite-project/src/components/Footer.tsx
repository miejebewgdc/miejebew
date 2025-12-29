

export function Footer() {
    return (
        <footer className="w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col gap-4 col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <img src="/mie-jebew-logo.png" alt="Mie Jebew GDC" className="h-12 w-auto object-contain" />
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Mie Jebew GDC</h3>
                        </div>
                        <p className="text-sm text-text-muted dark:text-gray-400">
                            The spiciest, tastiest noodle sensation in Grand Depok City. Halal & Delicious.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">chat</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main dark:text-white mb-4">Quick Links</h4>
                        <ul className="flex flex-col gap-2 text-sm text-text-muted dark:text-gray-400">
                            <li>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    Menu
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    Locations
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main dark:text-white mb-4">Contact</h4>
                        <ul className="flex flex-col gap-2 text-sm text-text-muted dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">call</span>
                                +62 8989-419-121
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">mail</span>
                                miejebew.depok@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                10:00 AM - 10:00 PM
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted dark:text-gray-500">
                    <p>© 2025 Mie Jebew GDC. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
