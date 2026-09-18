# Plan: SmartCEU PRD as a Downloadable Text File

## Overview
Generate a Product Requirements Document for SmartCEU (continuing education platform for California nurses) as a plain `.txt` file the user can download, saved to `/mnt/documents/SmartCEU_PRD.txt`.

## Document Contents
Written in clean plain-text formatting (section dividers, indentation, no markdown-only syntax):

1. **Title block** — App name, version, date
2. **Executive Summary** — One-paragraph overview
3. **Product Vision & Goals** — Target audience, problem statement, value proposition
4. **User Personas** — Primary user (CA nurse)
5. **Feature Requirements** — All current features by page/flow:
   - Landing/Home page (video hero, value props, credentials, CTA)
   - Course Catalog (categories: Free/Mandatory, Bundles, Trending)
   - Course Player (video area, swipeable scenario cards, attestation, certificate generation)
   - Dashboard/Progress (stats, active courses, certificate wallet)
   - Profile (identity, settings, license info)
   - Splash screen (first-visit animation via localStorage)
   - Navigation (desktop header, mobile bottom nav)
6. **Information Architecture** — Page map and routing
7. **Data Model** — Course, Scenario, UserProgress structures (from `src/data/courses.ts`)
8. **Design System** — Premium Tech Studio style, fonts (Manrope, Cabin, Instrument Serif, Inter), video hero, tokens
9. **Non-Functional Requirements** — Performance, responsive design, accessibility
10. **Future Considerations** — Auth, backend, payments, CE Broker integration

## Technical Approach
- Write the PRD directly to `/mnt/documents/SmartCEU_PRD.txt` using the file write tool
- Present it in chat as a downloadable artifact
