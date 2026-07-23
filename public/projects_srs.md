# Software Requirements Specification (SRS)
## Project: Nur Dynamic Profile

**Author:** Md. Nur A Alam
**Document type:** SRS
**Status:** Draft v1.0

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for **Nur Dynamic Profile** — a personal portfolio website with an integrated admin CMS and a blog/social-feed module. It is the reference for implementation in Antigravity IDE and for verifying the finished build against the original assignment brief ("Craft Your Developer Profile").

### 1.2 Scope
The system consists of two applications:
- **`nur_dynamic_profile_client`** — Next.js (JavaScript, App Router) public site, auth pages, user profile, blog/social pages, and admin dashboard.
- **`nur_dynamic_profile_server`** — Express.js REST API, MongoDB Atlas persistence, Better Auth authentication, Cloudinary/imgbb file storage.

### 1.3 Definitions
| Term | Meaning |
|---|---|
| Admin | The site owner; sole content owner of the portfolio and blog/social posts |
| Registered user | A visitor who has signed up; can react/comment |
| Viewer / Guest | An unauthenticated visitor; read-only |
| Post | A blog or social-media-style entry created only by the admin |

---

## 2. Overall Description

### 2.1 Product Perspective
A standalone, self-hosted full-stack application. Not integrated with any third-party CMS. Media is offloaded to imgbb (images) and Cloudinary (images + PDFs), keeping MongoDB free of binary data.

### 2.2 User Classes and Characteristics
| Role | Auth required | Permissions |
|---|---|---|
| Admin | Yes (email+password, or Google restricted to `mdnuralam2812@gmail.com` / `fiverr.com.nur@gmail.com`) | Full CRUD on all portfolio data, posts, and moderation of comments/reactions |
| Registered user | Yes (email+password) | View portfolio, view posts, react, comment, edit own profile |
| Guest | No | View portfolio, view posts. Reacting/commenting triggers: *"To do like and comment, please login first."* |

### 2.3 Constraints
- Client: JavaScript only, no TypeScript.
- Auth: Better Auth exclusively (no parallel custom JWT auth system for login — `jsonwebtoken`/`bcryptjs` are available for any internal token needs but Better Auth owns the auth flow).
- Admin identity is restricted to two hardcoded whitelisted emails — enforced server-side, not just in the UI.
- Images: imgbb or Cloudinary. PDFs: Cloudinary only (`resource_type: raw`) — imgbb rejects non-image files.
- Must support light/dark theme from initial build, not retrofitted later.
- Must be responsive at `<sm`, `sm`, `md`, `lg`, `xl`, `xxl`.

### 2.4 Assumptions and Dependencies
- MongoDB Atlas cluster and Cloudinary/imgbb accounts are already provisioned (per `.env`).
- Resume PDF is not ready yet — the download button ships functional-but-inert (disabled state) until a file exists.
- Google OAuth app is already registered (client ID/secret present in `.env`).

---

## 3. System Architecture & Folder Structure Requirements

### 3.1 Client — Standard Next.js App Router + Better Auth + Component-Based Structure

The client must follow conventional Next.js App Router layout, standard Better Auth file placement, and a component-based structure that maximizes reuse and readability. Recommended structure:

```
nur_dynamic_profile_client/
├── app/
│   ├── (public)/                  # main one-page portfolio + static-feel routes
│   │   ├── layout.js
│   │   └── page.js                 # single-page portfolio (all sections)
│   ├── (auth)/
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── posts/                      # blog/social pages (separate from one-pager)
│   │   ├── page.js                 # feed/list
│   │   └── [postId]/page.js        # single post + comments/reactions
│   ├── projects/
│   │   └── [projectId]/page.js     # project detail page
│   ├── profile/
│   │   └── page.js                 # registered user's own profile edit
│   ├── dashboard/                  # admin-only, isolated layout
│   │   ├── layout.js                # drawer nav lives here
│   │   ├── page.js                  # dashboard home/overview
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── posts/
│   │   ├── users/
│   │   └── ...                      # one folder per manageable collection
│   ├── api/
│   │   └── auth/[...all]/route.js  # Better Auth handler (standard mount point)
│   ├── layout.js                    # root layout: theme provider, toasts, fonts
│   └── globals.css
├── components/
│   ├── ui/                          # generic, dumb, reusable primitives (Button, Card, Modal, Badge...)
│   ├── layout/                      # Navbar, Footer, Drawer, ThemeToggle
│   ├── sections/                    # one-pager sections (Hero, About, Skills, Experience, Projects, Contact)
│   ├── posts/                       # PostCard, ReactionBar, CommentList, CommentForm
│   ├── dashboard/                   # DataTable, CrudForm, DrawerNav, StatCard
│   └── shared/                      # cross-cutting (LoginGateModal, ImageUploader, PdfUploader)
├── lib/
│   ├── auth.js                      # Better Auth server instance/config
│   ├── auth-client.js               # Better Auth React client
│   ├── axios.js                     # configured API instance
│   ├── queryClient.js               # @tanstack/react-query setup
│   └── utils.js                     # cn()/tailwind-merge helpers, formatters
├── hooks/                           # useTheme, useAuth, useReaction, useComments...
├── context/                         # ThemeContext (or via next-themes-style provider)
├── constants/                       # skill categories, reaction types, breakpoints
├── public/
├── styles/
├── .env
├── next.config.js
├── tailwind.config.js
└── package.json
```

