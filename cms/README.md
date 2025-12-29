# Mie Jebew GDC - CMS

Content Management System untuk mengelola konten website Mie Jebew GDC.

## Tech Stack

- **Express.js** - Web framework
- **JSON Database** - Simple file-based storage
- **Marked** - Markdown parser
- **bcryptjs** - Password hashing

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Seed database

```bash
npm run db:seed
```

This creates:
- Admin user (credentials in `.env`)
- About Us page
- Content blocks

### 3. Start server

```bash
npm run dev
```

Server runs on `http://localhost:3002`

## Admin Panel

Access: `http://localhost:3002/admin`

**Default credentials:**
- Email: `admin@miejebew.com`
- Password: `admin123`

### Features

- **Pages**: Create/edit pages with markdown content
- **Content Blocks**: Key-value content snippets
- **Markdown Editor**: Live preview while editing
- **Publish/Unpublish**: Control page visibility

## API Endpoints

### Public API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pages/:slug` | Get published page |
| GET | `/api/content` | Get all content blocks |
| GET | `/api/content/:key` | Get single content |

### Admin API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login |
| POST | `/api/admin/logout` | Logout |
| GET | `/api/admin/pages` | List all pages |
| POST | `/api/admin/pages` | Create page |
| PUT | `/api/admin/pages/:id` | Update page |
| DELETE | `/api/admin/pages/:id` | Delete page |
| GET | `/api/admin/content` | List content blocks |
| PUT | `/api/admin/content/:key` | Update content |

## Project Structure

```
cms/
├── src/
│   ├── index.ts           # Entry point
│   ├── app.ts             # Express app
│   ├── config/
│   │   └── env.ts
│   ├── db/
│   │   ├── index.ts       # JSON database
│   │   └── seed.ts        # Seed data
│   ├── services/
│   │   ├── pageService.ts
│   │   ├── contentService.ts
│   │   └── authService.ts
│   ├── routes/
│   │   ├── public.routes.ts
│   │   └── admin.routes.ts
│   ├── middlewares/
│   │   └── auth.ts
│   └── admin/
│       └── index.html     # Admin panel
├── data/
│   └── cms.json           # Database file
├── package.json
└── .env
```

## Integration with Frontend

The frontend `AboutSection` component fetches content from:

```
GET http://localhost:3002/api/content?keys=about_hero_title,about_hero_subtitle,about_story
```

Make sure CMS is running before starting the frontend.
