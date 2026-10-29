# UI and Interaction Reference — READ BEFORE CODING

## Source of truth
**LIVE PROTOTYPE: https://tranquil-jelly-3f1bf4.netlify.app/**. Inspect each relevant screen at mobile viewport and take your own notes on typography, spacing, borders, icons, states, colors, transitions and controls. The linked prototype is the most important UI reference. DP3 slides 13–15 and reference document pages 22–25 contain supporting screenshots, not a complete style specification. No verified CSS color hex codes, exact fonts or dimensions have been extracted; do not invent and claim them as exact.

## Observed visual language from provided screenshots
- Narrow phone-like canvas, dark near-black/forest-green backgrounds, brighter green highlights and selected states.
- Rounded panels/cards, subtle borders, compact stacked sections, bottom navigation: **Home, Calendar, Insights, Settings**.
- Home: Today's Usage progress, Most Used Apps (Instagram/TikTok/YouTube), View Calendar and Insights shortcuts, gear.
- Calendar: month heading with previous/next, date grid, colored indicators for within time / exceeded time / no usage.
- Insights: usage-by-time-of-day chart and Next progression.
- Settings: App Reminders, App-Specific Settings, General Preferences, Data & Privacy, Help & About.
- Additional screens: intention prompt, active session/reminder, session summary, day/session details, comparison, action plan.

## Required fidelity checklist
- Preserve overall hierarchy, bottom navigation and consistent active tab.
- Recreate the *interactions*, not just static screenshots; support back/return flows.
- Do not arbitrarily add unrelated features, large analytics dashboards, sign-in, advertisements or extra onboarding.
- Make clickable targets legible and obvious. Add visible labels for settings/reminders and compare where the prototype was confusing.
- Keep color legend paired with text; never rely solely on green/orange to convey results.
- Respect small mobile viewport and desktop phone-frame preview if practical.

## Suggested manual prototype inspection checklist
1. Home → Instagram → Messages → 10 min → Start Session → reminder → Close App → Summary → Done.
2. Home → Settings gear → App-Specific Settings → Instagram → enabled → frequency → notification style → Preview → Save.
3. Calendar → Oct 15 → Instagram → Oct 14 (and optionally Oct 12) → Instagram → Compare → View Insights → Next → Action Plan → Settings.

If prototype is unreachable, use provided screenshots and report unverified states explicitly.
