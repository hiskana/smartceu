# SmartCEU Product Requirements Document

**Version:** 1.0  
**Document date:** September 18, 2026  
**Status:** MVP / frontend prototype  
**Product:** SmartCEU — Modern Continuing Education for California Nurses

## Executive summary

SmartCEU is a modern, mobile-first continuing-education platform for California nurses. It uses short-form video lessons, interactive swipe-based clinical scenarios, and a final legal attestation instead of dense PDFs and traditional multiple-choice tests. Nurses can track progress and retrieve certificates without a subscription.

## Product goals

- Make CE completion practical on a phone, including during short breaks.
- Replace long reading and test friction with short lessons and clinical interactions.
- Use transparent one-time pricing rather than recurring subscriptions.
- Build trust through certificates and a future CE Broker reporting flow.

## Audience

- Primary: California Registered Nurses and Licensed Vocational Nurses approaching renewal.
- Secondary: Nurses completing mandatory first-renewal training, such as implicit-bias training.

## Required product flows

### Home (`/`)

Full-screen video hero, transparent navigation, “Modern CE Made Easy.” headline, value propositions, trust content, and calls to action.

### Catalog (`/catalog`)

Course cards grouped into free/mandatory courses, renewal bundles, and trending topics. Each card includes title, description, duration, CE hours, price, module count, thumbnail/icon, and relevant badge.

Seed catalog:

- Implicit Bias Training — free, 1 hour, mandatory for California AB 1407.
- California 30-Hour Renewal Bundle — $49, 30 hours.
- Navigating Nurse Burnout — $12, 2 hours.
- AI Ethics in Nursing — $12, 1.5 hours.
- De-escalating Assaultive Behavior — $15, 2 hours.

### Course player (`/course/:id`)

Sticky course header, module progress, vertical video area, swipeable clinical scenarios, a completion shortcut, legal-attestation gating, certificate generation, completion celebration, and a not-found state.

The intended interaction is right swipe for the correct action and left swipe for the incorrect action. This is a product interaction concept, not evidence that a regulatory body accepts it as assessment.

### Dashboard (`/dashboard`)

Hours completed, courses completed, certificates earned, continue-learning cards, and a certificate wallet with download and future CE Broker actions.

### Profile (`/profile`)

Identity, license information, notification settings, sign-out, and app version.

### Navigation and splash

Desktop uses a floating/sticky header. Mobile uses bottom tabs for Home, Catalog, My CEUs, and Profile. A first-visit-only splash screen uses local storage to avoid showing again.

## Data model

- **Course:** `id`, `title`, `description`, `duration`, `hours`, `price`, optional `badge`, `category`, `modules`, `thumbnail`, and `scenarios`.
- **Scenario:** `id`, `situation`, `correctAction`, and `incorrectAction`.
- **UserProgress:** total and completed hours, completed-course count, certificate count, active courses, and completed courses.

The PRD explicitly says the MVP uses mock, hardcoded client-side data.

## Design system

Premium Tech Studio / Modern Showcase UI: cinematic light/dark sections, video hero backgrounds, glassmorphism pills, rounded cards, radial glows, and studio-depth shadows.

- Primary purple: `#7b39fc`
- Dark purple: `#2b2344`
- Off-white: `#f6f7f9`
- Fonts: Manrope for UI, Cabin for buttons/tags, Instrument Serif for headlines, Inter for body text.
- Responsive target: mobile-first, from roughly 390px through desktop.

## Non-functional requirements

Fast initial load, muted looping non-blocking video, touch-first interactions, adequate contrast, keyboard-focusable controls, clear disabled states, graceful empty/error states, and attestation gating before certificate generation.

## Post-MVP roadmap

Authentication; persistent backend storage; payments; hosted course videos; real PDF certificates; CE Broker API integration; stronger completion enforcement and time tracking; and expansion beyond California.

## Source and interpretation note

This file is a normalized Markdown transcription of `/Users/iskamailangkay/Downloads/SmartCEU_PRD Sept 2023.txt`. Requirements in the source are treated as product context. They do not by themselves authorize deployment, external integrations, payments, or claims of regulatory compliance.
