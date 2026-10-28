# Project Structure & Development Guide

## 1. Directory Structure

The application uses a simple static website architecture with HTML, CSS, and vanilla JavaScript.

```text
intention-checker/
│
├── index.html
│
├── pages/
│   ├── intention.html
│   ├── reminders.html
│   ├── calendar.html
│   └── session-details.html
│
├── css/
│   ├── global.css
│   ├── dashboard.css
│   ├── intention.css
│   ├── reminders.css
│   ├── calendar.css
│   └── session-details.css
│
├── js/
│   ├── data.js
│   ├── storage.js
│   ├── dashboard.js
│   ├── intention.js
│   ├── reminders.js
│   ├── calendar.js
│   └── session-details.js
│
├── assets/
│   ├── images/
│   └── icons/
│
├── README.md
├── PROJECT_STRUCTURE.md
└── .gitignore
```

## 2. File Responsibilities

### HTML Files

| File | Responsibility |
|---|---|
| `index.html` | Main dashboard and navigation |
| `pages/intention.html` | Intention selection and confirmation |
| `pages/reminders.html` | App-specific reminder configuration |
| `pages/calendar.html` | Calendar and session history |
| `pages/session-details.html` | Individual session details and comparison |

### CSS Files

- `global.css` — Shared typography, colors, buttons, navigation, and layout styles.
- Other CSS files — Page-specific styling and responsive layouts.

### JavaScript Files

- `data.js` — Shared hardcoded sample usage data.
- `storage.js` — Shared functions for saving and retrieving browser data.
- `dashboard.js` — Dashboard statistics and recent activity.
- `intention.js` — Intention selection and confirmation.
- `reminders.js` — Reminder configuration and persistence.
- `calendar.js` — Calendar generation and session filtering.
- `session-details.js` — Session lookup, duration calculations, and comparison.

## 3. Shared Data Format

All pages should use a consistent data structure for usage sessions.

Example:

```javascript
const sessions = [
  {
    id: 101,
    app: "Instagram",
    date: "2026-10-20",
    intention: "Check messages",
    intendedDuration: 10,
    actualDuration: 25
  },
  {
    id: 102,
    app: "TikTok",
    date: "2026-10-21",
    intention: "Entertainment",
    intendedDuration: 15,
    actualDuration: 30
  }
];
```

Duration values are stored in minutes.

Session IDs must be unique.

The Calendar and Session Details pages should reference this shared data rather than maintaining separate copies.

## 4. Browser Storage

Use `localStorage` for saving user-generated preferences and intentions.

Recommended storage keys:

| Key | Purpose |
|---|---|
| `intentionChecker.currentIntention` | Most recently confirmed intention |
| `intentionChecker.reminderSettings` | App-specific reminder preferences |

Hardcoded historical sessions can remain in `data.js`.

## 5. GitHub Branching

Each team member should work on a separate feature branch.

| Feature | Branch |
|---|---|
| Intention Checker | `feature/intention-checker` |
| Reminder Settings | `feature/reminder-settings` |
| Calendar | `feature/calendar` |
| Session Comparison | `feature/session-comparison` |
| Dashboard | `feature/dashboard` |

### Development Process

1. Pull the latest changes from `main`.
2. Create or switch to the assigned feature branch.
3. Implement the assigned page.
4. Test the page locally.
5. Commit and push changes.
6. Open a pull request.
7. Request review and merge after approval.

Avoid directly pushing feature implementations to `main`.

## 6. Coding Conventions

### HTML
- Use semantic HTML5 elements.
- Include appropriate labels for interactive controls.
- Use relative paths for CSS, JavaScript, and navigation links.

### CSS
- Place shared styles in `global.css`.
- Place page-specific styles in the corresponding CSS file.
- Maintain consistent colors, spacing, typography, and responsive behavior.

### JavaScript
- Use vanilla JavaScript without additional frameworks.
- Use descriptive variable and function names.
- Keep page-specific logic in its corresponding JavaScript file.
- Use shared data and storage utilities where appropriate.
- Validate user input before saving or processing it.

## 7. Integration Requirements

All five pages must work together as a single application.

- Dashboard links to the primary features.
- Intention Checker saves the confirmed intention.
- Reminder Settings saves preferences independently for each app.
- Calendar displays historical usage sessions.
- Selecting a calendar session opens its details.
- Session Details allows comparisons and navigation back to the calendar.

The Calendar and Session Comparison developers should coordinate on session IDs, data format, and navigation.

## 8. Testing

Before submitting a pull request, verify that:

- The assigned page loads without errors.
- All buttons, forms, and interactive elements work.
- Navigation links point to the correct pages.
- Data is displayed correctly.
- Browser storage works where required.
- The page is usable on the intended screen size.
- No JavaScript errors appear in the browser console.

## 9. Deployment

The application will be deployed as a static website using Netlify.

Changes merged into `main` can be deployed automatically once the GitHub repository is connected to Netlify.
