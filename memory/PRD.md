# PRD - Maa Harsiddhi Darbar Foods

## Original Problem Statement
Premium, modern, ultra-smooth restaurant website for **Maa Harsiddhi Darbar Foods** (Pure Veg Restaurant & Cafe, Ujjain MP).
- Owner: Lokesh Gorkar
- WhatsApp: +91 9713131389
- Theme: Deep Black + Premium Orange (luxury)

## Architecture
- **Backend**: FastAPI (`/app/backend/server.py`) — single `/api/menu` endpoint serving 168 items across 12 categories (hardcoded with exact prices from owner-provided menu)
- **Frontend**: React 19 + Tailwind + Framer Motion + react-fast-marquee
  - State: React Context (`CartContext`) for cart
  - Fonts: Cormorant Garamond (headings) + Outfit (body)
  - All interactive elements have `data-testid` attributes

## User Personas
1. **Hungry local customer** (Ujjain) — browses menu, adds dishes, places order via WhatsApp
2. **Walk-in / Caller** — wants address, phone, hours quickly
3. **Owner Lokesh Gorkar** — receives orders directly on WhatsApp 9713131389

## Core Requirements (static)
- Pure Veg menu with categories: Chinese, Main Course, Tandoor Starter, Breads, Rice, Dal, Green Vegetable, Curd, Combo, Salad, Dessert, Thali
- Cart with qty +/-, remove, live total
- Checkout → WhatsApp redirect with order details
- Gallery using owner-uploaded food images
- Floating WhatsApp button (pulse)
- Premium black + orange UI, glassmorphism nav, parallax hero

## What's Been Implemented (2026-02)
- ✅ Backend `/api/menu` — 168 items, 12 categories, owner-provided prices
- ✅ Hero with parallax + offer badge "Order ₹999 Get 9% Discount"
- ✅ Sticky glassmorphism nav with cart icon + Call Now CTA
- ✅ Menu: category tabs, live search, item cards (image/name/price/Add to Cart)
- ✅ Cart drawer: qty controls, remove, live total
- ✅ Checkout form (Name/Phone/Address/Notes) → WhatsApp URL generator → `wa.me/919713131389`
- ✅ Gallery (bento grid with owner-uploaded images)
- ✅ Reviews (auto-scrolling marquee)
- ✅ Contact (address + phone + hours)
- ✅ Floating WhatsApp button (pulse)
- ✅ Loader animation
- ✅ Tested 100% pass (backend 8/8, frontend all critical flows)

## Backlog (P1/P2)
- P1: Move hardcoded menu to `/app/backend/data/menu.json` for easier owner edits
- P1: Replace alert() in CartDrawer with inline form errors
- P2: Add Admin panel for owner to update prices/availability
- P2: Order history / saved addresses (localStorage)
- P2: Hindi/English language toggle
- P2: Online payment (Razorpay) alongside WhatsApp orders
- P2: Push notifications for new offers
