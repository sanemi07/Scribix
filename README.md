# Scribix

Scribix is a backend API for user authentication and blog post management, built for Cloudflare Workers using Hono and Prisma with PostgreSQL.

## Tech Stack

- TypeScript
- Hono (`hono`)
- Cloudflare Workers + Wrangler
- Prisma ORM (`prisma`, `@prisma/client`) v6.19.2
- Prisma Accelerate extension (`@prisma/extension-accelerate`) v3.0.1
- PostgreSQL
- JWT via `hono/jwt`

## Features Implemented

- User signup endpoint that creates a user and returns a JWT
- User signin endpoint that returns a JWT for an existing email
- JWT-protected blog routes middleware
- Create blog post
- Update blog post
- Get single blog post by ID
- Get all blog posts
- Prisma schema and migration for `User` and `Post` models
- Cloudflare Workers dev/deploy scripts

## API Routes

Base path: `/api/v1`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/signup` | Create a user (`email`, `name`, `password`) and return JWT | No |
| `POST` | `/signin` | Find user by `email` and return JWT | No |
| `POST` | `/blog` | Create a blog post (`title`, `content`) for authenticated user | Yes (Bearer JWT) |
| `PUT` | `/blog` | Update blog post by body `id` with `title`/`content` | Yes (Bearer JWT) |
| `GET` | `/blog/:id` | Get one blog post by ID | Yes (Bearer JWT) |
| `GET` | `/blog/bulk` | Get all blog posts | Yes (Bearer JWT) |

Additional route:
- `GET /` returns plain text `Hello Hono!`

## Database Schema

Defined in `backend/prisma/schema.prisma`:

- `User`
  - `id: String` (UUID, primary key)
  - `email: String` (unique)
  - `name: String?` (optional)
  - `password: String`
  - Relation: one-to-many with `Post` (`posts`)
- `Post`
  - `id: String` (UUID, primary key)
  - `title: String`
  - `content: String`
  - `published: Boolean` (default `false`)
  - `authorId: String` (foreign key to `User.id`)
  - Relation: many-to-one with `User` (`author`)

Migration present:
- `backend/prisma/migrations/20260227082246_schema/migration.sql`

## Project Structure

```txt
Scribix/
  backend/
    prisma/
      schema.prisma
      migrations/
    src/
      controllers/
        user.controller.ts
        blog.controller.ts
      routes/
        user.routes.ts
        blog.routes.ts
      lib/
        db.ts
      index.ts
    package.json
    wrangler.jsonc
    tsconfig.json
  frontend/   (currently present but no source files in this repository snapshot)
```

## Environment Variables

The backend expects these Cloudflare Worker bindings:

- `DATABASE_URL`: PostgreSQL connection string used by Prisma
- `JWT_SECRET`: Secret used to sign/verify JWT tokens

## Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Provide Worker bindings for:
- `DATABASE_URL`
- `JWT_SECRET`

For local development with Wrangler, set these in your local Wrangler environment setup.

### 3. Setup Prisma and database

Prisma schema and one migration are already included under `backend/prisma/`.

Typical commands:

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Start development server

```bash
npm run dev
```

### 5. Deploy

```bash
npm run deploy
```

Optional:

```bash
npm run cf-typegen
```

## Prisma Notes

- Prisma CLI version: `^6.19.2` (`backend/package.json`)
- Prisma Client version: `^6.19.2`
- Uses Prisma Accelerate extension via:
  - `backend/src/lib/db.ts`
  - `new PrismaClient({ datasourceUrl }).$extends(withAccelerate())`
- No `prisma.config.ts` found in current backend

## Current Progress

Completed:
- Core backend scaffold on Hono and Cloudflare Workers
- User auth token issuance (signup/signin)
- JWT middleware for blog endpoints
- CRUD-like blog operations (create, update, read single, read bulk)
- PostgreSQL schema and initial migration

Not present yet:
- Frontend implementation in this repository snapshot
- Input validation layer (e.g., Zod) in request handlers
- Password hashing and password verification logic on signin
- Route-level authorization checks for post ownership on update/read

## Next Improvements (Optional)

1. Add secure password hashing (e.g., bcrypt/argon2) and verify passwords in signin.
2. Introduce request validation (Zod) with consistent error responses/status codes.
3. Add ownership checks so users can modify only their own posts.
4. Add pagination/filtering for bulk blog reads.
5. Add automated tests (unit + integration) and CI.
6. Add a real frontend app in `frontend/` or remove the empty folder.
