export function SpiceLevel() {
    return (
        <section className="w-full px-4 md:px-10 lg:px-40 py-20 bg-white dark:bg-surface-dark overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent dark:from-orange-900/10 pointer-events-none"></div>
            <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-10 relative z-10">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <span className="text-primary font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">whatshot</span>
                        Custom Spice Levels
                    </span>
                    <h2 className="text-4xl font-black text-text-main dark:text-white leading-tight">
                        How Spicy Can You Go?
                    </h2>
                    <p className="text-text-muted dark:text-gray-400">
                        From mild tingles to explosive heat. Choose your level carefully!
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
                    {/* Level 1 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background-light dark:bg-background-dark border-2 border-transparent hover:border-green-400 transition-all cursor-pointer w-[140px]">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <span className="font-black text-xl">1</span>
                        </div>
                        <span className="font-bold text-text-main dark:text-white">Mild</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-green-500 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-gray-300 text-sm">local_fire_department</span>
                            <span className="material-symbols-outlined text-gray-300 text-sm">local_fire_department</span>
                        </div>
                    </div>
                    {/* Level 2 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background-light dark:bg-background-dark border-2 border-transparent hover:border-yellow-400 transition-all cursor-pointer w-[140px]">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <span className="font-black text-xl">2</span>
                        </div>
                        <span className="font-bold text-text-main dark:text-white">Medium</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-yellow-500 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-yellow-500 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-gray-300 text-sm">local_fire_department</span>
                        </div>
                    </div>
                    {/* Level 3 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background-light dark:bg-background-dark border-2 border-transparent hover:border-orange-500 transition-all cursor-pointer w-[140px]">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                            <span className="font-black text-xl">3</span>
                        </div>
                        <span className="font-bold text-text-main dark:text-white">Hot</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-orange-500 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-orange-500 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-orange-500 text-sm fill-1">local_fire_department</span>
                        </div>
                    </div>
                    {/* Level 4 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background-light dark:bg-background-dark border-2 border-transparent hover:border-red-600 transition-all cursor-pointer w-[140px] shadow-lg shadow-red-500/10">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <span className="font-black text-xl">4</span>
                        </div>
                        <span className="font-bold text-text-main dark:text-white">Jebew</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                        </div>
                    </div>
                    {/* Level 5 */}
                    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background-light dark:bg-background-dark border-2 border-red-600 bg-red-50 dark:bg-red-900/20 transform scale-110 cursor-pointer w-[140px] shadow-xl shadow-red-600/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors"></div>
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse">
                            <span className="font-black text-xl">5</span>
                        </div>
                        <span className="font-bold text-red-600 dark:text-red-400">EXPLOSIVE</span>
                        <div className="flex gap-0.5">
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                            <span className="material-symbols-outlined text-red-600 text-sm fill-1">local_fire_department</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
