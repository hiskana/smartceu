

# SmartCEU — MVP Implementation Plan

## Design System
- **Dark mode by default** with a rich dark background (deep navy/charcoal)
- **Accent colors**: Electric teal (#00E5CC), soft neon purple (#A855F7), energetic coral (#FF6B6B)
- **Glassmorphism** cards with backdrop-blur, rounded corners (xl/2xl), and subtle borders
- **Typography**: Clean, bold headings with lighter body text for readability
- **Micro-interactions**: Smooth hover/tap animations using CSS transitions and keyframes

## Navigation
- **Mobile bottom tab bar** (Home, Catalog, My CEUs, Profile) with icons — sticky, thumb-friendly
- **Desktop**: Top nav bar with the same links
- Smooth page transitions between routes

## Pages & Features

### 1. Landing Page (/)
- **Hero section**: Bold headline "Ditch the PDFs. Get your CEUs in minutes." with a tilted phone mockup showing a video course preview, glowing accent gradient behind it
- **3-column value props**: Short-Form Video, No Tests Required, No Sneaky Subscriptions — each with an icon and brief description
- **CTA button**: "Start Your First Mandated Course for Free" in electric teal
- **Social proof section**: Simple stats or trust badges (e.g., "BRN Approved", "BVNPT Approved")

### 2. Course Catalog (/catalog)
- **Netflix-style horizontal scroll rows** grouped by category:
  - "Free Mandatory Courses" → 1-Hour Implicit Bias Training ($0, with "Mandatory for CA AB 1407" badge)
  - "Renewal Bundles" → CA 30-Hour Renewal Bundle ($49, "One-Time Fee" badge)
  - "Trending Topics" → Nurse Burnout, AI Ethics in Nursing, De-escalating Assaultive Behavior
- **Course cards**: Glassmorphism style with thumbnail, title, duration, price badge, and a play icon overlay
- Clicking a card navigates to the course detail/learning page

### 3. Learning Interface (/course/:id)
- **Vertical video player** taking ~60% of the screen (mobile-optimized, portrait-oriented placeholder with play controls)
- **Progress bar** at the top showing video/module completion
- **Clinical Scenario Swipe component** below the video:
  - Card with a clinical scenario description
  - Swipe right (correct action) / swipe left (incorrect action) with visual feedback (green glow / red glow)
  - Drag-based interaction with CSS transforms for the swipe animation
- **Attestation checkout** at course completion:
  - Legal attestation checkbox
  - "Instantly Generate Certificate" button with confetti/celebration animation

### 4. User Dashboard (/dashboard)
- **Progress Ring**: Large circular progress indicator showing hours completed (e.g., "1/30 Hours") with animated fill
- **Active Courses**: Cards showing in-progress courses with progress bars
- **Certificate Wallet**: List of completed courses with "Download PDF" and "Send to CE Broker" action buttons
- **Stats row**: Total hours, courses completed, certificates earned

### 5. Profile Page (/profile)
- User info display (name, license type — RN/LVN/Psych Tech, license number)
- Settings placeholder (notifications, dark/light mode toggle)
- Log out button

## Technical Details
- All data will be **mock/hardcoded** for the MVP prototype — no backend needed yet
- **Swipe interaction** built with touch event handlers and CSS transforms (no extra library needed)
- **Animated progress ring** using SVG circle with stroke-dasharray animation
- **Framer Motion** will be added for polished page transitions and swipe card physics
- Fully responsive: mobile-first layout with desktop breakpoint adaptations

