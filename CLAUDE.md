# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

No test suite is configured.

## Architecture

This is a single-page React portfolio site built with Vite and Tailwind CSS. **All application code lives in `src/App.jsx`** — there are no separate route files, component files, or data files.

### Structure of `src/App.jsx`

**Data constants** (top of file):
- `NAV_ITEMS` — section names for navigation
- `PROJECTS` — array of project objects. Each has `featured` (bool) and `noPage` (bool) flags. Featured projects display in a 2-col grid; non-featured in a 3-col grid. Projects with `noPage: true` show "coming soon" and don't navigate to a detail view.
- `EXPERIENCE` — work history entries
- `SKILLS_DATA` — skill categories with icons and item lists

**Components**:
- `FadeIn` — IntersectionObserver wrapper for scroll-triggered opacity/translate animations
- `ProjectPage` — full-screen detail view for a project (overview, problem/solution, architecture pipeline, tech details, outcomes)
- `ContactForm` — simple controlled form with local sent state (no backend — submission is simulated)
- `Portfolio` — main component; renders hero, about, projects, experience, skills, and contact sections

**Routing**: Client-side "routing" is handled by a single `currentPage` state string in `Portfolio`. When set to a project ID, `ProjectPage` renders instead of the main page. React Router is not used.

**Theming**: `darkMode` boolean state lives in `Portfolio` and is passed as the `dm` variable throughout JSX for conditional Tailwind class strings. Default is dark mode (`true`).

**Styling**: Tailwind CSS v3 with utility classes inline on every element. No separate component stylesheets beyond `src/App.css` (minimal global resets) and `src/index.css`.

**Icons**: `lucide-react` — icons are stored directly as JSX in the `PROJECTS` data array (e.g., `icon: <Shield size={28} />`).

### Adding a new project

Add an object to the `PROJECTS` array in `src/App.jsx`. Set `featured: true` to place it in the top 2-col grid, `noPage: true` to disable the detail page link. The `architecture` string uses `→` as a delimiter and is split/rendered as a pipeline visualization.
