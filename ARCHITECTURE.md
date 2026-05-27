# System Architecture

## Frontend
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

## Backend
- Node.js
- Express.js
- Middleware logging
- REST APIs

Routes:
- /api/audit
- /api/leads
- /api/summary

## Database
Supabase PostgreSQL

Tables:
- audits
- leads

## External Services
- Groq → AI summaries
- Resend → transactional emails
- Supabase → database + auth

## Deployment
Frontend → Vercel  
Backend → Render  
Database → Supabase