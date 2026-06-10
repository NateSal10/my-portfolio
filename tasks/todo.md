# Portfolio Redesign — Editorial-Technical Overhaul (2026-06-10)

## Goal
Replace the "AI gradient" look (blue→cyan gradient text, glow blobs, emoji toggles,
rainbow per-project gradients) with a restrained editorial-technical design system,
using real framer-motion animation. All content/info unchanged.

## Plan / Status
- [x] Design system: Space Grotesk + Inter + JetBrains Mono, single accent color, hairline rules, film grain
- [x] Tailwind `darkMode: "class"` + `dark:` variants (replaces `dm` prop threading)
- [x] Split monolithic App.jsx into `src/components/*` + `src/components/ui/*`
- [x] Hero: masked line reveals, rotating role (AnimatePresence), offset photo frame, ruled stats
- [x] Projects: editorial index rows with stagger reveal, hover arrow rotation
- [x] Experience/Skills: ruled grid rows
- [x] Contact: underline inputs, ruled contact list (Formspree logic unchanged)
- [x] ProjectPage: ruled stats strip, pipeline chips, definition-list tech details, numbered outcomes
- [x] Lint + build green; verified dark & light modes in preview
- [x] Case study v2 (user feedback "too simple"): ghost index watermark, terminal
      readout card (data-derived) for projects without screenshots, browser-chrome
      frames + featured hero shot, animated pipeline with flowing pulse dots,
      count-up stats, sticky TOC with scroll-spy, numbered sections, hover-lift
      feature cards, next-project footer navigation
- [ ] User reviews preview → approve → push

## Notes
- `motion` must be imported as `Motion` (ESLint flags member-expression JSX usage)
- Old `color` gradient field in portfolioData is intentionally unused by the UI now
