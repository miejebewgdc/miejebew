import { useState, useEffect, createContext, useContext } from "react"

// ========================================
// CART CONTEXT - Global cart state
// ========================================
interface CartItem {
    id: number
    name: string
    price: number
    qty: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    cartCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(c => c.id === item.id)
            if (existing) {
                return prev.map(c =>
                    c.id === item.id ? { ...c, qty: c.qty + item.qty } : c
                )
            }
            return [...prev, item]
        })
    }

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within CartProvider")
    }
    return context
}

// ========================================
// MENU DATA
// ========================================
interface MenuItem {
    id: number
    name: string
    category: string
    price: number
    priceDisplay: string
    description: string
    image: string
    spiceLevel: number
    badge?: string
    badgeIcon?: string
    isDrink?: boolean
}

export const MENU_DATA: MenuItem[] = [
    {
        id: 1,
        name: "Mie Jebew",
        category: "mie",
        price: 10000,
        priceDisplay: "Rp 10.000",
        description: "Mie Pedas Viral asal Garut dengan Rasa Nikmat yang Hakiki dan Bikin Nagih.",
        image: "https://i.ibb.co/tG4WkRC/unnamed-2-s.jpg",
        spiceLevel: 0,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 2,
        name: "Kebab Beef Slice",
        category: "kebab",
        price: 10000,
        priceDisplay: "Rp 10.000",
        description: "Kebab dengan isian Beef Slice dibalut Tortilla, dipadu Lettuce dan Timun segar.",
        image: "https://i.ibb.co/yFmhpVwJ/KEBAB-BEEF-SLICE.jpg",
        spiceLevel: 0
    },
    {
        id: 3,
        name: "Lumpia Beef Slice",
        category: "lumpia",
        price: 10000,
        priceDisplay: "Rp 10.000",
        description: "Lumpia dengan isian Beef Slice, Makaroni, Jagung Manis dan Selada nggak mau ketinggalan, Mayo & Saus jadi perekat hubungan.",
        image: "https://i.ibb.co/9Hhd4XTy/Lumpia-a.jpg",
        spiceLevel: 0
    },
    {
        id: 4,
        name: "Mie Jebew +3 Topping",
        category: "mie",
        price: 15000,
        priceDisplay: "Rp 15.000",
        description: "Mie Pedas Viral asal Garut dengan Rasa Nikmat yang Hakiki dan Bikin Nagih dengan 3 Topping.",
        image: "https://i.ibb.co/q37MWbdY/MIE-JEBEW-3-TOPPING.jpg",
        spiceLevel: 0
    },
    {
        id: 5,
        name: "Mie Jebew +7 Topping",
        category: "mie",
        price: 20000,
        priceDisplay: "Rp 20.000",
        description: "Mie Pedas Viral asal Garut dengan Rasa Nikmat yang Hakiki dan Bikin Nagih dengan 7 Topping.",
        image: "https://i.ibb.co/mCGF9Xh8/MIE-JEBEW-7-TOPPING.jpg",
        spiceLevel: 0
    },
    {
        id: 6,
        name: "Kebab Beef Regular",
        category: "kebab",
        price: 12000,
        priceDisplay: "Rp 12.000",
        description: "Kebab dengan isian Daging Sapi Premium dibalut Tortilla ukuran besar 23 cm, dipadu Lettuce dan Timun segar.",
        image: "https://i.ibb.co/hFHwyzzQ/Kebab-Beef-Biasa.jpg",
        spiceLevel: 0
    },
    {
        id: 7,
        name: "Lumpia Beef Patty",
        category: "lumpia",
        price: 14000,
        priceDisplay: "Rp 14.000",
        description: "Lumpia dengan isian Beef Patty, Makaroni, Jagung Manis dan Selada nggak mau ketinggalan, Mayo & Saus jadi perekat hubungan.",
        image: "https://i.ibb.co/27Zz5vqy/LUMPIA-BEEF-PATTY.jpg",
        spiceLevel: 0
    },
    {
        id: 8,
        name: "New Chocolate",
        category: "choco",
        price: 5000,
        priceDisplay: "Rp 5.000",
        description: "Bubuk Coklat Premium + Bubuk Creamer Thailand + Susu Full Cream.",
        image: "https://i.ibb.co/S4vpNY9V/NEW-CHOCOLATE.jpg",
        spiceLevel: 0,
        isDrink: true,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 9,
        name: "Mie Jebew Chicken Katsu",
        category: "mie",
        price: 16000,
        priceDisplay: "Rp 16.000",
        description: "Mie Pedas Viral asal Garut dengan Rasa Nikmat yang Hakiki dan Bikin Nagih dengan Chicken Katsu.",
        image: "https://i.ibb.co/tM7cVHSG/MIE-JEBEW-CHICKEN-KATSU.jpg",
        spiceLevel: 0,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 10,
        name: "Kebab Beef Large",
        category: "kebab",
        price: 15000,
        priceDisplay: "Rp 15.000",
        description: "Kebab dengan isian Daging Sapi Premium dibalut Tortilla ukuran besar 25 cm, dipadu Lettuce dan Timun segar.",
        image: "https://i.ibb.co/HfkYhBwm/KEBAB-BEEF-LARGE.jpg",
        spiceLevel: 0,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 11,
        name: "Lumpia Chicken Katsu",
        category: "lumpia",
        price: 14000,
        priceDisplay: "Rp 14.000",
        description: "Lumpia dengan isian Chicken Katsu, Makaroni, Jagung Manis dan Selada nggak mau ketinggalan, Mayo & Saus jadi perekat hubungan.",
        image: "https://i.ibb.co/whPczNX8/LUMPIA-CHICKEN-KATSU.jpg",
        spiceLevel: 0
    },
    {
        id: 12,
        name: "Kebab Chicken Katsu",
        category: "kebab",
        price: 15000,
        priceDisplay: "Rp 15.000",
        description: "Kebab dengan isian Chicken Katsu Premium dibalut Tortilla ukuran besar 25 cm, dipadu Lettuce dan Timun segar.",
        image: "https://i.ibb.co/KnB2PjW/KEBAB-BEEF-CHICKEN-KATSU.jpg",
        spiceLevel: 0
    },
    {
        id: 13,
        name: "Lumpia Beef Special",
        category: "lumpia",
        price: 20000,
        priceDisplay: "Rp 20.000",
        description: "Kulit Lumpia Renyah membungkus Beef Premium, Telur, Keju Lumer, Makaroni, Jagung Manis dan Selada, di sempurnakan dengan Mayo & Saus jadi perekat hubungan.",
        image: "https://i.ibb.co/DSydDjD/LUMPIA-BEEF-SPECIAL.jpg",
        spiceLevel: 0,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 14,
        name: "New Milo Choco",
        category: "choco",
        price: 6000,
        priceDisplay: "Rp 6.000",
        description: "Bubuk Milo + Bubuk Creamer Thailand + Susu Full Cream.",
        image: "https://i.ibb.co/3yQ6SPzC/NEW-MILO-CHOCO.jpg",
        spiceLevel: 0,
        isDrink: true
    },
    {
        id: 15,
        name: "New Choco Coffe",
        category: "choco",
        price: 8000,
        priceDisplay: "Rp 8.000",
        description: "Bubuk Coklat Premium + Kopi Asli 100% House Blend + Bubuk Creamer Thailand + Susu Full Cream.",
        image: "https://i.ibb.co/HDRbW7fk/NEW-CHOCO-COFFEES.jpg",
        spiceLevel: 0,
        isDrink: true,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 16,
        name: "New Matcha",
        category: "tea",
        price: 8000,
        priceDisplay: "Rp 8.000",
        description: "Bubuk Matcha + Bubuk Creamer Thailand + Susu Full Cream.",
        image: "https://i.ibb.co/kg5GvpLJ/NEW-MATCHAE.jpg",
        spiceLevel: 0,
        isDrink: true
    },
    {
        id: 17,
        name: "New Milo Dino",
        category: "choco",
        price: 8000,
        priceDisplay: "Rp 8.000",
        description: "Bubuk Milo + Bubuk Creamer Thailand + Susu Full Cream",
        image: "https://i.ibb.co/VpDJp19R/NEW-MILO-DINOSAUR.jpg",
        spiceLevel: 0,
        isDrink: true,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 18,
        name: "New Coffee",
        category: "choco",
        price: 10000,
        priceDisplay: "Rp 10.000",
        description: "Kopi Asli 100% House Blend + Bubuk Creamer Thailand + Susu Full Cream + Gula Aren.",
        image: "https://i.ibb.co/JFjxsfjV/NEW-COFFEE.jpg",
        spiceLevel: 0,
        isDrink: true,
        badge: "Best Seller",
        badgeIcon: "local_fire_department"
    },
    {
        id: 19,
        name: "Mie Jebew Delight",
        category: "delight",
        price: 12000,
        priceDisplay: "Rp 12.000",
        description: "Varian spesial Mie Jebew dengan topping ekstra melimpah dan rasa yang lebih kaya.",
        image: "https://i.ibb.co/tG4WkRC/unnamed-2-s.jpg",
        spiceLevel: 0
    },
    {
        id: 20,
        name: "Mie Jebew Splash",
        category: "splash",
        price: 12000,
        priceDisplay: "Rp 12.000",
        description: "Mie Jebew dengan sensasi kuah segar yang bikin melek dan ketagihan.",
        image: "https://i.ibb.co/tG4WkRC/unnamed-2-s.jpg",
        spiceLevel: 0
    },
    {
        id: 21,
        name: "Mie Jebew Pedas Mampus",
        category: "pedas",
        price: 13000,
        priceDisplay: "Rp 13.000",
        description: "Tantangan pedas level maksimal untuk para pemberani! Berani coba?",
        image: "https://i.ibb.co/tG4WkRC/unnamed-2-s.jpg",
        spiceLevel: 5,
        badge: "Hot!",
        badgeIcon: "local_fire_department"
    }
]


