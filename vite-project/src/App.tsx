import { Layout } from "@/layout/Layout"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { AboutSection } from "@/components/AboutSection"
import { MenuSection } from "@/components/MenuSection"
import { Menu } from "@/components/Menu"
import SpiceLevelSelector from "@/components/SpiceLevelSelector"
import { LocationSection } from "@/components/LocationSection"
import { CTA } from "@/components/CTA"

function App() {
    return (
        <Layout>
            <Hero />
            <Features />
            <AboutSection />
            <Menu />
            <MenuSection />
            <SpiceLevelSelector />
            <LocationSection />
            <CTA />
        </Layout>
    )
}

export default App


