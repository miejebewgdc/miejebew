import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { db, type Page, type ContentBlock, type CmsUser } from './index.js'
import { env } from '../config/env.js'

async function seed() {
    console.log('🌱 Seeding CMS database...')

    const database = db.get()

    // Seed admin user if not exists
    if (!database.users.find(u => u.email === env.ADMIN_EMAIL)) {
        console.log('👤 Creating admin user...')
        const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10)
        database.users.push({
            id: uuidv4(),
            email: env.ADMIN_EMAIL,
            passwordHash,
            name: 'Admin',
            role: 'admin',
            createdAt: new Date().toISOString(),
        })
    }

    // Seed About Us page if not exists
    if (!database.pages.find(p => p.slug === 'about')) {
        console.log('📄 Creating About Us page...')
        const aboutPage: Page = {
            id: uuidv4(),
            slug: 'about',
            title: 'Tentang Kami',
            content: `# Tentang Mie Jebew GDC

## Kisah Kami

**Mie Jebew GDC** lahir dari kecintaan kami terhadap kuliner pedas yang autentik. Berawal dari gerobak kecil di Grand Depok City pada tahun 2020, kami berkomitmen untuk menghadirkan pengalaman makan mie pedas yang tak terlupakan.

## Filosofi Kami

> "Pedas bukan sekadar rasa, tapi pengalaman yang membakar semangat"

Kami percaya bahwa setiap mangkuk mie yang kami sajikan harus memiliki:

- **Kualitas Premium** - Bahan-bahan pilihan terbaik
- **Rasa Autentik** - Resep rahasia turun-temurun
- **Pedas Nendang** - Level pedas yang bisa disesuaikan

## Tim Kami

Tim Mie Jebew GDC terdiri dari:

1. **Chef Utama** - Ahli racik bumbu dengan pengalaman 15+ tahun
2. **Tim Dapur** - Terlatih untuk menjaga konsistensi rasa
3. **Tim Pelayanan** - Ramah dan siap membantu

## Prestasi

- ⭐ Rating 4.8/5 di Google Maps
- 🏆 "Best Spicy Noodle" Depok Food Festival 2023
- 📱 10.000+ followers di Instagram

## Lokasi

Kunjungi kami di:

**Grand Depok City**
Jl. Grand Depok City, Tirtajaya
Kec. Sukmajaya, Kota Depok
Jawa Barat 16412

**Jam Operasional:**
Setiap hari, 10.00 - 22.00 WIB
`,
            metaDescription: 'Mie Jebew GDC - Restoran mie pedas terbaik di Depok. Berdiri sejak 2020, kami sajikan pengalaman kuliner pedas yang tak terlupakan.',
            isPublished: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        database.pages.push(aboutPage)
    }

    // Seed content blocks
    const contentBlocks: Omit<ContentBlock, 'id'>[] = [
        {
            key: 'about_hero_title',
            title: 'About Hero Title',
            content: 'Tentang **Mie Jebew GDC**',
            type: 'markdown',
            updatedAt: new Date().toISOString(),
        },
        {
            key: 'about_hero_subtitle',
            title: 'About Hero Subtitle',
            content: 'Lahir dari kecintaan akan kuliner pedas yang autentik',
            type: 'text',
            updatedAt: new Date().toISOString(),
        },
        {
            key: 'about_story',
            title: 'Our Story',
            content: `Berawal dari gerobak kecil di Grand Depok City pada tahun 2020, Mie Jebew GDC kini telah menjadi destinasi kuliner favorit bagi pecinta pedas di Depok.

Dengan resep rahasia turun-temurun dan bahan-bahan berkualitas premium, kami berkomitmen menghadirkan pengalaman makan mie pedas yang tak terlupakan.`,
            type: 'markdown',
            updatedAt: new Date().toISOString(),
        },
        {
            key: 'about_mission',
            title: 'Our Mission',
            content: 'Menghadirkan sensasi pedas nendang dengan kualitas terbaik untuk setiap pelanggan.',
            type: 'text',
            updatedAt: new Date().toISOString(),
        },
        {
            key: 'about_vision',
            title: 'Our Vision',
            content: 'Menjadi restoran mie pedas nomor satu di Indonesia.',
            type: 'text',
            updatedAt: new Date().toISOString(),
        },
    ]

    for (const block of contentBlocks) {
        if (!database.contentBlocks.find(b => b.key === block.key)) {
            console.log(`📝 Creating content block: ${block.key}`)
            database.contentBlocks.push({
                id: uuidv4(),
                ...block,
            })
        }
    }

    db.save(database)
    console.log('✅ CMS database seeded successfully!')
}

seed().catch(console.error)
