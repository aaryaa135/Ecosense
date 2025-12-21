# ECOSENSE Backend Setup Guide

This guide will help you set up the backend infrastructure for your ECOSENSE IoT website. Currently, the site uses localStorage for demo purposes. Follow this guide to implement a production-ready backend.

## 🎯 Backend Requirements

Your backend needs to handle:
1. **User Authentication** (Sign Up, Sign In, OAuth with Google/Microsoft)
2. **Order Management** (Create orders, fetch order history)
3. **Device Monitoring** (IoT device data streaming and monitoring dashboard)
4. **Database** (User data, orders, device readings)

---

## 📋 Option 1: Supabase (Recommended for Quick Setup)

Supabase is a Firebase alternative with PostgreSQL, authentication, and real-time features built-in.

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Save your project URL and anon key

### Step 2: Database Schema

Run these SQL queries in Supabase SQL Editor:

```sql
-- Users table (Supabase Auth handles this automatically)

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  monitoring_url TEXT
);

-- Device readings table (for IoT monitoring)
CREATE TABLE device_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  co2_level INTEGER NOT NULL,
  temperature DECIMAL(5, 2),
  humidity DECIMAL(5, 2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_readings ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Device readings policies
CREATE POLICY "Users can view their device readings"
  ON device_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert device readings"
  ON device_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Step 3: Install Supabase Client

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Step 4: Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 5: Setup Supabase Client

Create `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Step 6: Setup OAuth Providers

1. **Google OAuth:**
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Google provider
   - Follow instructions to create Google OAuth credentials
   - Add authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`

2. **Microsoft OAuth:**
   - Enable Microsoft provider in Supabase
   - Create app in Azure Portal
   - Configure redirect URIs

### Step 7: Update Auth Context

Replace `lib/auth-context.tsx` with Supabase authentication:

```typescript
import { createClient } from '@/lib/supabase/client'

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient()
  
  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    return !error
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return !error
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  const signInWithMicrosoft = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }
  
  // ... rest of implementation
}
```

### Step 8: Create Order API

Create `app/api/orders/route.ts`:

```typescript
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orderData = await request.json()

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: user.id,
        ...orderData,
        monitoring_url: `https://monitoring.ecosense.io/dashboard/${user.id}`
      }
    ])
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}
```

---

## 📋 Option 2: Custom Backend with Node.js + PostgreSQL

If you prefer full control, build your own backend.

### Tech Stack:
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (hosted on Neon, Railway, or AWS RDS)
- **Authentication:** Passport.js with JWT
- **OAuth:** passport-google-oauth20, passport-azure-ad

### Step 1: Setup Express Server

```bash
npm install express pg bcrypt jsonwebtoken passport passport-google-oauth20 passport-azure-ad
```

### Step 2: Database Schema (PostgreSQL)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  name VARCHAR(255) NOT NULL,
  oauth_provider VARCHAR(50),
  oauth_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Authentication Routes

Create authentication endpoints in your Express app:
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/microsoft` - Microsoft OAuth

### Step 4: Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:5432/ecosense
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

---

## 🚀 IoT Device Monitoring Setup

For real-time CO₂ monitoring:

### Option 1: Supabase Realtime
```typescript
const supabase = createClient()

// Subscribe to device readings
supabase
  .channel('device_readings')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'device_readings' },
    (payload) => {
      console.log('New reading:', payload.new)
    }
  )
  .subscribe()
```

### Option 2: WebSocket Server
Set up a WebSocket server for real-time device data streaming using Socket.io or native WebSockets.

---

## 📦 Next Steps After Backend Setup

1. **Remove localStorage:** Delete all localStorage logic from `lib/auth-context.tsx`
2. **Update Auth Page:** Connect OAuth buttons to real providers
3. **API Integration:** Replace mock data with API calls
4. **Deploy Backend:** Use Vercel (for Next.js API routes), Railway, or AWS
5. **Configure CORS:** Ensure proper CORS settings for production
6. **Add Payment Integration:** Integrate Stripe or PayPal for real payments
7. **Device API:** Create endpoints for IoT devices to send CO₂ data

---

## 🔒 Security Checklist

- [ ] Enable HTTPS in production
- [ ] Implement rate limiting on auth endpoints
- [ ] Use environment variables for all secrets
- [ ] Enable Row Level Security (RLS) in Supabase
- [ ] Validate and sanitize all user inputs
- [ ] Implement CSRF protection
- [ ] Use HTTP-only cookies for sessions
- [ ] Add password strength requirements
- [ ] Implement account verification via email

---

## 📚 Useful Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL with Node.js](https://node-postgres.com/)
- [Passport.js OAuth](http://www.passportjs.org/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft OAuth Setup](https://learn.microsoft.com/en-us/azure/active-directory/develop/)

---

Need help with implementation? Feel free to reach out or check the official documentation for each service!
