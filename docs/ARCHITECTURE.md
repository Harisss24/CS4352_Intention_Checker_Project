# Architecture, Shared Contracts and Integration

## Proposed file layout (team may adjust by agreement)
```text
index.html
pages/intention.html
pages/reminders.html
pages/calendar.html
pages/session-details.html
css/global.css
css/dashboard.css
css/intention.css
css/reminders.css
css/calendar.css
css/session-details.css
js/data.js
js/storage.js
js/navigation.js
js/dashboard.js
js/intention.js
js/reminders.js
js/calendar.js
js/session-details.js
assets/
docs/tasks/
AGENTS.md
README.md
```
Five independently owned frontend pages: Dashboard (P5), Intention (P1), Reminders (P2), Calendar (P3), Session Details/Compare/Insights (P4). Intention owner also implements the simulated active-session/reminder/summary flow. Session owner also implements insights/action-plan continuation. Keep these as views within their pages unless approved otherwise.

## Proposed shared session schema (contract; not extracted verbatim)
```js
{
  id: 'ig-2026-10-15-a',
  appId: 'instagram',
  date: '2026-10-15', // local calendar date YYYY-MM-DD
  startedAt: '14:30', // optional local time HH:mm
  reason: 'Messages',
  intendedMinutes: 10,
  actualMinutes: 28,
  note: 'Checked messages, then started scrolling'
}
```
`js/data.js` owns `window.IC_DATA = { apps: [...], sessions: [...] }` or a team-approved equivalent; all consumers must use the SAME interface. Dates must be parsed as local calendar dates, not blindly `new Date('YYYY-MM-DD')` when timezone might shift day. Include explicit demo sessions for October 14 and 15, with distinguishable overruns and verified expected comparison. Optional Oct 12 record supports the original walkthrough. No real phone telemetry.

## Proposed storage keys
- `ic.currentIntention` — `{appId,reason,intendedMinutes,createdAt}`
- `ic.reminderSettings` — object keyed by appId with `{enabled,frequencyMinutes,vibration,notificationStyle}`
- `ic.demoSessions` — optional array of completed simulated sessions, separate from immutable fixtures
- `ic.compareSessionIds` — optional pair of IDs; URL parameters are preferred for shareable navigation.
Validate values when reading localStorage; fall back to defaults if unavailable/corrupt. For browser-only demos, vibration and notifications are simulated in UI, not promised as OS features.

## Navigation contracts
- `index.html` home/dashboard
- `pages/intention.html?app=instagram` intention flow
- `pages/reminders.html?app=instagram` reminder configuration
- `pages/calendar.html?date=2026-10-15` calendar/day view
- `pages/session-details.html?id=ig-2026-10-15-a` detail
- `pages/session-details.html?compare=ID1,ID2` comparison
- `pages/session-details.html?view=insights` insights/action plan (or documented local view state)
Use correct relative paths from root vs pages. No page should require navigating directly to a hidden URL to complete tasks.

## Shared ownership and integration
- Person 5: `index.html`, dashboard CSS/JS; steward `css/global.css` and `js/navigation.js`.
- Person 1: intention HTML/CSS/JS and session simulation.
- Person 2: reminders HTML/CSS/JS and settings subsections.
- Person 3: calendar HTML/CSS/JS and date/session list.
- Person 4: session-details HTML/CSS/JS and comparison/insights/action plan.
- Shared `js/data.js`, `js/storage.js`: agree on schema before parallel coding; one designated integrator owns changes and others propose edits through PRs.

## Definition of done
Local static server serves every page; no broken links/console errors; primary mobile viewport usable; keyboard/tab and focus work; all three scripted task flows pass; data comparisons are mathematically correct; localStorage survives refresh; no claims of real native app control; PR includes screenshots and manual test results.
