# DEVLOG

## May 21–23

Hours worked: 0

Received the assignment on May 20 evening.
Did not begin implementation immediately and delayed starting.

Started development on May 24 with a focus on building a functional product within the remaining deadline.

Lessons:
- Start earlier to allow time for iteration and testing.
- Maintain consistent daily commits.
- Prioritize core functionality before polishing.

## May 24

Hours worked: 5–6

Completed:
- Project setup
- Git repository initialization
- Folder structure creation
- Express backend scaffold
- React + Vite setup
- Tailwind configuration
- Basic AI Spend Audit form
- Form state handling
- Initial commits pushed to GitHub

Challenges:
- Tailwind installation issue
- PowerShell vs Git Bash commands

Resolved:
- Installed Tailwind v3
- Switched terminal to Git Bash

## May 25

Hours worked: 5–6

Completed:
- Configured Supabase
- Fixed CORS issues
- Added audit calculation API
- Connected React frontend to Express backend
- Integrated Axios requests
- Displayed monthly cost and potential savings

Challenges:
- nodemon not installed
- Invalid Supabase URL
- CORS mismatch (3000 vs 5173)

Resolved:
- Installed nodemon
- Configured .env correctly
- Updated CLIENT_URL to localhost:5173

## May 26

Hours worked: 6–8

Completed:

Frontend:
- Added dashboard summary cards
  - Total audits
  - Total spend
  - Total savings

- Added search functionality
- Added sorting
  - Latest
  - Highest cost
  - Lowest cost

- Added loading state
- Added success notification
- Added validation for empty inputs

Charts:
- Added bar chart (Spend Chart)
- Added pie chart (Tool Usage)

Features:
- Added CSV export
- Added dark mode
- Added delete audit with confirmation
- Added audit history display

Authentication:
- Configured Supabase auth
- Created client-side Supabase setup
- Added login functionality
- Added logout functionality
- Added protected dashboard access

Backend:
- Added history API
- Added delete API
- Fixed audit retrieval issues
- Fixed Supabase permission errors

Database:
- Fixed RLS policies
- Enabled CRUD operations
- Stored audit records successfully

Git:
- Pushed major Day 26 update
- Removed `.env` files from Git tracking
- Updated `.gitignore`

Challenges:

- Supabase permission denied
- History API returning empty array
- React rendering issues
- Authentication setup errors
- `.env` accidentally committed
- Login state problems

Resolved:

- Updated RLS policies
- Fixed route ordering
- Added auth state handling
- Removed sensitive files from Git
- Added protected dashboard logic

Lessons:

- Never push `.env` files
- Commit frequently after stable milestones
- Protect routes when using authentication
- Validate forms before API calls

Result:

Project evolved from:

Simple audit calculator

→ to

Authenticated full-stack analytics dashboard

Tech stack used:

React + Express + Supabase + Tailwind + Recharts + GitHub

## May 27

Hours worked: 7–9

Completed:

Features:
- Added AI summaries using Groq API
- Added multiple AI tools
  - Gemini
  - GitHub Copilot
  - Perplexity
  - Notion AI

Lead Capture:
- Saved leads to Supabase
- Added transactional email using Resend
- Fixed Supabase permissions

UI:
- Fixed dark mode issues
- Added empty states
- Improved charts
- Improved history section

Backend:
- Added summary API route
- Added custom logger middleware
- Added AI recommendation endpoint

Security:
- Removed sensitive .env files
- Updated .gitignore

Challenges:
- Groq deprecated model error
- Supabase RLS issues
- Email API failures

Resolved:
- Updated Groq model
- Disabled RLS / fixed permissions
- Configured Resend correctly

Lessons:
- Test APIs before integration
- Keep environment variables private
- Build incrementally and commit often

Result:

Project evolved into:

AI Spend Audit Dashboard

with

Auth + Analytics + AI Summary +
Emails + Charts + Lead Capture