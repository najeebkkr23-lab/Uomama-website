# 🚀 Uomama Business Solutions — Standalone Railway Backend

Yeh backend **Uomama Business Solutions** ke liye alag se create kiya gaya hai taake aap isko **Railway** (`railway.app`) par easily deploy kar sakein.

Website se customer-facing UI se admin buttons alag kar diye gaye hain taake regular clients ko bilkul clean aur professional corporate website dikhayi de.

---

## 📁 Backend Directory Structure

```text
backend/
├── src/
│   └── server.ts          # Main Express API server (CORS, Leads, SEO, AI, Settings)
├── package.json           # Node.js dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── Dockerfile             # Container image configuration for Railway
├── railway.json           # Railway Nixpacks deployment config
├── Procfile               # Process runner for Railway/PaaS
├── .env.example           # Environment variables template
└── README.md              # Deployment Guide
```

---

## 🛠️ Step-by-Step Railway Deployment Guide

### Tareeqa 1: GitHub ke zariye (Recommended & Easiest)

1. **GitHub Repository me push karein:**
   - Apne project ko GitHub repository me commit aur push karein.
2. **Railway par Account banayein:**
   - [Railway.app](https://railway.app/) par jayein aur GitHub ke zariye Sign In karein.
3. **New Project banayein:**
   - **New Project** par click karein -> **Deploy from GitHub repo**.
   - Apni repository select karein.
   - Agar aapne sirf backend ko separate repo banaya hai to direct deploy ho jayega.
   - Agar same repo me `backend` folder hai, to Railway Settings me jakar **Root Directory** ko `/backend` set karein.
4. **Environment Variables Add karein:**
   Railway Dashboard me **Variables** tab me jayein aur yeh add karein:
   - `PORT`: `3000` (Railway automatically assign bhi karta hai)
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: Aapka Google Gemini API Key
   - `FRONTEND_URL`: Aapki live frontend website ka URL (e.g. `https://uomamabusiness.com`)
5. **Generate Domain:**
   - Railway Settings -> **Networking** -> **Generate Domain** par click karein.
   - Aapko ek public URL mil jayega, misal ke tor par:  
     `https://uomama-backend-production.up.railway.app`

---

### Tareeqa 2: Railway CLI ke zariye (Terminal se Direct)

Agar aap terminal se deploy karna chahte hain:
```bash
# 1. Backend folder me jayein
cd backend

# 2. Railway CLI install karein (agar pehle se nahi hai)
npm i -g @railway/cli

# 3. Login karein
railway login

# 4. Project link ya create karein
railway init

# 5. Deploy karein
railway up
```

---

## 🔗 Website (Frontend) ko Railway Backend se Connect Kaise Karein?

Jab Railway par backend live ho jaye aur aapko URL mil jaye:

1. Apni Frontend Website ke hosting platform (Vercel, Netlify, ya Cloud Run) ke Environment Variables me jayein:
   ```env
   VITE_API_URL=https://your-railway-backend-url.up.railway.app
   ```
2. Ab website se jab bhi koi client consultation request form submit karega, ya backend settings update hongi, woh direct aapke Railway backend par process hongi!

---

## 🌐 Available Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` or `/admin` | Standalone Visual Admin & Server Health Dashboard |
| `GET` | `/api/health` | Server Health Status & Uptime |
| `GET` | `/api/consultations` | Fetch all consultation inquiries & leads |
| `POST` | `/api/consultations` | Submit a new consultation inquiry from website |
| `PATCH`| `/api/admin/leads/:id`| Update lead status or admin notes |
| `DELETE`| `/api/admin/leads/:id`| Delete lead from store |
| `GET` | `/api/admin/settings` | Retrieve live site settings, branding & SEO meta |
| `POST`| `/api/admin/settings` | Update site settings, branding & SEO meta |
| `POST`| `/api/admin/upload-logo`| Upload custom brand logo |
| `POST`| `/api/admin/seo-audit` | Run full automated 100-point SEO audit |
| `POST`| `/api/ai/advisor` | AI Tax & Corporate Formation Advisor (Gemini 3.7) |
| `GET` | `/robots.txt` | Dynamic Robots policy based on SEO settings |
| `GET` | `/sitemap.xml` | Dynamic XML sitemap for Google Search Console |
