

# Plan: Generate SmartCEU PRD in DOCX Format

## Overview
Create a professional Product Requirements Document for the SmartCEU app — a continuing education platform for California nurses — and output it as a downloadable `.docx` file.

## Document Structure
1. **Cover page** — Title, version, date
2. **Executive Summary** — One-paragraph overview
3. **Product Vision & Goals** — Target audience, problem statement, value proposition
4. **User Personas** — Primary user (CA nurse)
5. **Feature Requirements** — All current features organized by page/flow:
   - Landing/Home page
   - Course Catalog (categories: Mandatory, Bundles, Trending)
   - Course Player (video player, swipeable scenarios, attestation, certificate generation)
   - Dashboard/Progress (stats, active courses, certificate wallet)
   - Profile (identity, settings, license info)
   - Splash screen (first-visit animation)
   - Navigation (desktop floating bar, mobile bottom nav)
6. **Information Architecture** — Page map and routing
7. **Data Model** — Course, Scenario, UserProgress structures
8. **Non-Functional Requirements** — Performance, responsive design, accessibility
9. **Future Considerations** — Auth, backend, payments, CE Broker integration

## Technical Approach
- Use `docx` (npm) to generate the document via a Node.js script
- Professional styling with custom heading styles, tables, and bullet lists
- Output to `/mnt/documents/SmartCEU_PRD.docx`
- QA by converting to images and inspecting

