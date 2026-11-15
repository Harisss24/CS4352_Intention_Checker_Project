(() => {
  "use strict";
  const data = window.IC_SESSION_DATA;
  const nav = window.IC_NAV;
  const params = new URLSearchParams(location.search);
  const DEMO_TODAY = "2026-10-15";
  const DEFAULT_MONTH = { year: 2026, month: 9 };

  const appsById = new Map(data.apps.map(app => [app.id, app]));
  const sessionsById = new Map(data.sessions.map(s => [s.id, s]));
  const sessionsByDate = new Map();
  data.sessions.forEach(s => {
    if (!sessionsByDate.has(s.date)) sessionsByDate.set(s.date, []);
    sessionsByDate.get(s.date).push(s);
  });
  sessionsByDate.forEach(list => list.sort((a, b) => (a.startedAt || "").localeCompare(b.startedAt || "")));

  const grid = document.getElementById("day-grid");
  const monthLabel = document.getElementById("month-label");
  const monthSummary = document.getElementById("month-summary");
  const dayHeading = document.getElementById("day-heading");
  const daySummary = document.getElementById("day-summary");
  const sessionList = document.getElementById("session-list");

  const pad = n => String(n).padStart(2, "0");
  const toIso = (y, m, d) => y + "-" + pad(m + 1) + "-" + pad(d);
  function parseIso(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
  }
  const longDate = iso => parseIso(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const shortDate = iso => parseIso(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const plural = (n, word) => n + " " + word + (n === 1 ? "" : "s");

  function formatClock(hhmm) {
    if (!hhmm) return "";
    const [h, m] = hhmm.split(":").map(Number);
    return (h % 12 || 12) + ":" + pad(m) + " " + (h < 12 ? "AM" : "PM");
  }

  const overrun = s => s.actualMinutes - s.intendedMinutes;
  function describeDifference(diff) {
    if (diff > 0) return diff + " min over";
    if (diff < 0) return -diff + " min under";
    return "right on time";
  }
  function dayStatus(iso) {
    const list = sessionsByDate.get(iso);
    if (!list || !list.length) return "none";
    return list.some(s => overrun(s) > 0) ? "over" : "within";
  }
  const statusText = { over: "exceeded intended time", within: "within intended time", none: "no usage", future: "upcoming, no data yet" };

  const compareBase = sessionsById.get(params.get("compareWith")) || null;
  const requested = parseIso(params.get("date"));
  let selected = requested ? params.get("date") : DEMO_TODAY;
  let view = requested
    ? { year: requested.getFullYear(), month: requested.getMonth() }
    : { ...DEFAULT_MONTH };

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === false || value == null) return;
      if (key === "class") node.className = value;
      else node.setAttribute(key, value === true ? "" : value);
    });
    node.append(...children.flat().filter(c => c != null && c !== false && c !== ""));
    return node;
  }

  function updateUrl() {
    const next = new URLSearchParams();
    next.set("date", selected);
    if (compareBase) next.set("compareWith", compareBase.id);
    history.replaceState(null, "", "?" + next);
  }

  function renderCompareBanner() {
    if (!compareBase) return;
    const app = appsById.get(compareBase.appId);
    document.getElementById("compare-banner").hidden = false;
    document.getElementById("compare-text").textContent =
      "Comparing with " + (app ? app.name : "a session") + " on " + shortDate(compareBase.date) +
      ". Pick a session from a different date.";
    document.getElementById("compare-cancel").href = "session-details.html?" + new URLSearchParams({ id: compareBase.id });
  }

  function renderMonth(focusIso) {
    const { year, month } = view;
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthLabel.textContent = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const monthSessions = data.sessions.filter(s => {
      const d = parseIso(s.date);
      return d && d.getFullYear() === year && d.getMonth() === month;
    });
    const overCount = monthSessions.filter(s => overrun(s) > 0).length;
    monthSummary.textContent = monthSessions.length
      ? plural(monthSessions.length, "session") + " this month · " + overCount + " exceeded intended time"
      : "No sessions recorded this month.";

    const selectedInMonth = parseIso(selected);
    const inThisMonth = selectedInMonth && selectedInMonth.getFullYear() === year && selectedInMonth.getMonth() === month;
    const tabTarget = focusIso || (inThisMonth ? selected : toIso(year, month, 1));

    grid.replaceChildren();
    for (let i = 0; i < first.getDay(); i++) grid.append(el("span", { class: "day-spacer", "aria-hidden": "true" }));

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toIso(year, month, d);
      const status = dayStatus(iso);
      const count = (sessionsByDate.get(iso) || []).length;
      const isToday = iso === DEMO_TODAY;
      const isSelected = iso === selected;
      const label = longDate(iso) + (isToday ? ", demo reference date" : "") + ", " +
        (count ? plural(count, "session") + ", " : "") + statusText[status];
      const button = el("button", {
        type: "button",
        class: "day is-" + status + (isToday ? " is-today" : "") + (isSelected ? " is-selected" : ""),
        "data-date": iso,
        "aria-label": label,
        "aria-pressed": isSelected ? "true" : "false",
        "aria-current": isToday ? "date" : null,
        tabindex: iso === tabTarget ? "0" : "-1"
      },
        el("span", { class: "day-number" }, String(d)),
        el("span", { class: "marker is-" + status, "aria-hidden": "true" }));
      grid.append(button);
    }
    if (focusIso) {
      const target = grid.querySelector('[data-date="' + focusIso + '"]');
      if (target) target.focus();
    }
  }

  function sessionHref(s) {
    if (compareBase && s.date !== compareBase.date) {
      return "session-details.html?" + new URLSearchParams({ compare: compareBase.id + "," + s.id });
    }
    return "session-details.html?" + new URLSearchParams({ id: s.id });
  }

  function renderDay() {
    const list = sessionsByDate.get(selected) || [];
    dayHeading.textContent = longDate(selected) + (selected === DEMO_TODAY ? " (Demo reference date)" : "");
    sessionList.replaceChildren();

    if (!list.length) {
      daySummary.textContent = "No sample sessions on this date.";
      sessionList.append(el("li", { class: "empty-state" },
        compareBase ? "Choose a date with a marker to find a session to compare." : "Try a date with a green or orange marker."));
      return;
    }

    const intended = list.reduce((sum, s) => sum + s.intendedMinutes, 0);
    const actual = list.reduce((sum, s) => sum + s.actualMinutes, 0);
    daySummary.textContent = plural(list.length, "session") + " · " + actual + " min used of " + intended + " min intended";

    list.forEach(s => {
      const app = appsById.get(s.appId) || { id: s.appId, name: s.appId, badge: "?" };
      const diff = overrun(s);
      const status = diff > 0 ? "over" : "within";
      const isBase = compareBase && compareBase.id === s.id;
      const sameDate = compareBase && s.date === compareBase.date;
      const action = !compareBase ? "View details" : sameDate ? "" : "Compare with this session";

      const content = [
        el("span", { class: "app-icon app-icon-" + app.id, "aria-hidden": "true" }, app.badge),
        el("span", { class: "session-body" },
          el("span", { class: "session-title" }, app.name, s.startedAt && el("span", { class: "muted session-time" }, formatClock(s.startedAt))),
          el("span", { class: "muted session-reason" }, "Reason: " + s.reason),
          el("span", { class: "session-minutes" }, "Intended " + s.intendedMinutes + " min · Actual " + s.actualMinutes + " min"),
          el("span", { class: "status-pill is-" + status }, describeDifference(diff)),
          action && el("span", { class: "session-action" }, action, el("span", { "aria-hidden": "true" }, " ›")),
          isBase && el("span", { class: "muted session-action" }, "Session you are comparing from"),
          sameDate && !isBase && el("span", { class: "muted session-action" }, "Same date as your first session, pick another date"))
      ];

      sessionList.append(el("li", {}, sameDate
        ? el("div", { class: "session-card is-disabled" }, content)
        : el("a", { class: "session-card", href: sessionHref(s) }, content)));
    });
  }

  function selectDate(iso, focus) {
    const date = parseIso(iso);
    if (!date) return;
    selected = iso;
    const changedMonth = date.getFullYear() !== view.year || date.getMonth() !== view.month;
    if (changedMonth) view = { year: date.getFullYear(), month: date.getMonth() };
    renderMonth(focus ? iso : null);
    renderDay();
    updateUrl();
  }

  function shiftMonth(delta) {
    const next = new Date(view.year, view.month + delta, 1);
    view = { year: next.getFullYear(), month: next.getMonth() };
    selectDate(toIso(view.year, view.month, 1), false);
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest("button[data-date]");
    if (button) selectDate(button.dataset.date, true);
  });

  grid.addEventListener("keydown", event => {
    const button = event.target.closest("button[data-date]");
    if (!button) return;
    const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const current = parseIso(button.dataset.date);
    let target = null;
    if (event.key in steps) {
      target = new Date(current.getFullYear(), current.getMonth(), current.getDate() + steps[event.key]);
    } else if (event.key === "Home") {
      target = new Date(current.getFullYear(), current.getMonth(), 1);
    } else if (event.key === "End") {
      target = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    } else return;
    event.preventDefault();
    const iso = toIso(target.getFullYear(), target.getMonth(), target.getDate());
    if (target.getFullYear() !== view.year || target.getMonth() !== view.month) {
      view = { year: target.getFullYear(), month: target.getMonth() };
    }
    renderMonth(iso);
  });

  document.getElementById("prev-month").addEventListener("click", () => shiftMonth(-1));
  document.getElementById("next-month").addEventListener("click", () => shiftMonth(1));

  renderCompareBanner();
  renderMonth();
  renderDay();
  if (requested || compareBase) updateUrl();
  if (nav) nav.render("calendar");
})();
