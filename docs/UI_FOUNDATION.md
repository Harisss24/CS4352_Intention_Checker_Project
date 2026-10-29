# Dashboard and shared UI integration

This local implementation covers Task 05. Other owners' workflows are intentionally represented by labeled handoff pages, not implemented flows. Replace the handoff HTML when integrating your page.

## Reference and decisions

The live prototype HTML/CSS was retrieved on October 29, 2026. Its dark-mode palette is #121813 background, #1c241e surface, #e8efe9 text, #2f9e5a progress, and #233a2a selected surface. System fonts, rounded cards, the Home hierarchy, app badges and four navigation destinations follow that source. Muted text, interactive green, touch targets and navigation labels are enlarged/brightened for readability. Settings has a visible text label.

The prototype's total (84 minutes) conflicts with its app rows (42 + 25 + 12 = 79). Home shows 79 minutes against the same 120-minute reference. Its date is explicitly a fixed demo day, October 15, 2026, not the current clock date. Recent activity reproduces the prototype's October 15 Instagram session (10 intended, 28 actual, 18 over) and is included in Instagram's 42-minute aggregate. The other 14 minutes are aggregate sample usage, not an invented historical session.

No DP3 screenshots are present in this checkout. The live dark prototype was subsequently rendered and visually compared in Edge; the screenshots preserve both versions for review. No pixel-perfect fidelity is claimed.

## Reuse on each page

Load ../css/global.css, then your scoped page stylesheet. Load ../js/navigation.js with defer. Add body data-page="calendar", "settings", or "insights"; Home uses "home". Intention may use "intention" with no active main tab. Add a nav element with class="bottom-nav", data-bottom-nav, and aria-label="Main navigation". Wrap header, main and nav in .app-shell; use .page-header and .page-content. Keep the skip link and main id="main" tabindex="-1".

Navigation exposes window.IC_NAV.href(page, params), icon(name), and render(activePage). Destinations are home, intention, calendar, insights and settings. Routes resolve from navigation.js, so nested pages never need different route prefixes. Insights maps to session-details.html?view=insights. Call render("insights") if changing the view without a page load. All icons are decorative SVGs; visible labels provide accessible names.

Reusable classes: .card, .button, .button-secondary, .button-quiet, .muted, .notice. CSS variables in global.css define colors, spacing, typography and radius. Buttons and links have visible keyboard focus and at least 44px touch controls. Style page content under a page class, as dashboard.css does. Do not override shared tokens or navigation rules without shared-file review.

## Data ownership and pending coordination

No shared data.js or storage.js was created or modified. dashboard-data.js is an immutable, explicitly scoped view fixture. The shared integrator should replace this adapter with approved IC_DATA totals after agreeing on demo-day behavior and whether completed demo sessions affect Home. Current Home does not read or write localStorage.

PROJECT_STRUCTURE.md proposes different field names and storage keys from docs/ARCHITECTURE.md. Dashboard routing follows the latter and does not establish a competing shared schema. Team review must resolve that conflict before shared data/storage integration. Preserve the October 14/15 comparison scenario; no October 14 expected value was supplied, so this task creates none.

## PR notes

Suggested title: Implement Dashboard and reusable mobile navigation foundation

Scope: mobile-first dark green Home, coherent sample totals, app-entry links, recent activity, Calendar/Insights shortcuts, discoverable Settings, reusable tokens/buttons/icons/navigation, and replacement-ready route handoffs. No dependencies, build, framework, backend, OS app control or native reminders.

Review shared global.css and navigation.js with all page owners before merge. Handoff pages are integration scaffolds and should be replaced by their owners. End-to-end session, reminder and comparison acceptance remains blocked until those pages are integrated.

## Verification performed October 29, 2026

Served with Python's static HTTP server at 127.0.0.1:8000. Automated headless Microsoft Edge checks passed for: Home HTTP/rendering; 79-minute aggregate and progress; all three app query parameters; all four bottom-navigation destinations from nested routes; active-tab labels; Calendar's fixed demo-date shortcut; header Settings; recent-session ID; reload; keyboard skip-link/main focus; navigation touch heights of at least 44px; and no horizontal overflow at widths 320, 393, 768 and 1440. No page errors or error-level browser console messages occurred in the final run. With JavaScript disabled, app links and the explanatory noscript message remain available.

JavaScript syntax checks passed for all three scripts. git diff --check passed (new files were still untracked). Browser test tooling was installed outside the repository in the temporary directory; the application itself has no runtime dependencies or build step.

Screenshots: screenshots/dashboard-mobile.png (393px full-page capture), screenshots/dashboard-desktop.png (1440px), screenshots/reference-prototype-dark.png (live dark prototype). The live reference was rendered in Edge and visually inspected alongside Home. A full-page screenshot captures sticky navigation at its viewport position; content behind it remains available by scrolling.

Not verified: physical-device touch, screen-reader announcements, or complete DP3 session/reminder/calendar workflows. Those workflows require the four owners' implementations. Keyboard focus, responsive geometry and routes were browser-automated rather than human manual acceptance. No pixel-perfect claim.
