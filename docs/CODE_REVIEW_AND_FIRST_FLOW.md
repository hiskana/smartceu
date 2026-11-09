# Focused review and first working course flow

November 9, 2026 · Branch: codex/first-course-flow

## Review findings and disposition

- High: course completion bypassed instruction and learning checks. Both swipe directions advanced, and Skip to completion opened attestation. Replaced the placeholder player with a text reader, three scored practice checks, learner evaluation and attestation. Completion requires all sections marked read and all checks correct. This is a preview interaction, not proof of regulated participation.
- High: certificate generation only changed screen state; dashboard hours and certificates were hardcoded. Replaced with actual browser-local progress and a downloadable text completion record explicitly awarding zero CE hours. Real certificates need verified learner identity, approval details and server-authoritative completion records.
- High: Home approval badges, implied customer counts and metadata overstated readiness. Replaced with preview/review-pending language. Catalog now lists only the implemented preview; other course URLs show an unavailable state. Old seed data remains unused historical prototype material, not published offers.
- Medium: profile data/settings are mock. Added a clear sample-account notice; authentication remains future work.
- Medium: storage failures could crash splash initialization. Guarded splash access; learning storage uses a versioned schema, handles malformed/unavailable storage and warns on save failures. Browser storage is editable, device-specific and unsuitable as an authoritative CE record.
- Medium: existing lint errors in command/textarea type declarations and Tailwind CommonJS import prevented clean checks. Corrected them; seven existing hot-reload warnings remain.
- Performance: production bundle is about 551 kB minified and logo about 2.1 MB. Route splitting and image optimization remain follow-up work; they do not justify replacing the app.

## Implemented slice

Catalog → de-escalation preview → three reading sections → open-book practice with explanations and section links → usefulness rating and optional feedback → participation acknowledgement → completion record → dashboard and re-download.

Reader includes adjustable text size and dark mode. Selected section, answers, attempts, evaluation and completion survive reloads in the same browser. Completion is idempotent; no CE hours or fake certificate identifiers are issued. Notes/evaluation remain local, not sent to Matthew or any service. Reader display preferences are session-only.

Content is a short original draft informed by NICE NG10 de-escalation recommendations, with its source linked in the reader. It is not a two-hour course, California-specific clinical guidance, approved CE, or a substitute for facility training. Matthew/qualified clinical review and a full curriculum remain necessary.

Source: https://www.nice.org.uk/guidance/ng10/chapter/recommendations

## Validation

- TypeScript check passed.
- Production build passed; bundle-size advisory remains.
- Vitest: four tests passed, including the full gated learner flow and dashboard, wrong-answer retry, persistence/remount, invalid storage, incomplete completion rejection, storage-write failure and unavailable courses.
- ESLint: zero errors; seven pre-existing React hot-reload warnings.
- Desktop browser: completed all sections/checks/evaluation, saw completion, navigated to dashboard and verified the stored result. Screenshot: first-course-dashboard.png.
- Physical-phone layout, actual file download and cross-device behavior were not browser-tested. Download implementation creates a plain-text preview record. No paid or regulatory workflow was tested.

## Next implementation boundary

Before qualifying CE: clinical review and complete instruction; confirmed provider/evaluation requirements; real learner accounts; backend progress and attempt records; payment entitlements; approved certificate format and issuance; administrative records/backups and end-to-end release testing.

Local preview: http://127.0.0.1:8081/course/de-escalation . No deployment or external accounts changed. Pre-existing README/docs changes were preserved.
