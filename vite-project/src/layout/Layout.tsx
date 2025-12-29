import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main font-display overflow-x-hidden transition-colors duration-300 min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-col w-full items-center flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
