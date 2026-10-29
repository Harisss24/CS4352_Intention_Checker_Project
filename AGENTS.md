# AI Agent Instructions — Intention Checker

**Read first, for every task.** This is a five-person CS 4352 HCI implementation of ONE integrated mobile-first prototype. **Primary UI/interaction reference: https://tranquil-jelly-3f1bf4.netlify.app/**. Open and inspect the live prototype before implementing UI when browsing is available. Do not claim pixel-perfect fidelity if you cannot access it; use DP3 screenshots and flag uncertainty.

Read `docs/PROJECT_CONTEXT.md`, `docs/UI_REFERENCE.md`, `docs/ARCHITECTURE.md`, then your assigned `docs/tasks/TASK-0X-*.md`. The DP1/DP2/DP3 source files are authoritative for research and test scenarios, not necessarily for every implementation detail. In case of conflict: current approved GitHub issue/team decision > live prototype for appearance and existing interactions > DP3 required tasks > this proposed implementation plan. Flag conflicts rather than silently replacing behavior.

## Non-negotiables
- HTML5, CSS3, vanilla JavaScript; no backend, authentication, database, framework or build step unless team explicitly approves.
- Hardcoded historical data and browser localStorage for editable preferences and demo session state. Never pretend to read real phone usage or control installed apps; simulate app entry and reminders.
- Mobile-first dark green design, consistent bottom navigation and readable touch controls.
- All three required workflows must work end-to-end, including reminder/summary, calendar comparison and insights/action-plan handoff.
- Five team members each own a substantive frontend page; don't rewrite another person's page without coordination.
- Shared files `css/global.css`, `js/data.js`, `js/storage.js`, `js/navigation.js` require coordination/review. Keep page logic and CSS scoped.
- Keep test scenarios reproducible. Never silently change the agreed demo dates or expected values.
- Accessibility: semantic buttons/labels, keyboard support, visible focus, adequate contrast, descriptive statuses; no icon-only controls without accessible names.
- Before claiming completion, run the page through a local server, check console, test acceptance criteria, and report what was tested and any limitations.

## Agent response contract
At start: list intended files and dependencies. At end: summary, changed files, manual tests, screenshots if possible, known limitations, and PR-ready notes. Do not fabricate verification or screenshots.
