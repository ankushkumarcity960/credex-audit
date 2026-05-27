# System Architecture

## Frontend
Tech:
- React + Vite
- Tailwind CSS
- Axios
- Recharts

Features:
- Audit dashboard
- Charts
- Dark mode
- Authentication
- Audit history
- CSV export

---

## Backend

Tech:
- Node.js
- Express.js
- Middleware logging

API Routes:

/api/audit
/api/leads
/api/summary

Functions:

- Run AI spend audit
- Save audit history
- Generate AI summaries
- Capture leads
- Send emails

---

## Database

Supabase PostgreSQL

Tables:

audits
leads

---

## External Services

Groq → AI summaries

Resend → transactional emails

Supabase → auth + database

---

## Deployment

Frontend → Vercel

Backend → Render

Database → Supabase