**Principles enforced by this structure:**
- Route groups `(public)` / `(auth)` keep the one-pager separate from auth pages without affecting URL paths.
- `dashboard/` is a fully isolated subtree with its own layout — enables a distinct drawer-based UI without leaking admin chrome into the public site.
- `components/ui/` holds only presentation-level, prop-driven components with no data-fetching — maximizes reuse between the public site and the dashboard.
- `components/sections/` and `components/dashboard/` hold composition-level components that assemble `ui/` primitives with real data.
- Better Auth's server config (`lib/auth.js`), client hooks (`lib/auth-client.js`), and route handler (`app/api/auth/[...all]/route.js`) follow Better Auth's documented convention so future upgrades don't require restructuring.

### 3.2 Server — Standard Express Structure

```
nur_dynamic_profile_server/
├── src/
│   ├── config/          # db.js, cloudinary.js, imgbb.js, betterAuth.js
│   ├── models/          # one Mongoose model per collection
│   ├── controllers/     # request handlers, grouped by resource
│   ├── routes/          # route definitions, grouped by resource
│   ├── middlewares/     # auth guard, role guard, error handler, rate limiter
│   ├── services/        # upload service, email service (nodemailer)
│   ├── validators/      # joi schemas
│   ├── utils/
│   └── app.js
├── server.js             # entry point
├── .env
└── package.json
```

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization
- **FR-1:** System shall support admin login via email/password and Google OAuth, both restricted to the two whitelisted admin emails.
- **FR-2:** System shall reject any Google login whose email is not on the admin whitelist, verified server-side.
- **FR-3:** System shall support registered-user signup with minimal fields: name, email, password, occupation, profile image.
- **FR-4:** System shall allow registered users to view and edit their own profile.
- **FR-5:** System shall allow guests to browse the public portfolio and posts without authentication.
- **FR-6:** System shall block guest reactions/comments with the message *"To do like and comment, please login first."*
- **FR-7:** System shall prevent non-admin users (including registered users) from accessing `/dashboard` routes, enforced both client-side (route guard) and server-side (middleware).

### 4.2 Public Portfolio (One-Page)
- **FR-8:** Responsive navbar linking to all sections.
- **FR-9:** Hero section with designation, professional photo, resume download button (disabled state permitted if resume not yet uploaded).
- **FR-10:** Social links section (GitHub, LinkedIn, etc., sourced from `onlineProfiles`).
- **FR-11:** About Me section (programming journey, preferred work, hobbies, personality).
- **FR-12:** Skills section rendered graphically (charts), grouped by category.
- **FR-13:** Education section for all above-HSC qualifications.
- **FR-14:** Experience section.
- **FR-15:** Projects section, minimum 3 cards (name, image, "View More/Details").
- **FR-16:** Project detail page: tech stack, description, live link, client-repo GitHub link, challenges faced, future improvements.
- **FR-17:** Contact section: email, phone, optional WhatsApp.
- **FR-18:** Footer.

### 4.3 Blog / Social Posts
- **FR-19:** Admin can create/edit/delete posts with title, description, location, feeling/emoji, and attachment images.
- **FR-20:** Posts are visible to both guests and registered users.
- **FR-21:** Registered users can react (like, love, haha, sad, etc.) and comment on posts.
- **FR-22:** Guests can view reactions/comments but cannot add them (see FR-6).

### 4.4 Admin Dashboard
- **FR-23:** Dashboard provides a drawer with one entry per manageable data section (all 25+ portfolio collections, plus posts, users, comments, reactions).
- **FR-24:** Each section supports full CRUD with a list view and create/edit forms.
- **FR-25:** Dashboard supports moderation actions on comments/reactions (e.g., delete inappropriate content).

### 4.5 Theming & Responsiveness
- **FR-26:** Global light/dark mode toggle, persisted across sessions.
- **FR-27:** Fully responsive layouts at `<sm`, `sm`, `md`, `lg`, `xl`, `xxl` breakpoints.

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Security | Role checks enforced server-side on every protected route; secrets never leave `.env`; rate limiting (`express-rate-limit`) on auth, comment, and reaction endpoints |
| Performance | Images/PDFs served via CDN (Cloudinary/imgbb), not through the API server |
| Usability | Public site: interactive, animated, playful-but-professional. Dashboard: dense, standard, production-grade admin UX |
| Maintainability | Component-based client structure (Section 3.1); one Mongoose model + controller + route file per resource on the server |
| Accessibility | Sufficient color contrast in both themes; keyboard-navigable nav and forms |
| Data integrity | Joi validation on all server-side write endpoints |

---

## 6. Data Requirements

Portfolio content collections (25, finalized): `profile`, `personalDetails`, `addresses`, `family`, `headlineStats`, `education`, `skills`, `experience`, `employmentCompensation`, `training`, `projects` (extended with `challenges`, `futureImprovements`), `publications`, `researchProfiles`, `onlineProfiles`, `competitiveAchievements`, `honoursAndAwards`, `leadershipRoles`, `committeeParticipation`, `languages`, `contact`, `academicReferences`, `applications`, `images`, `documents`, `siteMeta`.

Application/runtime collections (to be modeled next): `users`, `posts`, `reactions`, `comments`.

---

## 7. Acceptance Criteria (mapped to assignment brief)

Each of the 12 original assignment requirements (navbar, hero+photo, resume button, social links, about, skills, education, experience, ≥3 projects with detail pages, contact, footer, full responsiveness) maps directly to FR-8 through FR-18 above and is considered met when that section is present, populated from the database, and verified responsive across all six breakpoints in both themes.

---

## 8. Out of Scope (v1)
- Payment/e-commerce functionality.
- Multi-admin support beyond the two whitelisted emails.
- Real-time chat or notifications (posts/comments/reactions are request-driven, not socket-based, in this version).
