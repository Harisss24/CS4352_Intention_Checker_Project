(() => {
  "use strict";
  const data = window.IC_SESSION_DATA;
  const nav = window.IC_NAV;
  const params = new URLSearchParams(location.search);
  const view = document.getElementById("view");
  const appsById = new Map(data.apps.map(app => [app.id, app]));
  const sessionsById = new Map(data.sessions.map(session => [session.id, session]));
  const DEFAULT_APP = "instagram";

  // ---------- Calculations and formatting ----------

  // Parse YYYY-MM-DD as a local calendar date; new Date("2026-10-15") is UTC and can shift the day.
  function parseDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const formatDate = iso => parseDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const shortDate = iso => parseDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const minutesOfDay = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  function formatClock(total) {
    const minutes = ((total % 1440) + 1440) % 1440;
    const h = Math.floor(minutes / 60);
    return (h % 12 || 12) + ":" + String(minutes % 60).padStart(2, "0") + " " + (h < 12 ? "AM" : "PM");
  }
  const timeRange = s => formatClock(minutesOfDay(s.startedAt)) + " – " + formatClock(minutesOfDay(s.startedAt) + s.actualMinutes);

  // Overrun is actual minus intended: positive = over, zero or negative = within.
  const overrun = s => s.actualMinutes - s.intendedMinutes;
  const status = s => overrun(s) > 0 ? "over" : "within";
  function describeDifference(diff) {
    if (diff > 0) return diff + " min over";
    if (diff < 0) return -diff + " min under";
    return "right on time";
  }
  const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
  const signed = diff => (diff > 0 ? "+" : diff < 0 ? "−" : "") + Math.abs(diff) + " min";

  // Plain-language answer to "which session exceeded its intended time more?"
  function verdict(a, b) {
    const da = overrun(a), db = overrun(b);
    if (Math.max(da, db) <= 0) return "Neither session went over its intended time.";
    if (da === db) return "Both sessions went over by the same amount (" + da + " min).";
    const [more, less] = da > db ? [a, b] : [b, a];
    return shortDate(more.date) + " exceeded its intended time more: " + describeDifference(overrun(more)) +
      ", while " + shortDate(less.date) + " was " + describeDifference(overrun(less)) + ".";
  }

  // Returns [a, b] only for two existing sessions from different dates.
  function parseCompare(value) {
    const ids = (value || "").split(",");
    if (ids.length !== 2) return null;
    const pair = ids.map(id => sessionsById.get(id.trim()));
    if (!pair[0] || !pair[1] || pair[0].date === pair[1].date) return null;
    return pair;
  }

  const DAY_PARTS = [
    { label: "Morning", phrase: "in the morning", from: 5, to: 12 },
    { label: "Afternoon", phrase: "in the afternoon", from: 12, to: 17 },
    { label: "Evening", phrase: "in the evening", from: 17, to: 21 },
    { label: "Night", phrase: "at night", from: 21, to: 29 } // 9 PM – 5 AM, wrapping past midnight
  ];
  function dayPartOf(s) {
    let hour = Math.floor(minutesOfDay(s.startedAt) / 60);
    if (hour < 5) hour += 24;
    return DAY_PARTS.find(part => hour >= part.from && hour < part.to);
  }

  // ---------- Routes (the URL is the view state, so Back, refresh and links all work) ----------

  const selfHref = query => "session-details.html?" + new URLSearchParams(query);
  const routes = {
    details: id => selfHref({ id }),
    pick: id => selfHref({ pick: id }),
    compare: (a, b) => selfHref({ compare: a.id + "," + b.id }),
    insights: compare => selfHref(compare ? { view: "insights", compare } : { view: "insights" }),
    action: (appId, compare) => selfHref(compare ? { view: "action", app: appId, compare } : { view: "action", app: appId })
  };

  // ---------- DOM helpers ----------

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === false || value == null) return;
      if (key === "class") node.className = value;
      else node.setAttribute(key, value === true ? "" : value);
    });
    node.append(...withoutEmpty(children));
    return node;
  }

  // Optional sections are written as `condition && el(...)`; drop the falsy ones so "null" never renders.
  function withoutEmpty(children) {
    return children.flat().filter(child => child != null && child !== false && child !== "");
  }
  const mount = (...sections) => view.append(...withoutEmpty(sections));

  function setView({ page, heading, back }) {
    document.getElementById("page-title").textContent = heading;
    document.title = heading + " · Intention Checker";
    const backLink = document.getElementById("back-link");
    backLink.hidden = !back;
    if (back) {
      backLink.href = back.href;
      document.getElementById("back-label").textContent = " to " + back.label;
    }
    document.body.dataset.page = page;
    nav.render(page);
  }

  const appBadge = app => el("span", { class: "app-icon app-icon-" + app.id, "aria-hidden": "true" }, app.badge);
  const button = (label, href, variant) => el("a", { class: "button" + (variant ? " button-" + variant : ""), href }, label);

  function detailList(rows) {
    return el("dl", { class: "detail-list" }, rows.map(([term, value, className]) =>
      el("div", {}, el("dt", {}, term), el("dd", { class: className }, value))));
  }

  // Intended vs actual as two bars on a shared scale; minutes are always printed as text too.
  function usageBars(s) {
    const scale = Math.max(s.intendedMinutes, s.actualMinutes, 1);
    const bar = (label, minutes, kind) => el("div", { class: "usage-bar" },
      el("span", {}, label),
      el("span", { class: "usage-bar-track", "aria-hidden": "true" },
        el("span", { class: "usage-bar-fill is-" + kind, style: "width:" + (minutes / scale * 100) + "%" })),
      el("span", { class: "usage-bar-value" }, minutes + " min"));
    return el("div", { class: "usage-bars" },
      bar("Intended", s.intendedMinutes, "intended"),
      bar("Actual", s.actualMinutes, status(s)));
  }

  // ---------- Views ----------

  function renderDetails(s) {
    const app = appsById.get(s.appId);
    const diff = overrun(s);
    setView({ page: "calendar", heading: app.name + " Session", back: { href: nav.href("calendar", { date: s.date }), label: "Calendar" } });
    mount(
      el("section", { class: "card", "aria-labelledby": "summary-heading" },
        el("div", { class: "session-app" }, appBadge(app),
          el("div", {}, el("h2", { id: "summary-heading" }, formatDate(s.date)), el("p", { class: "muted" }, timeRange(s)))),
        el("p", { class: "status-pill is-" + status(s) }, capitalize(describeDifference(diff))),
        usageBars(s),
        detailList([
          ["Date", formatDate(s.date)],
          ["Time", timeRange(s)],
          ["Intended time", s.intendedMinutes + " minutes"],
          ["Actual time", s.actualMinutes + " minutes", "is-" + status(s) + "-text"],
          ["Difference", signed(diff) + " (" + describeDifference(diff) + ")", "is-" + status(s) + "-text"],
          ["Reason", s.reason]
        ])),
      s.note && el("section", { class: "card", "aria-labelledby": "notes-heading" },
        el("h2", { id: "notes-heading" }, "Notes"), el("p", { class: "note-text" }, s.note)),
      el("section", { class: "card", "aria-labelledby": "compare-heading" },
        el("h2", { id: "compare-heading" }, "Compare with another day"),
        el("p", { class: "muted section-hint" }, "See whether this session ran over more than one from a different date."),
        button("Compare Sessions", routes.pick(s.id))),
      button("Back to Calendar", nav.href("calendar", { date: s.date }), "quiet"));
  }

  function renderPicker(base) {
    const app = appsById.get(base.appId);
    const candidates = data.sessions
      .filter(s => s.appId === base.appId && s.date !== base.date)
      .sort((a, b) => b.date.localeCompare(a.date));
    setView({ page: "calendar", heading: "Compare Sessions", back: { href: routes.details(base.id), label: "session details" } });
    mount(
      el("section", { class: "card", "aria-labelledby": "pick-heading" },
        el("h2", { id: "pick-heading" }, "Choose a second session"),
        el("p", { class: "muted section-hint" }, "Comparing with " + app.name + " on " + formatDate(base.date) +
          " (" + describeDifference(overrun(base)) + "). Pick a session from a different date."),
        candidates.length
          ? el("ul", { class: "candidate-list" }, candidates.map(s => el("li", {},
            el("a", { class: "card candidate", href: routes.compare(base, s) },
              el("span", { class: "candidate-title" }, formatDate(s.date), el("span", { class: "chevron", "aria-hidden": "true" }, "›")),
              el("small", { class: "muted" }, s.reason + " · " + s.actualMinutes + " of " + s.intendedMinutes + " min"),
              el("small", { class: "is-" + status(s) + "-text" }, capitalize(describeDifference(overrun(s))))))))
          : el("p", { class: "notice" }, "No other " + app.name + " sessions on different dates yet.")),
      button("Find a date in the Calendar", nav.href("calendar", { date: base.date, compareWith: base.id }), "secondary"));
  }

  function compareCard(s, highlighted) {
    const diff = overrun(s);
    return el("section", { class: "card compare-card" + (highlighted ? " is-highlight" : ""), "aria-label": formatDate(s.date) + " session" },
      el("span", { class: "compare-flag" + (highlighted ? "" : " is-placeholder"), "aria-hidden": highlighted ? null : "true" }, "Exceeded more"),
      el("h2", {}, shortDate(s.date)),
      el("p", { class: "compare-diff is-" + status(s) + "-text" }, signed(diff)),
      el("p", { class: "muted" }, describeDifference(diff)),
      usageBars(s),
      detailList([
        ["Reason", s.reason],
        ["Intended", s.intendedMinutes + " min"],
        ["Actual", s.actualMinutes + " min"]
      ]));
  }

  function renderCompare(pair) {
    const [a, b] = pair;
    const da = overrun(a), db = overrun(b);
    setView({ page: "calendar", heading: "Compare Sessions", back: { href: routes.details(a.id), label: "session details" } });
    mount(
      el("section", { class: "card verdict", "aria-labelledby": "verdict-heading" },
        el("h2", { id: "verdict-heading" }, "Result"), el("p", {}, verdict(a, b))),
      el("div", { class: "compare-grid" },
        compareCard(a, da > db && da > 0),
        compareCard(b, db > da && db > 0)),
      button("View Insights", routes.insights(a.id + "," + b.id)),
      button("Compare a different session", routes.pick(a.id), "quiet"));
  }

  function renderInsights(appId, pair) {
    const app = appsById.get(appId);
    const compare = pair && pair[0].id + "," + pair[1].id;
    const sessions = data.sessions.filter(s => s.appId === appId);
    setView({ page: "insights", heading: "Insights", back: pair && { href: routes.compare(...pair), label: "comparison" } });

    if (!sessions.length) {
      mount(el("p", { class: "notice" }, "No " + app.name + " sessions recorded yet."));
      return;
    }
    const totals = DAY_PARTS.map(part => ({ part, minutes: 0 }));
    sessions.forEach(s => { totals.find(t => t.part === dayPartOf(s)).minutes += s.actualMinutes; });
    const peak = totals.reduce((best, t) => t.minutes > best.minutes ? t : best);
    const over = sessions.filter(s => overrun(s) > 0);
    const average = Math.round(sessions.reduce((sum, s) => sum + overrun(s), 0) / sessions.length);
    const worst = sessions.reduce((max, s) => overrun(s) > overrun(max) ? s : max);

    mount(
      el("section", { class: "card", "aria-labelledby": "time-heading" },
        el("h2", { id: "time-heading" }, "Usage by time of day"),
        el("ol", { class: "time-chart", "aria-label": app.name + " minutes by time of day" }, totals.map(t =>
          el("li", { class: t === peak ? "is-top" : null },
            el("span", {}, t.minutes + "m"),
            el("span", { class: "bar", "aria-hidden": "true", style: "height:" + (t.minutes / peak.minutes * 70) + "%" }),
            el("span", {}, t.part.label)))),
        el("p", {}, "You tend to spend more time on " + app.name + " " + peak.part.phrase + ".")),
      el("section", { class: "card", "aria-labelledby": "daily-heading" },
        el("h2", { id: "daily-heading" }, "Session time by date"),
        el("p", { class: "muted" }, "Green: within intention. Orange: exceeded intention. Values show actual / intended minutes."),
        el("ul", { class: "daily-chart" }, sessions.slice().sort((a,b) => a.date.localeCompare(b.date)).map(s =>
          el("li", {}, el("a", { href: routes.details(s.id) }, shortDate(s.date) + ": " + s.actualMinutes + " / " + s.intendedMinutes + " min - " + describeDifference(overrun(s)),
            el("span", { class: "daily-bar is-" + status(s), "aria-hidden": "true", style: "width:" + (s.actualMinutes / Math.max(...sessions.map(x => x.actualMinutes)) * 100) + "%" })))))),
      pair && el("section", { class: "card verdict", "aria-labelledby": "from-compare-heading" },
        el("h2", { id: "from-compare-heading" }, "From your comparison"), el("p", {}, verdict(...pair))),
      el("section", { class: "card", "aria-labelledby": "pattern-heading" },
        el("h2", { id: "pattern-heading" }, "Intended vs. actual"),
        el("ul", { class: "stat-list" },
          el("li", {}, over.length + " of " + sessions.length + " sessions went over the intended time."),
          el("li", {}, "On average, sessions were " + describeDifference(average) + "."),
          overrun(worst) > 0 && el("li", {}, "Largest overrun: " + worst.reason + " on " + shortDate(worst.date) + " (" + describeDifference(overrun(worst)) + ")."))),
      el("p", { class: "muted data-note" }, "Based on " + sessions.length + " sample " + app.name + " sessions (demo data)."),
      button("Next", routes.action(appId, compare)));
  }

  function renderAction(appId, pair) {
    const app = appsById.get(appId);
    const compare = pair && pair[0].id + "," + pair[1].id;
    const sessions = data.sessions.filter(s => s.appId === appId);
    const worst = sessions.length ? sessions.reduce((max, s) => overrun(s) > overrun(max) ? s : max) : null;
    setView({ page: "insights", heading: "Action Plan", back: { href: routes.insights(compare), label: "Insights" } });
    mount(
      el("section", { class: "card", "aria-labelledby": "plan-heading" },
        el("h2", { id: "plan-heading" }, "Set a reminder for " + app.name + "?"),
        el("p", { class: "muted section-hint" }, worst && overrun(worst) > 0
          ? "Your largest overrun was " + overrun(worst) + " minutes during a " + worst.reason + " session on " + shortDate(worst.date) +
            ". A reminder while you use the app can help you notice before a quick check runs long."
          : "A reminder while you use the app can help you keep sessions close to your intention."),
        el("ol", { class: "plan-steps" },
          el("li", {}, "Turn on reminders for " + app.name + "."),
          el("li", {}, "Choose how often you want to be reminded."),
          el("li", {}, "Pick how you're notified (sound, vibration or in-app).")),
        button("Go to Settings", nav.href("settings", { app: app.id }))),
      button("Back to Home", nav.href("home"), "quiet"));
  }

  function renderNotFound(message) {
    setView({ page: "calendar", heading: "Session Not Found", back: { href: nav.href("calendar"), label: "Calendar" } });
    mount(
      el("section", { class: "card", role: "alert" },
        el("h2", {}, "We couldn't open that session"),
        el("p", { class: "muted section-hint" }, message)),
      button("Go to Calendar", nav.href("calendar")),
      button("Back to Home", nav.href("home"), "quiet"));
  }

  // ---------- Router ----------

  const requestedView = params.get("view");
  const pair = parseCompare(params.get("compare"));
  const appId = pair ? pair[0].appId : appsById.has(params.get("app")) ? params.get("app") : DEFAULT_APP;

  if (requestedView === "action") renderAction(appId, pair);
  else if (requestedView === "insights") renderInsights(appId, pair);
  else if (params.has("compare")) {
    if (pair) renderCompare(pair);
    else renderNotFound("A comparison needs two existing sessions from different dates. Open a session and choose Compare Sessions to pick another one.");
  } else if (params.has("pick")) {
    const base = sessionsById.get(params.get("pick"));
    if (base) renderPicker(base);
    else renderNotFound("The session you started comparing from doesn't exist. Choose a date in the Calendar to find a session.");
  } else if (params.has("id")) {
    const session = sessionsById.get(params.get("id"));
    if (session) renderDetails(session);
    else renderNotFound("No session matches that link. Choose a date in the Calendar to find a session.");
  } else renderInsights(appId, null);
})();
