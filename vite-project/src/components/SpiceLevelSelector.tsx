import { useState } from 'react';

const SpiceLevelSelector = () => {
    const [selectedLevel, setSelectedLevel] = useState(5);

    const levels = [
        { id: 1, label: "Tidak Pedas", color: "text-green-500", bgColor: "bg-green-100", activeCount: 1, totalCount: 3, iconColor: "text-green-500" },
        { id: 2, label: "Sedang", color: "text-yellow-500", bgColor: "bg-yellow-100", activeCount: 2, totalCount: 3, iconColor: "text-yellow-500" },
        { id: 3, label: "Pedas", color: "text-orange-500", bgColor: "bg-orange-100", activeCount: 3, totalCount: 3, iconColor: "text-orange-500" },
        { id: 4, label: "Jebew", color: "text-red-500", bgColor: "bg-red-100", activeCount: 4, totalCount: 4, iconColor: "text-red-500" },
        { id: 5, label: "Pedas Mampus", color: "text-white", bgColor: "bg-red-600", activeCount: 5, totalCount: 5, iconColor: "text-red-600" },
    ];

    return (
        <section id="spice-levels" className="w-full flex flex-col items-center justify-center py-20 font-sans bg-gray-50 dark:bg-surface-dark min-h-[60vh]">
            <style>{`
                @keyframes flame-flicker {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.15); opacity: 0.8; }
                }
                .animate-flame {
                    animation: flame-flicker 1.5s infinite ease-in-out;
                }
                .animate-flame-delay-1 { animation-delay: 0s; }
                .animate-flame-delay-2 { animation-delay: 0.2s; }
                .animate-flame-delay-3 { animation-delay: 0.4s; }
                .animate-flame-delay-4 { animation-delay: 0.1s; }
                .animate-flame-delay-5 { animation-delay: 0.3s; }
            `}</style>

            {/* Header */}
            <div className="text-center mb-10 px-4">
                <p className="text-red-600 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-base">trending_up</span> CUSTOM SPICE LEVELS
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 mb-4">Seberapa Pedas Anda Berani?</h2>
                <p className="text-gray-500 text-lg dark:text-gray-400">Dari sedikit menggelitik hingga panas meledak. Pilih level Anda dengan hati-hati!</p>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-6xl px-4">
                {levels.map((level) => (
                    <div
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-between transition-all duration-300 border-2 h-full min-h-[200px]
              ${selectedLevel === level.id
                                ? 'bg-red-50 border-red-500 shadow-xl scale-105 z-10'
                                : 'bg-white dark:bg-card-dark border-transparent hover:border-red-200 shadow-md opacity-80 hover:opacity-100'}`}
                    >
                        {/* Number Circle */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 
              ${selectedLevel === level.id ? 'bg-red-600 text-white' : `${level.bgColor} ${level.color}`}`}>
                            {level.id}
                        </div>

                        {/* Label */}
                        <h3 className={`text-lg font-bold mb-4 text-center ${selectedLevel === level.id ? 'text-red-700' : 'text-gray-800 dark:text-white'}`}>
                            {level.label}
                        </h3>

                        {/* Chili Icons */}
                        <div className="flex flex-wrap justify-center gap-1">
                            {[...Array(level.totalCount)].map((_, i) => {
                                const isActive = i < level.activeCount;
                                // If selected, use Red/Theme color. If not selected, use level specific color.
                                // Actually, image suggests distinct colors (green/yellow/orange) are preserved even when not focusing? 
                                // Or maybe when selected they all become "Hot"?
                                // Let's simplify: Use specific level color for active flames.
                                const colorClass = isActive ? (selectedLevel === level.id ? 'text-red-600' : level.iconColor) : 'text-gray-200';

                                return (
                                    <span
                                        key={i}
                                        className={`text-lg transition-all duration-300 ${colorClass} ${isActive && selectedLevel === level.id ? `animate-flame animate-flame-delay-${(i % 3) + 1}` : ''}`}
                                    >
                                        <span className={`material-symbols-outlined text-xl ${!isActive && 'opacity-50'}`}>local_fire_department</span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpiceLevelSelector;