const FILTER_CATEGORIES = [
    { id: "mie", name: "Mie Jebew", icon: "ramen_dining" },
    { id: "kebab", name: "Kebab", icon: "kebab_dining" },
    { id: "lumpia", name: "Lumpia Beef", icon: "egg" },
    { id: "choco", name: "Choco Series", icon: "local_drink" },
    { id: "tea", name: "Tea Series", icon: "emoji_food_beverage" },
    { id: "delight", name: "Delight", icon: "sentiment_satisfied" },
    { id: "splash", name: "Splash", icon: "water_drop" },
    { id: "pedas", name: "Pedas Mampus", icon: "local_fire_department" }
]

// ========================================
// SPICE LEVEL COMPONENT
// ========================================
function SpiceIndicator({ level, isDrink }: { level: number; isDrink?: boolean }) {
    if (isDrink) {
        return <span className="material-symbols-outlined text-[18px] text-blue-400">local_drink</span>
    }
    if (level === 0) {
        return <span className="material-symbols-outlined text-[18px] opacity-20">local_fire_department</span>
    }
    return (
        <>
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    className={`material-symbols-outlined text-[18px] ${i <= level ? (level >= 4 ? "text-primary" : "text-orange-400") : "opacity-20"
                        }`}
                >
                    local_fire_department
                </span>
            ))}
        </>
    )
}

