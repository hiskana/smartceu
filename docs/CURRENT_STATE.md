# SmartCEU current state

Updated November 9, 2026.

The app is a local learning preview for California PTs and LVNs. Home uses two large profession tiles; the catalog carries that selection. A floating FAQ helper provides prewritten answers throughout the app.

The de-escalation preview has three text sections, adjustable reader text and dark mode, scored practice responses with feedback, learner evaluation, acknowledgement, a downloadable text completion record, and a dashboard using actual browser-local progress. Stored data is versioned and validated. It does not sync across devices or verify identity.

The preview awards zero CE contact hours. It is a short draft, not a completed two-hour course. Clinical review, applicable provider approval, secure accounts, backend completion records, payments, administrative record retention and qualifying certificate issuance remain future work.

Build and TypeScript checks pass. Six automated tests cover the learner flow, storage failures, FAQ interactions and profession routing. ESLint reports zero errors and seven existing hot-reload warnings. Mobile browser layout and tile routing were checked; physical-phone testing remains outstanding.

The PRD and original build report are historical planning documents, not proof of implemented or approved CE features. See CODE_REVIEW_AND_FIRST_FLOW.md for the implementation review; later UI work simplified Home and added the FAQ helper. Homepage portraits are generated illustrations, not real instructors.

## Connected learner journey

The catalog now opens `/courses/de-escalation`, a course-details page with objectives, outline, completion rules, source and review status. New learners see Start free preview; active learners see Continue learning; completed learners can review and retrieve their record. The reader remains at `/course/de-escalation` for existing links. Home includes the short how-it-works dialog and a browser-local unfinished-activity card. Opening the reader is now remembered, and practice/reflection stages survive reopening. The reader links back to details and onward to My learning after completion.

Eleven automated tests pass, including Home → LVN catalog → details → reader, saved-practice review, completion gating, storage recovery, FAQ navigation and download gating. Mobile details and completed-learner navigation were browser-checked. This completes the local preview journey; it does not complete clinical review, approved course production, authentication, payments or server records.
