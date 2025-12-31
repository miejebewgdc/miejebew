import { useState, useEffect } from 'react'

// CMS API URL
const CMS_API = 'http://localhost:3002/api'

interface AboutContent {
    about_hero_title?: { content: string }
    about_hero_subtitle?: { content: string }
    about_story?: { content: string }
    about_mission?: { content: string }
    about_vision?: { content: string }
}

// Simple markdown to HTML converter
function renderMarkdown(text: string): string {
    return text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-text-main dark:text-white">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-text-main dark:text-white">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-8 mb-4 text-text-main dark:text-white">$1</h1>')
        // Bold & Italic
        .replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Blockquote
        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-text-muted">$1</blockquote>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
        // Line breaks
        .replace(/\n\n/gim, '</p><p class="my-4 text-text-muted dark:text-gray-400 leading-relaxed">')
        // Wrap in paragraph
        .replace(/^(?!<)(.+)$/gim, '<p class="my-4 text-text-muted dark:text-gray-400 leading-relaxed">$1</p>')
}

// Team members data
const TEAM_MEMBERS = [
    {
        name: 'Rania Putri Amalia, S.Psi',
        positionTop: 'Founder',
        positionBottom: 'Chief Executive Officer',
        image: 'https://i.ibb.co/VYTDfbqS/RANIA-WEB.webp',
        socials: {
            instagram: 'https://instagram.com/rania.putri',
            facebook: 'https://facebook.com/rania.putri',
            linkedin: 'https://linkedin.com/in/rania-putri-amalia'
        }
    },
    {
        name: 'Taufiq Rusdhi, S.M.',
        positionTop: 'Co-Founder',
        positionBottom: 'Chief Operation Officer',
        image: 'https://i.ibb.co/N2Ktg4b2/TAUFIQ-WEB.webp',
        socials: {
            instagram: 'https://instagram.com/taufiq.rusdhi',
            facebook: 'https://facebook.com/taufiq.rusdhi',
            linkedin: 'https://linkedin.com/in/taufiq-rusdhi'
        }
    }
]


// Values data
const VALUES = [
    {
        title: 'Kualitas Premium',
        description: 'Bahan-bahan pilihan terbaik untuk setiap hidangan',
        icon: 'verified',
        color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
    },
    {
        title: 'Rasa Autentik',
        description: 'Formula resep khas yang terkurasi',
        icon: 'auto_awesome',
        color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    },
    {
        title: 'Pedas Nendang',
        description: 'Level pedas yang bisa disesuaikan selera',
        icon: 'local_fire_department',
        color: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    },
    {
        title: 'Pelayanan Prima',
        description: 'Kepuasan pelanggan adalah prioritas utama',
        icon: 'favorite',
        color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600',
    },
]

