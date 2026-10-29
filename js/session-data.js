/* Session-details sample history; page-scoped until the team approves a shared IC_DATA.
   Field names follow the session schema in docs/ARCHITECTURE.md so the fixtures can move
   into js/data.js unchanged. Oct 14/15 are the DP3 Task 3 fixture; Oct 12 matches the
   live prototype walkthrough. Oct 14 values were chosen by the Task 4 owner (pending team review). */
window.IC_SESSION_DATA = Object.freeze({
  apps: Object.freeze([
    Object.freeze({ id: "instagram", name: "Instagram", badge: "Ig" }),
    Object.freeze({ id: "tiktok", name: "TikTok", badge: "Tk" }),
    Object.freeze({ id: "youtube", name: "YouTube", badge: "▶" })
  ]),
  sessions: Object.freeze([
    Object.freeze({
      id: "ig-2026-10-15-a",
      appId: "instagram",
      date: "2026-10-15",
      startedAt: "14:30",
      reason: "Messages",
      intendedMinutes: 10,
      actualMinutes: 28,
      note: "Checked DMs and ended up scrolling"
    }),
    Object.freeze({
      id: "ig-2026-10-14-a",
      appId: "instagram",
      date: "2026-10-14",
      startedAt: "19:40",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 24,
      note: "Watched Reels after dinner and lost track of time"
    }),
    Object.freeze({
      id: "ig-2026-10-12-a",
      appId: "instagram",
      date: "2026-10-12",
      startedAt: "20:10",
      reason: "Just checking",
      intendedMinutes: 15,
      actualMinutes: 12,
      note: "Quick scroll before bed"
    })
  ])
});
