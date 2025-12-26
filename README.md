# DineTalk Website Layout & Client Portal

This repository contains the public marketing site plus the `/portal` customer portal for the Voice AI Wrapper v0.1.

## Prerequisites
- Node.js 18+
- npm
- Supabase project with existing tables and RLS as provisioned

## Environment variables
Set these locally (e.g. `.env` files) and in Netlify for the portal and any Netlify Functions:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
# Optional: used only by Netlify Functions (never in the client bundle)
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-for-functions>
```

Portal auth uses **email + password only**. Configure Supabase redirect URLs to include:

- `https://dinetalk.com.au/portal/auth/callback`
- `https://dinetalk.com.au/portal/*`
- `http://localhost:5174/portal/auth/callback` (local dev)

## Development

### Marketing site (root)
```
npm install
npm run dev
```

### Client portal (Vite + React + TypeScript)
```
cd portal
npm install
npm run dev
```

The portal runs on `/portal` with SPA routing for `/portal/*`. Signup uses `supabase.auth.signUp` with `emailRedirectTo = ${window.location.origin}/portal/auth/callback`. The callback route exchanges the code, polls for a stable session, checks `accounts` provisioning, then forwards to `/portal/restaurants`.

Account provisioning is asynchronous. If an account row is not found yet, the UI shows “Setting up your account…” and retries silently before surfacing any errors.

## Building for Netlify
The Netlify build packs both apps:
```
npm run build             # builds marketing site to dist/
npm run build --prefix portal
cp -r portal/dist dist/portal
cp sitemap.xml robots.txt dist/
```
Netlify will publish the `dist` directory. Redirects for `/portal` and `/portal/*` are configured in `netlify.toml` so `/portal/?code=...` and other Supabase callbacks land in the SPA.

## Retell webhook (optional storage stub)
A Netlify function exists at `/.netlify/functions/retell-webhook` that accepts POST payloads from Retell, maps restaurants by `retell_phone_number`, and upserts `call_logs` using the Supabase REST API. Provide `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` so the function can authenticate.