// ========================================
// MENU CARD COMPONENT
// ========================================
function MenuCard({ item, onCardClick, onAddClick }: {
    item: MenuItem
    onCardClick: () => void
    onAddClick: (e: React.MouseEvent) => void
}) {
    return (
        <div
            className="group bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer"
            onClick={onCardClick}
        >
            <div className="relative aspect-square overflow-hidden">
                {item.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">{item.badgeIcon}</span>
                        {item.badge}
                    </div>
                )}
                <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${item.image}')` }}
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                        {item.name}
                    </h3>
                    <span className="text-lg font-bold text-primary whitespace-nowrap shrink-0">{item.priceDisplay}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className={`flex gap-0.5 ${item.spiceLevel >= 4 ? "text-primary/80" : "text-gray-300 dark:text-gray-600"}`}>
                        <SpiceIndicator level={item.spiceLevel} isDrink={item.isDrink} />
                    </div>
                    <button
                        onClick={onAddClick}
                        className="bg-primary hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-1"
                    >
                        Add <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

// ========================================
// MODAL COMPONENT
// ========================================
function ProductModal({ item, isOpen, onClose, onAddToCart }: {
    item: MenuItem | null
    isOpen: boolean
    onClose: () => void
    onAddToCart: (item: MenuItem, qty: number) => void
}) {
    const [qty, setQty] = useState(1)

    useEffect(() => {
        if (isOpen) setQty(1)
    }, [isOpen])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [isOpen, onClose])

    if (!item) return null

    return (
        <div className={`fixed inset-0 z-[100] ${isOpen ? "flex" : "hidden"} items-center justify-center p-4`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />
            {/* Modal Content */}
            <div className={`relative bg-white dark:bg-[#2a1e1e] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 z-10 flex flex-col max-h-[90vh] ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>

                {/* Image */}
                <div className="relative w-full h-64 sm:h-72 shrink-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex flex-col gap-4 overflow-y-auto">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                            {item.name}
                        </h3>
                        <span className="text-xl sm:text-2xl font-bold text-primary shrink-0">
                            {item.priceDisplay}
                        </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {item.description}
                    </p>

                    <div className="pt-6 mt-auto border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full h-12">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="px-4 h-full text-gray-500 hover:text-primary transition-colors font-bold text-lg"
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="px-4 h-full text-gray-500 hover:text-primary transition-colors font-bold text-lg"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                onAddToCart(item, qty)
                                onClose()
                            }}
                            className="flex-1 bg-primary hover:bg-red-700 text-white h-12 rounded-full font-bold text-base shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            <span>Add to Order</span>
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ========================================
// TOAST COMPONENT
// ========================================
function Toast({ message, isVisible }: { message: string; isVisible: boolean }) {
    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            <span className="material-symbols-outlined text-green-400 dark:text-green-600 text-[20px]">check_circle</span>
            <span>{message}</span>
        </div>
    )
}

// ========================================
// MAIN MENU SECTION COMPONENT
// ========================================
export function MenuSection() {
    const [activeFilter, setActiveFilter] = useState("mie")
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    const filteredItems = MENU_DATA.filter(item => item.category === activeFilter)

    const showToast = (message: string) => {
        setToastMessage(message)
        setIsToastVisible(true)
        setTimeout(() => setIsToastVisible(false), 2500)
    }

    const handleAddToCart = (item: MenuItem, qty: number) => {
        setCartCount(prev => prev + qty)
        showToast(`${item.name} (${qty}x) added!`)
    }

    const openModal = (item: MenuItem) => {
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    useEffect(() => {
        const handleOpenProductModal = (event: CustomEvent<number>) => {
            const itemId = event.detail
            const item = MENU_DATA.find(i => i.id === itemId)
            if (item) {
                openModal(item)
            }
        }

        const handleSwitchCategory = (event: CustomEvent<string>) => {
            setActiveFilter(event.detail)
        }

        window.addEventListener('open-product-modal' as any, handleOpenProductModal as any)
        window.addEventListener('switch-category' as any, handleSwitchCategory as any)

        return () => {
            window.removeEventListener('open-product-modal' as any, handleOpenProductModal as any)
            window.removeEventListener('switch-category' as any, handleSwitchCategory as any)
        }
    }, [])

    return (
        <>
            <section id="menu" className="w-full px-4 md:px-10 lg:px-40 py-20 bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col gap-4 mb-10">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm">Full Menu</span>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight mb-4">
                                    Explore Our Menu
                                </h2>
                                <p className="text-text-muted dark:text-gray-400 text-lg max-w-xl">
                                    Browse through all our delicious offerings. Filter by category to find exactly what you're craving!
                                </p>
                            </div>
                            {/* Cart Badge */}
                            <button
                                onClick={() => window.open('https://lynk.id/miejebew-gdc', '_blank')}
                                className="flex items-center justify-center rounded-full h-12 bg-primary hover:bg-red-700 text-white gap-2 text-sm font-bold px-6 transition-all shadow-lg shadow-primary/30"
                            >
                                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                                <span>Cart ({cartCount})</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="sticky top-[72px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-4 mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex gap-3 min-w-max">
                            {FILTER_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`flex h-10 items-center justify-center gap-x-2 rounded-full transition-all ${activeFilter === cat.id
                                        ? "bg-primary pl-4 pr-6 text-white shadow-lg shadow-red-500/20"
                                        : "bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 pl-4 pr-6 text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                                    <span className="text-sm font-bold">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                onCardClick={() => openModal(item)}
                                onAddClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCart(item, 1)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <ProductModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToCart={handleAddToCart}
            />

            {/* Toast */}
            <Toast message={toastMessage} isVisible={isToastVisible} />
        </>
    )
}
