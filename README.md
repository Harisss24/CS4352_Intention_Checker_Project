# Intention Checker

A mobile-first web app that helps students use social media on purpose instead of out of habit. Before opening an app you say **why** you're opening it and **for how long**, you get reminders during the session, and afterwards you can compare intended vs. actual time and spot patterns.

Built for **CS 4352 – Human Computer Interaction** at the University of Texas at Dallas.

> **This is a prototype.** It does not read real phone usage or control installed apps. App launches, reminders, and "actual" session times are simulated with hardcoded demo data.

---

## Quick start (no installation needed)

You only need a modern web browser (Chrome, Edge, Firefox, or Safari). No Node, no package install, no build step.

### Option 1 — Open the deployed site

> _Netlify link will be added here once the project is deployed._

### Option 2 — Run from the source code

1. **Get the code**
   - **With Git:** `git clone https://github.com/Harisss24/CS4352_Intention_Checker_Project.git`
   - **Without Git:** on the GitHub repo page click **Code → Download ZIP**, then unzip it.
2. **Open `index.html`** in the project folder by double-clicking it (or dragging it into a browser window).
3. That's it. Use the app from the Home screen.

**Tip:** to see the intended phone layout on a computer, open your browser's developer tools (`F12` or `Cmd+Option+I`) and turn on device/responsive mode (for example, iPhone 12/13).

#### Optional: run with a local server

Opening the file directly works. If your browser blocks local files or saved settings don't persist, serve the folder instead. Either option works:

- **VS Code:** install the *Live Server* extension, right-click `index.html` → **Open with Live Server**.
- **Python (preinstalled on macOS/most Linux):** from the project folder run `python3 -m http.server 8000`, then visit <http://localhost:8000>.

Always start from **`index.html` (Home)** instead of opening inner pages directly. The app passes context between pages in the URL.

---

## How the UI works

Every screen has a **bottom navigation bar** (Home · Calendar · Insights · Settings) and a back link. The app is designed for phone width but also works on desktop.

| Screen | File | What it does |
|---|---|---|
| **Home / Dashboard** | `index.html` | Usage overview, list of social apps (Instagram, TikTok, YouTube), shortcuts to Calendar and Insights, recent session, and a Settings button. Tapping an app simulates opening it. |
| **Intention Checker** | `pages/intention.html` | Pick a **reason** (Messages, Friends, Entertainment, Create content) and an **intended duration** (5/10/15/30 min), then **Start Session**. You'll see a simulated active session with a reminder (**Keep going** / **Close App**). Closing shows a **session summary** (reason, intended time, demo actual time). |
| **Reminder Settings** | `pages/reminders.html` | Choose an app, toggle reminders, set the frequency (5/10/15/30 min), and pick notification preferences such as vibration. You can **preview** a reminder and **save**. Each app keeps its own settings. |
| **Calendar** | `pages/calendar.html` | Browse past usage by date. _(Currently a placeholder; see Limitations.)_ |
| **Session Details & Insights** | `pages/session-details.html` | Inspect a session's reason, intended vs. actual time, and **compare** it with another day. **View Insights → Next → Action Plan → Go to Settings** takes you from reflection to changing your reminders. |

### Walkthrough: the three test tasks

These are the scenarios from our usability testing (DP3). Use them to try the app.

1. **Set an intention (simple):** Home → **Instagram** → choose **Messages** → **10 minutes** → **Start Session** → **Close App** → review the summary → **Done**.
2. **Customize reminders (moderate):** Home → **Settings** → **Instagram** → turn reminders **on** → frequency **every 5 minutes** → **vibration on** → **Save**. Refresh the page and reopen Instagram; your settings are still there.
3. **Compare sessions (complex):** Home → **Recent session** (Instagram, Oct 15) → **Compare Sessions** → pick **October 14** → compare intended vs. actual time.
   - Oct 14: 15 min intended → 24 min actual (**+9 min**)
   - Oct 15: 10 min intended → 28 min actual (**+18 min**), so this one went over by more.

---

## Data and storage

- **Historical sessions** are hardcoded in `js/session-data.js` and `js/dashboard-data.js`. They always show the same values, so tests are reproducible.
- **Your choices** (reminder settings, the current intention) are saved in your browser's **localStorage**. They stay on your device only. There are no accounts, server, or database.
- **Reset the demo:** clear the site data in your browser (DevTools → Application → Local Storage → delete the `ic.*` keys), or open the app in a private/incognito window.

---

## Limitations

- **Simulated only:** no real phone usage tracking, app interception, OS notifications, or background timers. "Actual time" in the session summary is a demo estimate.
- **Calendar page not integrated yet:** `pages/calendar.html` currently shows a placeholder. Session comparison works through Session Details and Insights.
- **Not deployed yet:** the Netlify link above is pending.
- **Saved settings are per browser:** they don't sync across devices or browsers and are lost if site data is cleared. Some browsers (notably Safari) may not keep localStorage for files opened via `file://`; use a local server if that happens.
- **Fixed demo apps:** only Instagram, TikTok, and YouTube.

---

## For developers

- **Stack:** HTML5, CSS3, vanilla JavaScript. No framework, no build step, no dependencies.
- **Structure:** `index.html` (Home), `pages/` (other screens), `css/` (`global.css` shared + one stylesheet per page), `js/` (`navigation.js` shared + one script per page + data files), `docs/` (design and task docs, screenshots), `tests/`.
- **Automated tests (optional, requires [Node.js](https://nodejs.org) 18+):**
  ```bash
  node --test tests/reminders-storage.test.cjs
  ```
- **Manual acceptance tests:** see [docs/TEST_PLAN.md](docs/TEST_PLAN.md).
- **Further docs:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/UI_REFERENCE.md](docs/UI_REFERENCE.md), [AGENTS.md](AGENTS.md).
- **Workflow:** create a feature branch, keep page CSS/JS scoped, coordinate changes to shared files (`css/global.css`, `js/navigation.js`), and open a pull request into `main`.
- **Original prototype (design reference):** <https://tranquil-jelly-3f1bf4.netlify.app/>

## Team

| Area | Owner |
|---|---|
| Intention Checker | Person 1 |
| Reminder Settings | Person 2 |
| Usage History Calendar | Person 3 |
| Session Details & Comparison | Person 4 |
| Dashboard & Navigation | Person 5 |
