# STACKREL — Premium Web Agency

Next.js 16 app with Supabase auth, orders, and admin panel.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` → `.env.local`
3. Add your values from Supabase → **Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> **Important:** Never put the service role key in a `NEXT_PUBLIC_` variable. This app keeps it server-side only and uses secure API routes.

### 3. Run database schema

### 3. Run database schema

In Supabase Dashboard → **SQL Editor**, paste and run:

```
supabase/schema.sql
```

This creates `profiles` and `orders` tables with Row Level Security.

### 4. Auth settings (recommended for dev)

Supabase → **Authentication** → **Providers** → Email:

- Turn **OFF** “Confirm email” for faster local testing (optional)

### 5. Create admin user

Sign up at `/get-started` with `admin@stackrel.com`, or create the user in Supabase Auth.  
The SQL trigger assigns **admin** role automatically for that email.

### 6. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/templates` | Template store |
| `/pricing` | Pricing |
| `/portfolio` | Portfolio |
| `/contact` | Contact |
| `/get-started` | Sign up / Login |
| `/account` | User dashboard |
| `/admin` | Admin panel (admin role only) |
| `/cart` | Shopping cart |

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase (Auth + PostgreSQL)
- Framer Motion, GSAP, Lenis

## Data Storage

| Data | Storage |
|------|---------|
| Users & auth | Supabase Auth + `profiles` table |
| Orders | Supabase `orders` table |
| Cart | localStorage (client-side) |

## Build

```bash
npm run build
npm start
```
