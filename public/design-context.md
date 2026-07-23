# UI/UX Design Context — Nur Dynamic Profile

Instructional design system for Antigravity IDE. This is not a generic template — every choice below is derived from the actual subject: a competitive programmer / AI researcher / full-stack developer. Follow this exactly when generating components; don't substitute defaults.

---

## 0. Creative Direction (read first)

**The brief in one sentence:** a developer whose identity is built on *verdicts* — competitive-programming judges (Accepted / Wrong Answer / Pending), IEEE peer review, exam boards, contest rankings. The entire visual language is built around that idea: **the judge-verdict pill** is the signature element, reused everywhere something needs a status.

**Explicitly avoid** these three AI-generated defaults — none of them fit this subject:
1. Warm cream background + high-contrast serif + terracotta accent (editorial/lifestyle, wrong register for a CP/AI engineer).
2. Near-black + single acid-green/vermilion accent with no other structure (generic "hacker" cliché with nothing subject-specific).
3. Broadsheet hairlines, zero border-radius, dense newspaper columns (wrong for an interactive, playful developer portfolio).

Instead: a **deep-ink IDE surface** with **judge-verdict colors used with real meaning** (not decoration), **monospace used only where code/data actually lives**, and **rounded, tactile UI chrome** everywhere else — the contrast between crisp mono data and soft rounded shells is the personality.

---

## 1. Design Tokens

### 1.1 Color — Dark mode (default)
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#0B0E14` | Page background — ink, not pure black |
| `--bg-surface` | `#141824` | Cards, panels |
| `--bg-surface-raised` | `#1B2130` | Modals, dropdowns, hovered cards |
| `--border-subtle` | `#252C3D` | Hairline borders, dividers |
| `--text-primary` | `#E9EBF2` | Headings, body |
| `--text-muted` | `#8D95A8` | Captions, meta, timestamps |
| `--accent-accepted` | `#2FD98A` | **Primary accent.** "Accepted" verdict green — CTAs, active states, success, live project status |
| `--accent-accepted-dim` | `#1B9C63` | Hover/pressed state of primary accent |
| `--accent-pending` | `#FFB454` | Secondary accent — "Pending/Judging" amber — in-progress status, resume button, highlights |
| `--accent-wrong` | `#FF6B6B` | Rare/tertiary — "Wrong Answer" coral — used only for destructive dashboard actions and playful hover accents, never as a primary CTA color |
| `--accent-info` | `#6C8CFF` | Links, informational badges (e.g. "IEEE Published") |

### 1.2 Color — Light mode
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#F7F8FA` | Page background — cool off-white, not cream |
| `--bg-surface` | `#FFFFFF` | Cards, panels |
| `--bg-surface-raised` | `#EEF1F6` | Modals, hovered cards |
| `--border-subtle` | `#DFE3EA` | Dividers |
| `--text-primary` | `#12151C` | Headings, body |
| `--text-muted` | `#5B6478` | Captions, meta |
| `--accent-accepted` | `#1BA36C` | Deepened for AA contrast on white |
| `--accent-pending` | `#D98A1F` | Deepened amber |
| `--accent-wrong` | `#E0524F` | Deepened coral |
| `--accent-info` | `#3E5FE0` | Deepened blue |

**Rule:** never invert dark→light by flipping lightness alone. Light mode accents are deliberately deepened/desaturated ~10-15% for AA contrast on white — verify with a contrast checker, don't eyeball it.

### 1.3 Typography
| Role | Face | Notes |
|---|---|---|
| Display (H1/H2, hero) | **Space Grotesk** | Geometric, slightly technical — used at large sizes with tight tracking. This carries the page's personality; don't substitute a generic sans here. |
| Body | **Inter** | All paragraph text, form labels, nav — maximum readability at small sizes |
| Utility / data / code | **JetBrains Mono** | Stats, verdict pills, timestamps, tech-stack tags, terminal sequences, code snippets. This is the literal typeface of a code editor — use it anywhere the content *is* data, not prose. |

**Type scale (rem, 1.25 ratio):**
`text-xs 0.75` · `text-sm 0.875` · `text-base 1` · `text-lg 1.25` · `text-xl 1.563` · `text-2xl 1.953` · `text-3xl 2.441` · `text-4xl 3.052` · `text-5xl 3.815` (hero headline, `text-5xl`+ only on `lg` and up — scale down to `text-3xl` below `md`)

