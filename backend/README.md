# Mie Jebew GDC - Backend API

Backend API untuk website restoran Mie Jebew GDC.

## Tech Stack

- **Express.js** - Web framework
- **Drizzle ORM** - Type-safe ORM
- **PostgreSQL** - Database
- **Better Auth** - Authentication
- **Zod** - Validation

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Update `DATABASE_URL` with your PostgreSQL connection string.

### 3. Create database

```sql
CREATE DATABASE miejebew;
```

### 4. Generate & run migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Seed data

```bash
npm run db:seed
```

### 6. Start development server

```bash
npm run dev
```

Server will run on `http://localhost:3001`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema directly (dev only) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed database with initial data |

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication (Better Auth)
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=mie` - Filter by category
- `GET /api/menu/:slug` - Get menu item by slug
- `POST /api/menu` - Create menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)
- `PATCH /api/menu/:id/availability` - Toggle availability (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)

### Orders
- `POST /api/orders` - Create order (guest or user)
- `GET /api/orders` - Get user's orders (auth required)
- `GET /api/orders/:id` - Get order detail
- `POST /api/orders/:id/cancel` - Cancel order (owner only)
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PATCH /api/orders/admin/:id/status` - Update status (admin)

### Store Info
- `GET /api/store` - Get all store info
- `GET /api/store/:key` - Get specific info
- `PUT /api/store/:key` - Update store info (admin)
- `DELETE /api/store/:key` - Delete store info (admin)

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Entry point
│   ├── app.ts             # Express app setup
│   ├── config/
│   │   └── env.ts         # Environment config
│   ├── db/
│   │   ├── schema/        # Drizzle schemas
│   │   ├── migrate.ts     # Migration runner
│   │   └── seed.ts        # Seed data
│   ├── lib/
│   │   ├── auth.ts        # Better Auth setup
│   │   └── db.ts          # Drizzle instance
│   ├── middlewares/
│   │   ├── auth.ts        # Auth middleware
│   │   ├── errorHandler.ts
│   │   └── validate.ts    # Zod validation
│   ├── services/          # Business logic
│   ├── routes/            # API routes
│   └── validators/        # Zod schemas
├── drizzle/
│   └── migrations/        # Generated migrations
├── .env
├── drizzle.config.ts
└── package.json
```

## License

ISC
