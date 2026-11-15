/* Fixed late-October/November samples added for calendar exploration; original fixtures preserved.
   Session-details sample history; page-scoped until the team approves a shared IC_DATA.
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
    Object.freeze({"id": "in-2026-10-18-sample", "appId": "instagram", "date": "2026-10-18", "startedAt": "16:10", "reason": "Messages", "intendedMinutes": 10, "actualMinutes": 8, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "yo-2026-10-22-sample", "appId": "youtube", "date": "2026-10-22", "startedAt": "19:00", "reason": "Learning", "intendedMinutes": 30, "actualMinutes": 35, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "ti-2026-10-27-sample", "appId": "tiktok", "date": "2026-10-27", "startedAt": "12:30", "reason": "Entertainment", "intendedMinutes": 15, "actualMinutes": 23, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "in-2026-10-30-sample", "appId": "instagram", "date": "2026-10-30", "startedAt": "18:15", "reason": "Create content", "intendedMinutes": 20, "actualMinutes": 18, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "in-2026-11-02-sample", "appId": "instagram", "date": "2026-11-02", "startedAt": "09:20", "reason": "Messages", "intendedMinutes": 10, "actualMinutes": 9, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "ti-2026-11-04-sample", "appId": "tiktok", "date": "2026-11-04", "startedAt": "17:45", "reason": "Entertainment", "intendedMinutes": 15, "actualMinutes": 31, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "yo-2026-11-07-sample", "appId": "youtube", "date": "2026-11-07", "startedAt": "14:00", "reason": "Learning", "intendedMinutes": 30, "actualMinutes": 24, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "in-2026-11-09-sample", "appId": "instagram", "date": "2026-11-09", "startedAt": "20:10", "reason": "Friends", "intendedMinutes": 15, "actualMinutes": 22, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "in-2026-11-12-sample", "appId": "instagram", "date": "2026-11-12", "startedAt": "13:15", "reason": "Messages", "intendedMinutes": 10, "actualMinutes": 10, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "yo-2026-11-14-sample", "appId": "youtube", "date": "2026-11-14", "startedAt": "18:30", "reason": "Entertainment", "intendedMinutes": 20, "actualMinutes": 32, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "ti-2026-11-19-sample", "appId": "tiktok", "date": "2026-11-19", "startedAt": "16:40", "reason": "Friends", "intendedMinutes": 10, "actualMinutes": 8, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "in-2026-11-23-sample", "appId": "instagram", "date": "2026-11-23", "startedAt": "11:30", "reason": "Create content", "intendedMinutes": 20, "actualMinutes": 17, "note": "Fixed sample session for calendar exploration."}),
    Object.freeze({"id": "yo-2026-11-28-sample", "appId": "youtube", "date": "2026-11-28", "startedAt": "21:00", "reason": "Entertainment", "intendedMinutes": 30, "actualMinutes": 45, "note": "Fixed sample session for calendar exploration."}),
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
    }),
    Object.freeze({
      id: "ig-2026-10-08-a",
      appId: "instagram",
      date: "2026-10-08",
      startedAt: "21:40",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 27,
      note: "Explore page kept pulling me in"
    }),
    Object.freeze({
      id: "ig-2026-10-03-a",
      appId: "instagram",
      date: "2026-10-03",
      startedAt: "19:15",
      reason: "Friends",
      intendedMinutes: 10,
      actualMinutes: 14,
      note: "Caught up on friends' stories"
    }),
    Object.freeze({
      id: "ig-2026-09-27-a",
      appId: "instagram",
      date: "2026-09-27",
      startedAt: "13:05",
      reason: "Create content",
      intendedMinutes: 15,
      actualMinutes: 15,
      note: "Posted weekend photos and closed the app"
    }),
    Object.freeze({
      id: "tt-2026-10-15-a",
      appId: "tiktok",
      date: "2026-10-15",
      startedAt: "12:20",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 25,
      note: "Lunch break videos ran past the break"
    }),
    Object.freeze({
      id: "tt-2026-10-13-a",
      appId: "tiktok",
      date: "2026-10-13",
      startedAt: "17:30",
      reason: "Messages",
      intendedMinutes: 5,
      actualMinutes: 6,
      note: "Replied to a shared video"
    }),
    Object.freeze({
      id: "tt-2026-10-10-a",
      appId: "tiktok",
      date: "2026-10-10",
      startedAt: "23:05",
      reason: "Entertainment",
      intendedMinutes: 30,
      actualMinutes: 52,
      note: "Late-night scrolling in bed"
    }),
    Object.freeze({
      id: "tt-2026-10-06-a",
      appId: "tiktok",
      date: "2026-10-06",
      startedAt: "12:45",
      reason: "Friends",
      intendedMinutes: 10,
      actualMinutes: 9,
      note: "Watched videos a friend sent"
    }),
    Object.freeze({
      id: "tt-2026-10-02-a",
      appId: "tiktok",
      date: "2026-10-02",
      startedAt: "22:50",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 41,
      note: "Meant to wind down, kept watching"
    }),
    Object.freeze({
      id: "tt-2026-09-29-a",
      appId: "tiktok",
      date: "2026-09-29",
      startedAt: "22:30",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 34,
      note: "Autoplay after finishing homework"
    }),
    Object.freeze({
      id: "yt-2026-10-15-a",
      appId: "youtube",
      date: "2026-10-15",
      startedAt: "08:15",
      reason: "Entertainment",
      intendedMinutes: 15,
      actualMinutes: 12,
      note: "One video with breakfast"
    }),
    Object.freeze({
      id: "yt-2026-10-11-a",
      appId: "youtube",
      date: "2026-10-11",
      startedAt: "21:15",
      reason: "Entertainment",
      intendedMinutes: 30,
      actualMinutes: 38,
      note: "Recommended videos after the episode ended"
    }),
    Object.freeze({
      id: "yt-2026-10-09-a",
      appId: "youtube",
      date: "2026-10-09",
      startedAt: "15:10",
      reason: "Create content",
      intendedMinutes: 30,
      actualMinutes: 22,
      note: "Uploaded a class project video"
    }),
    Object.freeze({
      id: "yt-2026-10-05-a",
      appId: "youtube",
      date: "2026-10-05",
      startedAt: "20:30",
      reason: "Entertainment",
      intendedMinutes: 30,
      actualMinutes: 44,
      note: "Gaming streams ran long"
    }),
    Object.freeze({
      id: "yt-2026-10-01-a",
      appId: "youtube",
      date: "2026-10-01",
      startedAt: "18:00",
      reason: "Entertainment",
      intendedMinutes: 30,
      actualMinutes: 26,
      note: "Watched a full episode and stopped"
    })
  ])
});
