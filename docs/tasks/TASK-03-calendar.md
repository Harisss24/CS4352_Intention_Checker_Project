# Task 03 — Interactive calendar and day session list

**Owner:** Person 3  
**Branch:** `feature/calendar` (team can use established branch names)  
**Read first:** `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/UI_REFERENCE.md`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`  
**UI source:** https://tranquil-jelly-3f1bf4.netlify.app/

## Implementation brief
Own `pages/calendar.html`, `css/calendar.css`, `js/calendar.js`. Implement October 2026 and month navigation, accessible date buttons, today/selected states, within/exceeded/no-usage legend with text and color, date-specific session list. Include Oct 14 and Oct 15 Instagram fixtures (optional Oct 12), click through to detail by stable session ID. Return from details to selected date. Coordinate with P4 on query params and P5 on navigation. Acceptance: Task C calendar steps pass; month boundaries and empty dates work; status derives from session data rather than hardcoded colors; no timezone date drift. Do not own comparison rendering.

## Agent handoff checklist
- [ ] Confirm prototype screens/behaviors observed or note inaccessible states.
- [ ] State files to modify and integration assumptions before coding.
- [ ] Implement mobile-first UI matching reference and documented usability fixes.
- [ ] Test required workflow from Home and edge cases.
- [ ] Provide screenshots (if tooling allows), manual test results and any unverified assumptions.
- [ ] Submit PR without unrelated shared-file edits.
