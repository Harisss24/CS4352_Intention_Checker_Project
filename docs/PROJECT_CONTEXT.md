# Product and Research Context

## Purpose
Intention Checker helps teenagers and student users distinguish intentional social media use from habitual scrolling. The core product idea is **intention → awareness/reminders → reflection**. It is supportive and less restrictive than outright app blocking. Its target is not to eliminate legitimate messaging, education, or content creation.

## Research grounding (DP1 and DP2)
Three needfinding interviews with teenage students revealed boredom/automatic opening, short breaks lasting longer than planned, a mismatch between intended and actual use, and legitimate reasons to use social media. Awareness alone often did not change habits. DP2 selected the Intention Checker idea alongside pattern tracking concepts. Competitor comparison in DP3: Apple Screen Time emphasizes aggregate usage and limits; Forest rewards staying off phones; Intention Checker instead records *why* a session started and compares intended vs actual time.

## Required workflows (DP3)
1. **Simple**: Open a social app entry point → choose reason → choose intended duration → confirm/proceed. The prototype also includes an active-session reminder, Close App and session summary.
2. **Moderate**: Intention Checker → Settings → reminder/app-specific settings → choose app → toggle reminders → set frequency → notification preferences → save. Preview is present in prototype demonstration.
3. **Complex**: Calendar → choose month/date → session list → inspect reason/intended/actual → return to calendar → inspect another date/session → compare sessions and identify patterns. Prototype additionally offers View Insights → Next → Action Plan → Go to Settings.

## Explicit user-testing scenarios (DP3 task cards)
- Task 1: Instagram, **Messages**, **10 minutes**.
- Task 2: Instagram reminders **enabled**, **every 5 minutes**, **vibration on**.
- Task 3: Compare Instagram sessions from **October 14 and 15**, determine which exceeded intended time more.

**Source inconsistency:** DP3 reviewer walkthrough describes October 15 and October 12, whereas the participant task card uses October 14 and 15. Treat October 14/15 as the primary usability-test fixture, optionally support October 12 as additional prototype demo content; do not silently substitute one for the other.

## User testing and usability priorities (DP3)
P1/P2/P3 completed the simple task easily. Participants had trouble discovering reminder settings, distinguishing app selection from settings, locating comparison/calendar, and understanding feature organization. Feedback requested less clutter, bigger labels/icons and clearer chart color coding. Design fixes should improve discoverability without breaking the reference flows.

## Scope
Five-person student team, five frontend ownership areas, primarily hardcoded demo data. Browser-based simulation is sufficient; actual OS interception, native notifications, background timers and true device analytics are out of scope. No personal interviewee identifiers should appear in UI fixtures.

## Source material
- `CS 4352 - Group 1_AI_ReferenceDoc.docx` — consolidated background, demo instructions.
- `DP1 Needs Finding_AI.pptx` — interviews, needs, insights.
- `DP2 - Group One_AI.pptx` — ideation, POV, concept.
- `DP3 - Group One_AI.pptx` — prototype screenshots, required tasks, test cards, findings.
- **Primary live UI:** https://tranquil-jelly-3f1bf4.netlify.app/
