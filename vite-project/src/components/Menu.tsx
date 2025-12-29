import { Button } from "@/components/ui/button"
import { MENU_DATA } from "./MenuSection"

export function Menu() {
    const handleOrderClick = (id: number) => {
        const item = MENU_DATA.find(i => i.id === id)

        // Dispatch event to switch category immediately
        if (item) {
            const switchEvent = new CustomEvent('switch-category', { detail: item.category })
            window.dispatchEvent(switchEvent)
        }

        const menuSection = document.getElementById('menu')
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' })
        }

        // Dispatch event to open modal in MenuSection
        setTimeout(() => {
            const event = new CustomEvent('open-product-modal', { detail: id })
            window.dispatchEvent(event)
        }, 800)
    }

    // Ratings data mapping (since it's not in the main data)
    const RATINGS = [
        { score: 4.9, count: "1.2k" },
        { score: 4.7, count: "850" },
        { score: 4.8, count: "540" }
    ]

    return (
        <section className="w-full px-4 md:px-10 lg:px-40 py-20 bg-background-light dark:bg-background-dark" id="specialties">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Menu</span>
                        <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight">
                            The Spicy Trio Fighters
                        </h2>
                        <p className="text-text-muted dark:text-gray-400 text-lg">
                            More than food, it’s an experience. Select your signature dish from our menu.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors hover:bg-transparent p-0"
                        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span>View Full Menu</span>
                        <span className="material-symbols-outlined">arrow_right_alt</span>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MENU_DATA.slice(0, 3).map((item, index) => (
                        <div key={item.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-transparent hover:border-primary/10">
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
                                {item.badge && (
                                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                        {item.badge}
                                    </div>
                                )}
                                <img
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src={item.image}
                                />
                            </div>
                            <div className="flex flex-col gap-3 px-2 pb-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-text-main dark:text-white">{item.name}</h3>
                                    <span className="text-primary font-bold">{item.priceDisplay}</span>
                                </div>
                                <p className="text-sm text-text-muted dark:text-gray-400 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center gap-1 text-accent-yellow mt-1">
                                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                                    <span className="text-sm font-bold text-text-main dark:text-gray-200">{RATINGS[index]?.score || 4.5}</span>
                                    <span className="text-xs text-text-muted ml-1">({RATINGS[index]?.count || '100+'} reviews)</span>
                                </div>
                                <Button
                                    onClick={() => handleOrderClick(item.id)}
                                    variant="outline"
                                    className="mt-4 w-full h-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn dark:text-white"
                                >
                                    Add to Order
                                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">add_shopping_cart</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
