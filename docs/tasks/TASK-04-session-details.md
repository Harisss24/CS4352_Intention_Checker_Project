# Task 04 — Session detail, comparison, insights and action plan

**Owner:** Person 4  
**Branch:** `feature/session-details` (team can use established branch names)  
**Read first:** `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/UI_REFERENCE.md`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`  
**UI source:** https://tranquil-jelly-3f1bf4.netlify.app/

## Implementation brief
Own `pages/session-details.html`, `css/session-details.css`, `js/session-details.js`. Render selected session app/date/reason/intended/actual/difference. Provide a clearly labeled Compare action and selection of a second session from a different date (including calendar return path); side-by-side comparison of Oct 14 and 15 and clear statement of which exceeded more. Provide View Insights → Next → Action Plan → Go to Settings, preserving prototype journey. Use shared data; compute overrun as actual minus intended, handle negative/zero. Coordinate P3's ID/return contract, P2's Settings link. Acceptance: full Task C from calendar through settings; comparison discoverable without instructions; values correct; invalid ID handled gracefully. Do not own calendar date grid.

## Agent handoff checklist
- [ ] Confirm prototype screens/behaviors observed or note inaccessible states.
- [ ] State files to modify and integration assumptions before coding.
- [ ] Implement mobile-first UI matching reference and documented usability fixes.
- [ ] Test required workflow from Home and edge cases.
- [ ] Provide screenshots (if tooling allows), manual test results and any unverified assumptions.
- [ ] Submit PR without unrelated shared-file edits.
