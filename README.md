# DineTalk Website Layout & Client Portal

This repository contains the marketing site plus a Supabase-backed client portal for restaurant owners.

## Prerequisites
- Node.js 18+
- npm
- Supabase project with existing tables and RLS as provisioned

## Environment variables
Set these locally (e.g. `.env` files) and in Netlify:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-for-functions>
```

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
The portal runs on `/portal` with SPA routing that supports `/portal/*`.

## Building for Netlify
The Netlify build packs both apps:
```
npm run build             # builds marketing site to dist/
npm run build --prefix portal
cp -r portal/dist dist/portal
cp sitemap.xml robots.txt dist/
```
Netlify will publish the `dist` directory. Redirects for `/portal/*` are already configured in `netlify.toml`.

## Retell webhook (optional storage stub)
A Netlify function exists at `/.netlify/functions/retell-webhook` that accepts POST payloads from Retell, maps restaurants by `retell_phone_number`, and upserts `call_logs` using the Supabase REST API. Provide `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` so the function can authenticate.
