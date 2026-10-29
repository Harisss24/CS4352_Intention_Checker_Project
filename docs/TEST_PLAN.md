# Cross-page Acceptance Tests

Use a local server (e.g. VS Code Live Server or `python -m http.server 8000`). Start at `index.html`; do not navigate directly to inner pages during acceptance testing.

## Test A — simple
From Home select Instagram; select Messages and 10 minutes; Start Session; see simulated active session/reminder; choose Close App; inspect summary with reason/intended/actual and Done; return home. Missing inputs must block start and explain why. Refresh should not crash.

## Test B — moderate
Home → Settings → App-Specific Settings/Reminder Settings → Instagram. Enable reminders, set 5-minute frequency, turn vibration on, optionally preview, save. Refresh and reopen Instagram; same values persist. Switch to TikTok and confirm per-app settings are independent. Disabled state should not silently erase selected preferences.

## Test C — complex
Home → Calendar → October 2026 → October 14 → Instagram session details; return → October 15 → Instagram session details; compare both and identify which has larger `actualMinutes - intendedMinutes`. Confirm compare affordance is visible; inspect insights → action plan → settings. Include no-usage date and month-switch checks.

## Regression and UX checks
- Home, Calendar, Insights, Settings nav works from every page and active tab is correct.
- Back and Done buttons do not trap users.
- Touch targets, font size, icons, labels and focus are usable on narrow mobile screens.
- Calendar status legend text matches session values.
- Browser storage is not necessary to view hardcoded historical fixtures.
- Browser console is clear of uncaught errors.
- Simulated reminders and fake phone usage are explicitly recognizable as demo behavior.

## Source caveat
DP3 reviewer walkthrough names Oct 12 and Oct 15; task card names Oct 14 and Oct 15. The user-testing scenario uses 14/15; keep 12 if possible for prototype parity.
