# Project Context — Nur Dynamic Profile

Personal full-stack portfolio + admin CMS + blog/social feed, built by Md. Nur A Alam.
This file is the single source of truth for the project's architecture, roles, and requirements. Load it into IDE memory before generating any code.

---

## 1. Tech Stack

**Monorepo (two folders, not a workspace):**
```
Nur_Dynamic_Profile/
├── nur_dynamic_profile_client/   (Next.js, plain JS — no TypeScript)
└── nur_dynamic_profile_server/   (Express.js)
```

**Server (`nur_dynamic_profile_server`):**
- express, cors, dotenv, mongoose, jsonwebtoken, bcryptjs, multer, helmet, morgan, express-rate-limit, nodemailer, joi
- cloudinary, imgbb-uploader
- better-auth
- nodemon (dev)

**Client (`nur_dynamic_profile_client`):**
- Next.js (App Router, JavaScript — `create-next-app` with `ts` disabled)
- @better-auth/react, lucide-react, react-hook-form, @hookform/resolvers, zod
- recharts, axios, @tanstack/react-query, canvas-confetti
- next-cloudinary, imgbb-uploader
- tailwind-merge, clsx, react-toastify
- tailwindcss, postcss, autoprefixer (dev)
- react-icons

**Database:** MongoDB Atlas, database name `Profile_DB`.

**File storage split (established in prior discussion):**
| Asset type | Service | Notes |
|---|---|---|
| Images | imgbb **or** Cloudinary (`resource_type: image`) | `images` collection tracks `source` per asset |
| PDFs (certificates, transcripts, CVs, resumes) | Cloudinary only, `resource_type: raw` | imgbb does not accept PDFs |

**Environment variables** (values live only in each folder's `.env`, never in source, docs, or IDE memory):
`SERVER_BASE_URL`, `CLIENT_BASE_URL`, `MONGODB_URI`, `DB_NAME`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET`, `CLOUD_NAME`, `UPLOAD_PRESET_NAME`, `ASSET_FOLDER_NAME`, `IMGBB_API_KEY`.

---

## 2. Roles & Authentication (Better Auth)

Three roles, all handled through **Better Auth**:

| Role | Login required? | Access |
|---|---|---|
| **Admin** (site owner) | Yes — email+password OR Google, restricted to `mdnuralam2812@gmail.com` and `fiverr.com.nur@gmail.com` only | Full dashboard CRUD on every section |
| **Registered user** (3rd role) | Yes — email + password (minimal signup) | View blog/social posts, like/react, comment, edit own profile |
| **Viewer / guest** (2nd role) | No | Can browse the portfolio and read blog/social posts, but **cannot** like or comment |

**Rules:**
- Google login on the admin flow must check the authenticated email against the two whitelisted addresses server-side — reject/downgrade any other Google account, never trust a client-side check alone.
- Guests attempting to like or comment must be blocked with the message: **"To do like and comment, please login first."**
- Registered-user signup fields (minimal): name, email, password, occupation, profile image.
- Registered users get a profile page where they can edit their own info.
- Viewers never see the admin dashboard route, and non-admin registered users must be blocked from it too (role check on both client route guard and server middleware — never rely on hiding the link alone).

---

## 3. Application Structure

- **Main portfolio:** single-page application — all sections (hero, about, skills, education, experience, projects, contact) navigated via in-page anchors from the navbar.
- **Blog / social-media-style posts:** separate pages (list + individual post page), not part of the one-pager.
- **Project detail pages:** separate page per project (linked from project cards via "View More / Details").
- **Auth pages:** login/register as separate pages.
- **Admin dashboard:** separate, fully independent route/layout (e.g. `/dashboard/...`) with its own drawer navigation — one drawer item per data section, each with list/create/edit/delete views.

**Theming & responsiveness (from day one, not retrofitted):**
- Light and dark mode toggle available everywhere.
- Fully responsive at all breakpoints: below `sm`, `sm`, `md`, `lg`, `xl`, `xxl`.

**Design direction:**
- Public portfolio: modern, playful-but-professional developer aesthetic, animated/interactive, UX-first.
- Admin dashboard: dense, production-grade, highly functional — standard admin-panel conventions over playfulness.

---

## 4. Core Assignment Requirements (must all be satisfied)

1. Fully responsive navbar with links to every portfolio section.
2. Hero section: professional designation + professional photo.
3. Resume download button in the hero (wire it up now; if no resume file yet, keep the button present but inert/disabled).
4. Social links (GitHub, LinkedIn, plus any others in `onlineProfiles`).
5. About Me: programming journey, preferred type of work, hobbies/interests outside programming, personality.
6. Skills section: visually graphical (charts/bars via `recharts`), grouped by category.
7. Education: full detail for above-HSC qualifications.
8. Experience section.
9. Projects: minimum 3, card format (name, image, "View More/Details"). Detail page per project must include: main tech stack, description, live link, GitHub link (client repo only), challenges faced, future improvements. → **`projects` collection needs new fields:** `challenges` and `futureImprovements` (not yet present in the seed data — add as null placeholders).
10. Contact section: email, phone, WhatsApp (optional).
11. Footer (optional but planned).
12. Clean, polished, fully responsive UI across devices.

---

## 5. Blog / Social-Media-Style Posts (admin-authored, viewer/user-readable)

Admin-only authored content, visible to both guests and registered users. Needs its own collections beyond the 25 already defined in `portfolio_db_seed_final.json`:

**`posts`**
- title, description, location, feeling/emoji, attachment images[] (Cloudinary/imgbb), authorId (always admin), createdAt, visibility

**`reactions`**
- postId, userId, type (`like` | `love` | `haha` | `sad` | ...), createdAt
- Guests are blocked at the API level, not just hidden in the UI.

**`comments`**
- postId, userId, text, createdAt
- Same guest-blocking rule as reactions.

---

## 6. Database — Collections Summary

**Already finalized** (see `portfolio_db_seed_final.json`, 25 collections): `profile`, `personalDetails`, `addresses`, `family`, `headlineStats`, `education`, `skills`, `experience`, `employmentCompensation`, `training`, `projects`, `publications`, `researchProfiles`, `onlineProfiles`, `competitiveAchievements`, `honoursAndAwards`, `leadershipRoles`, `committeeParticipation`, `languages`, `contact`, `academicReferences`, `applications`, `images`, `documents`, `siteMeta`.

**Still to add for this build:** `users` (admin + registered users, with role field), `posts`, `reactions`, `comments`.

**Admin dashboard must provide full CRUD** on every one of the above collections, organized as drawer sections.

---

## 7. Open Points to Confirm Before Building

- Exact list of skill "categories" to chart (Frontend/Backend/Database/AI-ML/Tools already implied by seed data).
- Resume file: not ready yet — button ships disabled/placeholder.
- Whether "viewer" (guest) sessions need any tracking at all (e.g., view counts) or are fully anonymous — not specified yet.
- Rate limiting / spam protection thresholds for comments and reactions (package `express-rate-limit` is already installed — thresholds not yet decided).
