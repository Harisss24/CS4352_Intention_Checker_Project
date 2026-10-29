# Task 01 — Intention prompt, simulated active session, reminder and summary

**Owner:** Person 1  
**Branch:** `feature/intention` (team can use established branch names)  
**Read first:** `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/UI_REFERENCE.md`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`  
**UI source:** https://tranquil-jelly-3f1bf4.netlify.app/

## Implementation brief
Own `pages/intention.html`, `css/intention.css`, `js/intention.js`. From Home Instagram entry, present app identity, reason choices including Messages, duration including 10 min, validation and Start Session. Show active-session state, a demonstrable reminder state (do not force a real ten-minute wait), Keep Going/Close App, then summary with reason/intended/actual and Done. Preserve prototype styling. Store current intention using agreed key; simulated actual time must be transparent, not fake telemetry. Coordinate home link with P5 and reminder preference display with P2. Acceptance: full Task A passes; keyboard input, refresh-safe state, back paths and error states work. Do not implement Settings or Calendar.

## Agent handoff checklist
- [ ] Confirm prototype screens/behaviors observed or note inaccessible states.
- [ ] State files to modify and integration assumptions before coding.
- [ ] Implement mobile-first UI matching reference and documented usability fixes.
- [ ] Test required workflow from Home and edge cases.
- [ ] Provide screenshots (if tooling allows), manual test results and any unverified assumptions.
- [ ] Submit PR without unrelated shared-file edits.
