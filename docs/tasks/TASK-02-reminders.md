# Task 02 — Settings, app-specific reminder configuration and preview

**Owner:** Person 2  
**Branch:** `feature/reminders` (team can use established branch names)  
**Read first:** `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/UI_REFERENCE.md`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`  
**UI source:** https://tranquil-jelly-3f1bf4.netlify.app/

## Implementation brief
Own `pages/reminders.html`, `css/reminders.css`, `js/reminders.js`. Recreate Settings hierarchy (App Reminders / App-Specific Settings / General Preferences / Data & Privacy / Help & About as appropriate) and provide an obvious path to Instagram configuration. Toggle reminders; choose 5-minute frequency, vibration and notification style; Preview and Save Changes with success feedback. Persist separate preferences per app. Distinguish settings UI preview from real OS notifications. Coordinate P1's session reminder behavior and P5's Settings nav. Acceptance: Task B passes; refresh preserves Instagram settings; TikTok independent; accessible toggles and labels. Avoid redundant ambiguous settings paths.

## Agent handoff checklist
- [ ] Confirm prototype screens/behaviors observed or note inaccessible states.
- [ ] State files to modify and integration assumptions before coding.
- [ ] Implement mobile-first UI matching reference and documented usability fixes.
- [ ] Test required workflow from Home and edge cases.
- [ ] Provide screenshots (if tooling allows), manual test results and any unverified assumptions.
- [ ] Submit PR without unrelated shared-file edits.