### 1.4 Shape & Elevation
- Radius: `rounded-lg` (0.5rem) default for cards/buttons, `rounded-full` for pills/badges/avatars, `rounded-sm` (0.25rem) only inside code/mono contexts (tags, kbd-style elements) — this radius contrast (soft chrome vs sharp data) is intentional and should be consistent everywhere.
- Elevation via border + subtle shadow, not heavy drop-shadows: `border border-[--border-subtle]` + `shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_8px_24px_-12px_rgba(0,0,0,0.5)]` on dark; lighter equivalent on light mode.
- Spacing scale: 4px base unit (Tailwind default `4/8/12/16/24/32/48/64/96`). Section vertical padding: `py-24` desktop, `py-16` tablet, `py-12` mobile — never less than `py-12` between sections.

---

## 2. The Signature Element: Verdict Pills

Every status anywhere in the product renders as a **judge-verdict pill** — a small rounded-full badge, monospace label, colored dot, uppercase, tight tracking. This is the one bold, memorable device; everything else stays quiet.

```
● ACCEPTED     → live project, current job, published paper     (accent-accepted)
● PENDING      → in-progress project, ongoing training          (accent-pending)
● TLE          → planned/future improvement item                (text-muted, outlined only)
● WA           → deprecated/archived (dashboard-only, rare)     (accent-wrong)
```

**Where it's used, always with real meaning (never decorative):**
- Project cards: status badge in the corner uses this pill instead of a generic "Live/WIP" tag.
- Experience/timeline: current role gets an `ACCEPTED` pulse-dot pill; past roles are unbadged.
- Skills: instead of a plain percentage bar, render as **"`72/100 test cases passed`"** in `JetBrains Mono`, with the fill bar colored by tier (⩾85 accepted-green, 60–84 pending-amber, <60 muted) — this is the section's signature moment, not just a progress bar.
- Publications: `PEER-REVIEWED` pill in `accent-info`.
- Admin dashboard: reuse the exact same pill component for content status (published/draft) — this is what ties the public site and dashboard into one visual language without making the dashboard "playful."

---

## 3. Layout & Signature Moments

