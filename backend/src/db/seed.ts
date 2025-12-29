import { db } from '../lib/db.js'
import { categories, menuItems, storeInfo } from './schema/index.js'

async function seed() {
    console.log('🌱 Seeding database...')

    try {
        // Seed categories
        console.log('📂 Seeding categories...')
        await db.insert(categories).values([
            { name: 'Mie Jebew', slug: 'mie', icon: 'ramen_dining', sortOrder: 1, isActive: true },
            { name: 'Kebab', slug: 'kebab', icon: 'kebab_dining', sortOrder: 2, isActive: true },
            { name: 'Lumpia Beef', slug: 'lumpia', icon: 'egg', sortOrder: 3, isActive: true },
            { name: 'Drinks', slug: 'drinks', icon: 'local_drink', sortOrder: 4, isActive: true },
        ]).onConflictDoNothing()

        // Get category IDs
        const cats = await db.select().from(categories)
        const catMap = new Map(cats.map(c => [c.slug, c.id]))

        // Seed menu items
        console.log('🍜 Seeding menu items...')
        await db.insert(menuItems).values([
            {
                name: 'Mie Jebew Special',
                slug: 'mie-jebew-special',
                categoryId: catMap.get('mie'),
                price: 15000,
                description: 'Mie pedas dengan topping ayam cincang, bakso sapi, dan pangsit goreng renyah.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBduVQX3K50IQPtuUdv3BszFyqzCo7DESji-8KqV7JOYd_cJeDoMVbSTZdpzDEiofekimfzJLDMRiE87ENEGtZlomMfCzLP7uAPIoRJbioT5dK3JL7LlSLd8IHnPc8VRJUiO4Xp9PmReSJxTLK-qN-EeTwusht8h4Hp76dgULazOR9CheT5rvisB9ttDU3xzzjdI9rc032UctbuHlEKU3073t9O1czTaUrpO3a16MJv6kHvQ1XvW7nhvIMmXjFd3i0j4Bvt7eqtPrY',
                spiceLevel: 5,
                isDrink: false,
                badge: 'Best Seller',
                badgeIcon: 'local_fire_department',
                isAvailable: true,
            },
            {
                name: 'Kebab Beef Jumbo',
                slug: 'kebab-beef-jumbo',
                categoryId: catMap.get('kebab'),
                price: 20000,
                description: 'Tortilla lembut dengan isian daging sapi panggang melimpah, sayuran segar, dan saus spesial.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTYOlYsswteX8vJAiHbMCaLpenaSssCDD-bTc2fyUu_8I6oVZOxvIlYVvAxlgLPj1V_x2SvNCJth1Ng6GbkMX-WbYrnqdZ2xD8uo0kSg_2-Oid3_Sv4ospkhxEQKM0ocO495_BFot7mdJUl-ESacRsyj_ULcGFuisyQr2DL18aoXoSfcNkK5ndCAZ39GhX1eJc_KIC4E9wc-hyW7H72JEFzfHJz80aMvuoX-HPu3IJqSTgmcf_d3xXRVwhb6KLeqErKJ8FxAZ5UI',
                spiceLevel: 1,
                isDrink: false,
                isAvailable: true,
            },
            {
                name: 'Lumpia Beef',
                slug: 'lumpia-beef',
                categoryId: catMap.get('lumpia'),
                price: 12000,
                description: 'Kulit lumpia renyah berisi daging sapi cincang berbumbu gurih. Cocok untuk cemilan!',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4R0qHWQQK40rixPYqNgHshHNk8o40d6jDEq5e_50zMTCK6vZVYd1tL6duRy62iC8kxz4ugMCaPB7q1aK03_6SeAo_1IwNCMgViTveldAkfyVeF9XEZPjXQIW1hbyyOhZ7NjwqmJb1y1p__X3IY7NC4WiqqPCZh3rh3uWikUDoQnwGI8HeBvI8GJMBLPvuUrUfoLcgHgjT7ul5BUAERP8fz7w-lY4er1nJvwlkFnmufXmZ_GjFacTCXtf7zZqYaJWLjTdU23ALG90',
                spiceLevel: 1,
                isDrink: false,
                isAvailable: true,
            },
            {
                name: 'Mie Yamin Manis',
                slug: 'mie-yamin-manis',
                categoryId: catMap.get('mie'),
                price: 14000,
                description: 'Perpaduan rasa manis kecap berkualitas dan gurihnya bumbu rahasia. Tidak pedas.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxiQcIQV2LexrVLgw548ggqbp09QEFwjx0pnIxKGeqveWZPUaZ0VVxPQBLvkscg8TWvxbEtfMnVnW6zXAxiCRA9FsTCJEA5eYWrGzWUktAzbmILE6YZ_kctSuywbPf8tf41FJc8eqqA6IFNGXlq32cslWCaGftvXUc9OhiOeLCHFXSrQ4VkAyRVRFBbip1jki-QJQPM9l76F1-ubmJ-ykr-6VcVx_351WynlBl4phlzEr15YN9H2PKTifhbyBvoPMhrCa3ioATn68',
                spiceLevel: 0,
                isDrink: false,
                isAvailable: true,
            },
            {
                name: 'Mie Jebew Kuah',
                slug: 'mie-jebew-kuah',
                categoryId: catMap.get('mie'),
                price: 16000,
                description: 'Varian kuah pedas yang segar, disajikan dengan telur rebus dan sayuran.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUZ9eiyS9JnVdDRczvaO_feK4LPS1gdqpuCrfyowDjLKL6e3lIAGZGaztDI8rA44UXtqf__iJNcIe0wCPsRB5GmU-pIU72GYeixqNkCv3HY5BBdAREgaz_jfmTByaLiJf3HfT2PyBxscTv5lbvU7xT1MWIbzF5Nvpedi1XTmjeSyvkye7iiZDOL2dp_Oq01N9VpZzUt9jGyLgCm6MsZk5vc4SuYey4WDWGuuHqff5pubDMcD8PcoUagaskiwGoMwmxoFWfYzGhDaU',
                spiceLevel: 4,
                isDrink: false,
                isAvailable: true,
            },
            {
                name: 'Kebab Mini (3 pcs)',
                slug: 'kebab-mini-3pcs',
                categoryId: catMap.get('kebab'),
                price: 25000,
                description: 'Paket hemat 3 kebab ukuran mini. Pilihan tepat untuk berbagi dengan teman.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXdJc5QfbTEtkBz-K7p8dUXtst992pu0iorA5I8s7MOzyMb2iN7BDc2rxrYRM5TMGhLXvePwj00xGIFQWz95F4qXFyiWtl3T9jBK7R1vwWzVcJ5E6YiePjP66NIdivO3k5bwRQP3ORTo364ZZQfXL9iaogLIq6fFv47KRpRzyEu-eruidUaGn7Ece5s3QZ_d2R9gElgGFAVshUqvUZ-mJqtzBY0293uq4-GCcZpz6MAW7yC6L1YCyyhspNUgPAW-ViYGysvhhNY2k',
                spiceLevel: 1,
                isDrink: false,
                isAvailable: true,
            },
            {
                name: 'Orange Splash',
                slug: 'orange-splash',
                categoryId: catMap.get('drinks'),
                price: 10000,
                description: 'Minuman jeruk segar dengan soda dan es batu. Penghilang pedas terbaik!',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN6HxrO1QMPck9bWm6OHJ-qRfNIhbML9Hdq-bAFT90jzVsSM5CFEaPHRUrOWm0yZ5rin-ticU8g0SwYIopmkUJc5CxAGxnwIoLXHHMORNUIZjYI4e0Ha-28Sblkql8LlyH4BxjDJcH71Gc4UF5JW2o_l9EjmloLQBAgVtPB8HSt1pEENuEYD_et29ca58C2KHphYioQhDSNEUyrVsIj6ydGvIWWXU-j_PO_eyz0xLFRdDPvGAibspQkus7SjlgEUxHjWqN3ACiVcY',
                spiceLevel: 0,
                isDrink: true,
                isAvailable: true,
            },
            {
                name: 'Es Teh Manis',
                slug: 'es-teh-manis',
                categoryId: catMap.get('drinks'),
                price: 5000,
                description: 'Teh manis dingin klasik yang menyegarkan dahaga.',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1eGYgZPuqSMB5ZRDhAGACNrQeryLjFV5q2qEcm4gjdLEOsNxuUc61yZsm9kQbECLF0ykq5u4Z9mojWeU4411zDR6_HCDEcqmZdTciFzt0UvKnkfsLCcbYliNuAEd__4qw9bQ75xp81B77r3L3uxUKwigFqA7vFhEHwuMbrrVYj2Up6Nanllme3_ywTDA2wxtA0VYrqocLhgo8o0GGG-_wkei2Gkj5iJvukT9H9QTgQEsGcgNBQIRrzS_9fqc_1i9CMH0deKS6fB8',
                spiceLevel: 0,
                isDrink: true,
                isAvailable: true,
            },
        ]).onConflictDoNothing()

        // Seed store info
        console.log('🏪 Seeding store info...')
        await db.insert(storeInfo).values([
            { key: 'address', value: 'Jl. Grand Depok City, Tirtajaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412' },
            { key: 'phone', value: '0812-3456-7890' },
            { key: 'whatsapp', value: '6281234567890' },
            { key: 'hours', value: 'Setiap Hari: 10.00 - 22.00 WIB' },
            { key: 'google_maps_url', value: 'https://www.google.com/maps/search/?api=1&query=Grand+Depok+City+Mie+Jebew' },
        ]).onConflictDoNothing()

        console.log('✅ Database seeded successfully!')
    } catch (error) {
        console.error('❌ Seeding failed:', error)
        process.exit(1)
    }

    process.exit(0)
}

seed()
