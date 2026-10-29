# Task 02: reminder settings

Branch: `feature/reminders`, based on `main` at `0d98cbe` (dashboard PR #6 merged). No pull request has been opened; the user requested review of the implementation first.

## Implementation

The Settings destination now provides one clear app-specific reminder list for Instagram, TikTok and YouTube. Each app has enable/disable, 5/10/15/30-minute frequency, sound, vibration and Show In-App switches. Preview displays the current draft without saving it. Save Changes persists only the selected app and reports success or storage failure. Disabling reminders preserves the remaining choices. Unsaved drafts survive in-page app navigation; refresh returns to the last saved preferences. Browser Back/Forward and direct `?app=instagram` routes work.

Observed the live reference on October 29, 2026: Settings hierarchy, app list, Instagram controls and inline Time check preview. This implementation reuses the dashboard's dark green shared styles and navigation. App Reminders and App-Specific Settings are combined into one labeled app list to avoid redundant paths. General Preferences, Data & Privacy and Help & About expand into relevant explanations. Optional prototype Apply to all apps and Quiet Hours are outside this task; no nonfunctional controls were added. Exact pixel fidelity is not claimed.

Source changes are scoped to `pages/reminders.html`, `css/reminders.css` and `js/reminders.js`; no shared files or other owners' pages are changed. Supporting files are this note, dependency-free storage tests, and two screenshots.

## Session-flow handoff

Use `localStorage['ic.reminderSettings']` as proposed in `docs/ARCHITECTURE.md`. It is a JSON object keyed by `instagram`, `tiktok` and `youtube`. Example:

```json
{
  "instagram": {
    "enabled": true,
    "frequencyMinutes": 5,
    "vibration": true,
    "notificationStyle": "in-app"
  }
}
```

`notificationStyle` is `in-app`, `sound`, `sound-and-in-app`, or `silent` (neither sound nor in-app). Vibration is independent, so a vibration-only preference is `silent` with `vibration: true`. Respect `enabled: false` regardless of stored styles. Defaults: enabled, 10 minutes, vibration on, in-app only. Read failures and malformed root objects fall back to defaults with feedback; individual invalid fields fall back independently. Saving re-reads storage and merges the selected app to retain other apps' latest saved preferences.

The older `PROJECT_STRUCTURE.md` proposes a different key; this task follows `docs/ARCHITECTURE.md`, consistent with the dashboard foundation notes. The team should retain this contract when adding shared `storage.js`. No competing shared storage module was introduced.

Preview is an in-page simulation, including descriptions of sound and vibration. It requests no permissions and triggers no device notification, vibration or sound. The Intention owner's future active-session implementation must consume these preferences; that page is a placeholder in this base branch.

## Verification

Served the branch with Python's static server on `127.0.0.1:8767`. Browser checks started from Home, then Settings:

- Instagram: 5 minutes, enabled, vibration on; preview reflected selected values; save feedback appeared; refresh preserved the values.
- Disabled reminders: frequency, notification controls and preview disabled; save/refresh retained 5 minutes and vibration; re-enabling restored the controls.
- TikTok: saved 15 minutes, sound on, vibration off; refresh preserved TikTok; Instagram remained at 5 minutes, vibration on, sound off.
- Unsaved 30-minute draft survived All Settings and reopen; refresh restored the saved 5-minute value.
- Space toggled vibration; turning all styles off displayed explanatory feedback. Preview moves focus to its heading; dismissal returns focus to Preview.
- Browser Back/Forward between overview and app editor worked. Shared Settings navigation remained active.
- No horizontal overflow at 320, 393 and 1440 CSS-pixel test widths. Save control measured over 44px high. Mobile and desktop screens were visually inspected.
- No warning/error browser console messages observed during the tested flow.

`node --test tests/reminders-storage.test.cjs`: seven passing tests covering missing/corrupt/invalid settings, preserving another tab's app settings, disabled preferences, denied reads/writes, all notification-style combinations, and unsupported/prototype-property app IDs. These fault tests run the page script in a minimal DOM harness; blocked storage was not induced in the live browser.

`node --check js/reminders.js` and `git diff --check` passed.

Screenshots: [Settings overview](screenshots/reminders-settings-mobile.jpg), [reminder preview](screenshots/reminders-preview-mobile.jpg). These are viewport captures; scroll to reach remaining controls below the screen.

Not verified: physical-device touch, screen-reader announcements, or active-session consumption of settings. Full Tasks A/C remain dependent on their owners' integrations. App code has no new runtime dependencies or build step.

## Ready for review

Suggested future PR title: Implement per-app reminder settings and simulated preview.

Suggested description: Replace the Settings placeholder with app-specific reminder controls, a simulated preview, and browser persistence. Preserve preferences when reminders are disabled and keep each app independent, with accessible controls and visible save/storage feedback. Validated the Task B browser flow, responsive layouts, JavaScript syntax and seven storage fault tests. Session reminder consumption remains an integration handoff to Task 01.