### 3.1 Hero — the thesis
On load, run a **one-time terminal boot sequence** (respect `prefers-reduced-motion`: skip straight to end state if set; also skip on repeat visits via a `sessionStorage` flag so it's not annoying):

```
$ whoami
> Md. Nur A Alam — Frontend Engineer · AI Researcher
$ status --check
> [●] Open to Work
```
Typed out at ~35ms/char in `JetBrains Mono`, blinking block cursor, inside a small rounded terminal-window chrome (three dots, not literal macOS traffic lights — use neutral gray dots to avoid the cliché). After typing completes, the professional photo and headline crossfade in beside it. This is the one orchestrated moment — don't scatter equivalent effects elsewhere in the hero.

Resume button sits directly under the headline, styled as a solid `accent-pending` button (ties resume = "pending action" conceptually). If no resume file yet: same visual weight, `disabled` state with `cursor-not-allowed` and a tooltip "Resume coming soon" — never hide it.

### 3.2 Section eyebrows
Every section label is a code-comment-style eyebrow in `JetBrains Mono`, not a generic label:
```
// 02 — experience
// 05 — projects
```
Numbering is justified here because experience and education genuinely are chronological sequences — for non-sequential sections (About, Contact) drop the number, keep the `//` comment style only.

### 3.3 Experience & Education — commit timeline
Render as a vertical timeline where each entry's marker is a short monospace hash-style tag (e.g. `#a3f1c9`) instead of numbered circles — nods to git commit history, which is both on-brand and avoids the generic "01/02/03" timeline default. Connecting line uses `--border-subtle`; the current/active entry's node glows with `--accent-accepted`.

### 3.4 Skills — test suite
Grouped by category as tabs or accordion (`Frontend / Backend / AI-ML / Database / Tools`), each skill row is the "test cases passed" bar described in Section 2. Categories can be visualized additionally as a `recharts` radar chart in the section header for an at-a-glance graphical view (package already installed) — the bar list remains the primary, detailed representation.

### 3.5 Projects — verdict cards
Each project card: image top, title, one-line summary, tech-stack tags in small `rounded-sm` mono pills, verdict-status pill top-right corner, "View Details →" as a text link that reveals an underline-grow animation on hover (not a full button — keep cards light). Detail page reuses the terminal-chrome motif from the hero for the "Challenges Faced" block, styled like a code comment block (`/* challenge */ ...`).

### 3.6 Blog/Social feed
Post cards feel distinctly warmer/more social than the portfolio proper — slightly larger radius (`rounded-xl`), reaction bar uses actual emoji (not icon-font substitutes) for like/love/haha/sad, comment count in muted mono. This is the one place the "playful" side outweighs "IDE" — deliberate contrast from the rest of the site, since it's social content, not technical content.

### 3.7 Admin Dashboard — deliberately different register
Drop the terminal chrome and playful motion almost entirely. Keep only: the verdict-pill component (for consistency) and the same color tokens/type scale. Everything else is dense, standard admin-panel convention — sidebar drawer, data tables, form panels — because the dashboard's job is speed and clarity for an audience of one (you), not delight for a visitor.

---

## 4. Motion System

| Moment | Treatment |
|---|---|
| Hero load | Terminal boot sequence (Section 3.1), once per session |
| Scroll reveal | Sections fade-up 16px + opacity, staggered ~60ms per child, triggered once via Intersection Observer at 20% visibility |
| Card hover | `translateY(-4px)` + shadow deepen, 150ms ease-out; verdict-pill dot gets a subtle pulse if status is `ACCEPTED`/current |
| Skill bar fill | Animates width from 0 on scroll-into-view, 500ms ease-out, staggered per row |
| Theme toggle | Icon morphs sun↔moon (use `lucide-react` `Sun`/`Moon`, cross-fade + rotate 90°, 200ms) |
| Reaction success | `canvas-confetti` burst (small, 20-30 particles, brand colors only — accepted-green + pending-amber) on: successful comment/reaction submission by a newly-authenticated user, resume download click, admin publishing a new post. **Not** on routine navigation — reserve confetti for genuine milestones so it stays a delight, not noise. |
| Reduced motion | All of the above collapse to instant/opacity-only transitions when `prefers-reduced-motion: reduce` is set — this is a hard requirement, not optional polish. |

**Dependency note:** `framer-motion` is not currently in the installed package list (only `canvas-confetti` is). Recommend adding it (`npm i framer-motion`) for the staggered reveals and hero sequence — implementing that choreography in hand-rolled CSS/IntersectionObserver is possible but meaningfully more code for the same result.

---

## 5. Accessibility Floor (non-negotiable)
- All interactive elements have a visible keyboard focus ring using `--accent-accepted` at 2px offset — never `outline: none` without a replacement.
- Color is never the only status signal — verdict pills always carry a text label alongside the color/dot.
- Contrast: body text ≥ 4.5:1, large text/headings ≥ 3:1 in both themes — verify accent-on-surface combinations specifically, since the dark-mode accents are bright and can fail on light surfaces if reused carelessly.
- `prefers-reduced-motion` respected globally (Section 4).
- Guest login-gate messaging ("To do like and comment, please login first.") appears as an inline, focusable, screen-reader-announced element — not a silent tooltip.

---

## 6. Do / Don't Quick Reference
| Do | Don't |
|---|---|
| Use verdict pills only where there's a real status | Scatter colored badges decoratively |
| Use `JetBrains Mono` for data/code only | Set body paragraphs in monospace |
| One orchestrated hero moment | Multiple competing entrance animations per section |
| Deepen accent colors for light mode contrast | Flip dark-mode hex values directly into light mode |
| Keep the dashboard visually calm | Carry hero terminal chrome into the dashboard |
| Reserve confetti for genuine milestones | Fire confetti on routine clicks/navigation |

---

## 7. Self-Critique Checklist (run before finalizing any section)
1. Does this section's color usage encode real information, or is it decoration? If decoration, cut it.
2. Would this design plan be indistinguishable from a generic "developer portfolio" prompt with the CP/verdict framing removed? If yes, push the signature element harder.
3. Is there more than one "loud" animated moment competing for attention in the same viewport? If yes, quiet all but one.
4. Does the light mode look like a straight invert, or a deliberately re-tuned palette? It must be the latter.
5. Screenshot both themes at `sm` and `xl` — does spacing/type scale hold up, or does something feel like an afterthought at the extremes?
