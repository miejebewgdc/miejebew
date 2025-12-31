import { Button } from "@/components/ui/button"

// Constants

export function Header() {
    // Smooth scroll handler
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault()
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    // Order handler
    const handleOrderNow = () => {
        window.open("https://lynk.id/miejebew-gdc", "_blank")
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="px-4 md:px-10 lg:px-40 py-3">
                <div className="flex items-center justify-between max-w-[1280px] mx-auto">
                    <div className="flex items-center gap-3">
                        <img src={`${import.meta.env.BASE_URL}mie-jebew-logo.webp`} alt="Mie Jebew GDC" className="h-14 w-auto object-contain" />
                        <h2 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Mie Jebew GDC</h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                        <nav className="flex items-center gap-8">
                            <a
                                className="text-sm font-bold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors cursor-pointer"
                                href="#about"
                                onClick={(e) => scrollToSection(e, "about")}
                            >
                                About Us
                            </a>
                            <a
                                className="text-sm font-bold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors cursor-pointer"
                                href="#menu"
                                onClick={(e) => scrollToSection(e, "menu")}
                            >
                                Menu
                            </a>
                            <a
                                className="text-sm font-bold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors cursor-pointer"
                                href="#location"
                                onClick={(e) => scrollToSection(e, "location")}
                            >
                                Contact
                            </a>
                        </nav>
                        <Button
                            onClick={handleOrderNow}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold h-10 px-6 rounded-full transition-all transform active:scale-95 shadow-lg shadow-primary/25"
                        >
                            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                            <span>Order Now</span>
                        </Button>
                    </div>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-text-main dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

