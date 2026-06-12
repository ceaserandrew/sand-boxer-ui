# SandBoxer Developer Integration Guide

This document provides a highly detailed roadmap, specification, and codebase blueprint for replacing the fast, offline pseudo-login system with enterprise-grade authorization, real payments, and live cloud persistence using **Supabase**, **PayPal Checkout**, and deploying to **Cloudflare**.

---

## 1. Authentication & Backend Integration (Supabase)

We swap out local memory state for **Supabase Auth** and **PostgreSQL** persistence.

### Setup Instructions
1. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Establish Environment Variable Declarations**:
   Register these tokens inside your `.env` or Cloudflare dashboard:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-key
   ```

3. **Initialize Supabase Client**:
   Create `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

   if (!supabaseUrl || !supabaseAnonKey) {
     console.warn("Supabase credentials missing, falling back to local memory.");
   }

   export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
   ```

4. **Connect standard Supabase Auth state** inside `src/App.tsx`:
   ```typescript
   import { useEffect, useState } from 'react';
   import { supabase } from './lib/supabase';

   export default function App() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [currentUser, setCurrentUser] = useState<string | null>(null);

     useEffect(() => {
       // Get current session
       supabase.auth.getSession().then(({ data: { session } }) => {
         if (session?.user) {
           setIsLoggedIn(true);
           setCurrentUser(session.user.email || session.user.id);
         }
       });

       // Listen to changes
       const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
         if (session?.user) {
           setIsLoggedIn(true);
           setCurrentUser(session.user.email || session.user.id);
         } else {
           setIsLoggedIn(false);
           setCurrentUser(null);
         }
       });

       return () => subscription.unsubscribe();
     }, []);
   }
   ```

---

## 2. PostgreSQL Tables Schema (Supabase)

Define security-hardened schemas directly under Supabase SQL Editor:

```sql
-- 1. Create startups table
CREATE TABLE public.startups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tag TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create cards table representing our Sandbox blocks
CREATE TABLE public.sandbox_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES public.startups(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'idea', 'vision', 'forbidden', etc.
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'Draft' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sandbox_cards ENABLE ROW LEVEL SECURITY;

-- 4. Set secure access policies
CREATE POLICY "Users can fully manage their own startups."
  ON public.startups
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can fully manage their own start_cards."
  ON public.sandbox_cards
  FOR ALL
  USING (
    startup_id IN (
      SELECT id FROM public.startups WHERE user_id = auth.uid()
    )
  );
```

---

## 3. Real Payments Integration (PayPal Checkout)

Inject PayPal Smart Buttons safely inside your React workflow.

1. **Load PayPal JavaScript SDK** in `index.html` or dynamically:
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
   ```

2. **React Component Implementation**:
   ```typescript
   import { useEffect } from 'react';

   export function PayPalPaymentButton({ planPrice, onSuccess }) {
     useEffect(() => {
       if (window.paypal) {
         window.paypal.Buttons({
           createOrder: (data, actions) => {
             return actions.order.create({
               purchase_units: [{
                 amount: {
                   value: planPrice.toString()
                 }
               }]
             });
           },
           onApprove: async (data, actions) => {
             const details = await actions.order.capture();
             onSuccess(details);
           }
         }).render('#paypal-button-container');
       }
     }, [planPrice]);

     return <div id="paypal-button-container" className="my-4" />;
   }
   ```

---

## 4. Production Deployment (Cloudflare Pages)

Deploy SandBoxer instantly to **Cloudflare** for high-edge performance.

### Step-by-Step CLI Deploy
1. **Login & Initialize Wrangler**:
   ```bash
   npx wrangler login
   ```

2. **Build the Application**:
   Ensure your Vite production configuration compiles the bundle to page files:
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages**:
   Configure CF to host the standard `dist/` directory:
   ```bash
   npx wrangler pages deploy dist/ --project-name=sandboxer-app
   ```

4. **Environment Secrets**:
   - Go to your Cloudflare dashboard under **Workers & Pages** -> **Pages** -> **sandboxer-app**.
   - Navigate to **Settings** -> **Variables & Secrets**.
   - Input your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to authenticate users on production.

