# My Portfolio Architecture Guide

## Project Overview
Nathan Salman's personal portfolio. React + Vite, with a small Tailwind base layer and hand-written CSS for the actual design.

## Where things live
- **Content**: `src/data/portfolioData.jsx` holds `PROJECTS`, `EXPERIENCE`, `SKILLS_DATA`, `NAV_ITEMS`, and `LINKS`. Add new items there, never hardcoded in `App.jsx`.
- **Case study covers and headlines**: `src/data/caseStudyPresentation.js`, keyed by project id.
- **Project previews on the homepage**: `public/projects/<id>.webp`, captured from each case study cover. `thumb.bg` in the presentation file is the image's edge color, used to letterbox it seamlessly. After changing a cover, rerun `node scripts/capture-project-thumbs.cjs` with the dev server on port 5173 and update `thumb.bg` if the cover's background changed. A new project needs a cover, a thumb, and a presentation entry.
- **Routing**: case studies open at `#/projects/<id>` (see `projectFromHash` in `App.jsx`), so browser back and shared links work.
- **Main page styles**: `src/site.css` (design tokens at the top). Case study styles: `src/components/ProjectCaseStudy.css`.

## Design direction (Nov 2026 redesign)
The old glassmorphism / blue-cyan gradient / glow-blob look was removed on purpose because it read as generic AI output. Do not bring it back.
- **Palette**: paper `#f5f6f2`, ballpoint ink `#1a2540`, pencil grey `#5e6675`, rule `#d5d8d0`, optic yellow `#dcef4c`. Dark mode uses navy paper `#131a2a`.
- **One bold device**: the optic-yellow highlighter (a tennis ball, and an analyst marking what matters in a log). Use it sparingly: a couple of facts in the hero, hover on project titles, the headline result number on case studies.
- **Type**: Archivo only. Expanded width (`font-stretch`) and heavy weight for the name and headings, normal width for everything else. No monospace labels, no all-caps eyebrows.
- **Layout**: left-aligned and easy to scan. Projects lead with their own cover image (featured first project, then two columns); experience is a dated list. Avoid grids of identical bordered cards. No gradients, glass blur, drop-shadow glows, or emoji.
- **Motion**: only the hero highlighter swipe on load and hover feedback. No scroll-triggered fade-ins, typing effects, or floating shapes. Respect `prefers-reduced-motion`.

## Writing style
First person, plain verbs, short sentences. No em dashes, no middle-dot separators, no "not just X, it's Y", no words like "production-grade", "high-fidelity", or "leverage". Write date ranges as "Jan to Jun 2026" or "Mar 2026 to now". Keep every fact accurate to the resume; don't invent numbers.
