# OSHA Petcare — Veterinary Clinic & Petshop Website

A full-stack business website built for a local veterinary clinic in Tangerang Selatan, Indonesia.

## Live Demo
[View Site](https://osha-petcare.vercel.app/) 

## Features

- **Public landing page** — services, testimonials, location, and WhatsApp contact
- **Lead capture** — visitors enter their name and pet type before being redirected to WhatsApp, saved to database
- **Admin panel** — password-protected dashboard where the clinic owner can:
  - Edit service names, descriptions, and icons
  - Show/hide testimonials
  - View incoming leads
- **Fully responsive** — mobile-first design

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + RLS)
- TanStack React Query
- React Router v6
- Vite

## Architecture

- Data-driven content — services and testimonials are fetched from Supabase, not hardcoded
- Row Level Security enforced at the database level for all tables
- Anonymous users can read content and submit leads, but cannot read or modify protected data
- Admin route is auth-gated via Supabase Auth session

## Local Development
```bash
npm install
cp .env.example .env.local  # add your Supabase credentials
npm run dev
```

## Environment Variables
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
