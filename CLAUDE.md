# My Portfolio Architecture Guide

## Project Overview
A modern, bento-grid style portfolio web application utilizing React, Tailwind CSS v4, and Framer Motion. 

## Recent Architectural Shifts (Agent Handoff)
- **Data Centralization**: All massive constant data arrays (`PROJECTS`, `EXPERIENCE`, `SKILLS`) have been extracted from `App.jsx` and centralized into `src/data/portfolioData.jsx`. Do not hardcode new project items into the main UI file, simply append them to the exported arrays in the data file.
- **Motion & Layout**: The previously custom `IntersectionObserver` fading elements (`FadeIn`/`TypingText`) have been thoroughly refactored out in favor of declarative `framer-motion` components (`<motion.div>`). 
- **Aesthetics**: Heavy emphasis placed on 21st.dev style glassmorphism designs, deep background blur, gradient borders, and sleek, dynamic layout hover effects. Maintain this visual fidelity for future component additions!