export function AboutSection() {
    const [content, setContent] = useState<AboutContent>({})

    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch(`${CMS_API}/content?keys=about_hero_title,about_hero_subtitle,about_story,about_mission,about_vision`)
                const data = await res.json()
                if (data.success) {
                    setContent(data.data)
                }
            } catch (error) {
                console.error('Failed to fetch about content:', error)
            }
        }
        fetchContent()
    }, [])

    return (
        <section id="about" className="w-full px-4 md:px-10 lg:px-40 py-20 bg-white dark:bg-surface-dark">
            <div className="max-w-[1280px] mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">
                        <span className="material-symbols-outlined text-lg">info</span>
                        Tentang Kami
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white mb-6">
                        {content.about_hero_title?.content || 'Tentang Mie Jebew Grand Depok City'}
                    </h2>
                    <p className="text-xl text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
                        {content.about_hero_subtitle?.content || 'Lahir dari kecintaan akan kuliner pedas yang autentik'}
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative group perspective-1000">
                        <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative">
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out transform group-hover:scale-110"
                                style={{
                                    backgroundImage: `url('https://i.ibb.co/RTZKs7RP/OUTLET-1.jpg')`,
                                    animation: "fade-slide-1 12s infinite",
                                    filter: "brightness(1.15) contrast(1.1) saturate(1.2)"
                                }}
                            />
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out transform group-hover:scale-110"
                                style={{
                                    backgroundImage: `url('https://i.ibb.co/HLBXQsKj/OUTLET-2.jpg')`,
                                    animation: "fade-slide-2 12s infinite",
                                    opacity: 0,
                                    filter: "brightness(1.15) contrast(1.1) saturate(1.2)"
                                }}
                            />
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out transform group-hover:scale-110"
                                style={{
                                    backgroundImage: `url('https://i.ibb.co/LhSj6yhm/OUTLET-3.jpg')`,
                                    animation: "fade-slide-3 12s infinite",
                                    opacity: 0,
                                    filter: "brightness(1.15) contrast(1.1) saturate(1.2)"
                                }}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-6 shadow-xl z-20 animate-bounce-slow">
                            <div className="text-4xl font-black">2+</div>
                            <div className="text-sm font-medium opacity-90">Tahun Melayani</div>
                        </div>

                        <style>{`
                            @keyframes fade-slide-1 {
                                0%, 30% { opacity: 1; transform: scale(1); }
                                33%, 96% { opacity: 0; transform: scale(1.05); }
                                100% { opacity: 1; transform: scale(1); }
                            }
                            @keyframes fade-slide-2 {
                                0%, 30% { opacity: 0; transform: scale(1.05); }
                                33%, 63% { opacity: 1; transform: scale(1); }
                                66%, 100% { opacity: 0; transform: scale(1.05); }
                            }
                            @keyframes fade-slide-3 {
                                0%, 63% { opacity: 0; transform: scale(1.05); }
                                66%, 96% { opacity: 1; transform: scale(1); }
                                100% { opacity: 0; transform: scale(1.05); }
                            }
                            @keyframes bounce-slow {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-10px); }
                            }
                            .animate-bounce-slow {
                                animation: bounce-slow 3s infinite ease-in-out;
                            }
                        `}</style>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-text-main dark:text-white">
                            Kisah <span className="text-primary">Kami</span>
                        </h3>
                        <div
                            className="prose prose-lg dark:prose-invert"
                            dangerouslySetInnerHTML={{
                                __html: renderMarkdown(content.about_story?.content ||
                                    'Bermula dari lapak sederhana di kawasan GDC sejak 2023, Mie Jebew GDC kini telah menjadi destinasi kuliner favorit bagi pecinta pedas di Depok.\n\nDengan resep rahasia dan bahan-bahan berkualitas premium, kami berkomitmen menghadirkan pengalaman makan mie pedas yang tak terlupakan.'
                                )
                            }}
                        />

                        {/* Mission & Vision */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-5">
                                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Misi
                                </div>
                                <p className="text-sm text-text-muted dark:text-gray-400">
                                    {content.about_mission?.content || 'Menyajikan cita rasa pedas otentik dengan kualitas bahan terbaik demi menciptakan pengalaman kuliner yang berkesan bagi setiap pelanggan'}
                                </p>
                            </div>
                            <div className="bg-background-light dark:bg-background-dark rounded-2xl p-5">
                                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                    <span className="material-symbols-outlined">visibility</span>
                                    Visi
                                </div>
                                <p className="text-sm text-text-muted dark:text-gray-400">
                                    {content.about_vision?.content || 'Menjadi destinasi utama bagi penikmat rasa pedas otentik melalui inovasi kuliner yang berkualitas'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-center text-text-main dark:text-white mb-10">
                        Nilai-Nilai <span className="text-primary">Kami</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((value, index) => (
                            <div
                                key={index}
                                className="bg-background-light dark:bg-background-dark rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    <span className="material-symbols-outlined text-2xl">{value.icon}</span>
                                </div>
                                <h4 className="font-bold text-text-main dark:text-white mb-2">{value.title}</h4>
                                <p className="text-sm text-text-muted dark:text-gray-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <h3 className="text-2xl font-bold text-center text-text-main dark:text-white mb-10">
                        Tim <span className="text-primary">Kami</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={index}
                                className="w-[280px] rounded-2xl overflow-hidden bg-white dark:bg-card-dark shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {/* Image Wrapper - No Background */}
                                <div className="p-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-[3/4] rounded-xl object-cover object-top"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 text-center">
                                    {/* Name */}
                                    <h4 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                        {member.name}
                                    </h4>

                                    {/* Role - Two Lines */}
                                    <div className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                                        <div className="font-semibold">{member.positionTop}</div>
                                        <div>{member.positionBottom}</div>
                                    </div>
                                </div>

                                {/* Social Icons */}
                                <div className="flex justify-center gap-4 pb-5 text-gray-400">
                                    {member.socials?.instagram && (
                                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm1.472 5.336H12.32c-3.1 0-3.35.014-4.22.054-.91.043-1.568.188-2.102.396a3.673 3.673 0 00-1.303.847 3.673 3.673 0 00-.847 1.303c-.208.535-.353 1.192-.396 2.102-.04.87-.054 1.12-.054 4.22v.987c0 3.101.014 3.35.054 4.22.043.91.188 1.568.396 2.102.26.655.587 1.139.847 1.303.468.307.952.6 1.455.847.535.208 1.192.353 2.102.396.87.04 1.12.054 4.22.054h.987c3.101 0 3.35-.014 4.22-.054.91-.043 1.568-.188 2.102-.396.655-.26 1.139-.587 1.303-.847.307-.468.6-.952.847-1.455.208-.535.353-1.192.396-2.102.04-.87.054-1.12.054-4.22v-.987c0-3.101-.014-3.35-.054-4.22-.043-.91-.188-1.568-.396-2.102a3.673 3.673 0 00-.847-1.303 3.673 3.673 0 00-1.303-.847c-.535-.208-1.192-.353-2.102-.396-.87-.04-1.12-.054-4.22-.054h-.987zm-1.87 3.033a3.899 3.899 0 110 7.798 3.899 3.899 0 010-7.798zm0 1.559a2.34 2.34 0 100 4.68 2.34 2.34 0 000-4.68zM17.848 7.37a1.04 1.04 0 110 2.08 1.04 1.04 0 010-2.08z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                    {member.socials?.facebook && (
                                        <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                    {member.socials?.linkedin && (
                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
