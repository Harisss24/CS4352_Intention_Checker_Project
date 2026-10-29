(() => {
  "use strict";
  const data = window.IC_DASHBOARD_DATA;
  const formatMinutes = minutes => minutes >= 60
    ? Math.floor(minutes / 60) + "h " + String(minutes % 60).padStart(2, "0") + "m"
    : minutes + "m";
  const apps = [...data.apps].sort((a, b) => b.actualMinutes - a.actualMinutes);
  const total = apps.reduce((sum, app) => sum + app.actualMinutes, 0);
  document.getElementById("usage-total").textContent = formatMinutes(total);
  const progress = document.getElementById("usage-progress");
  progress.max = data.dailyReferenceMinutes;
  progress.value = Math.min(total, data.dailyReferenceMinutes);
  progress.textContent = total + " of " + data.dailyReferenceMinutes + " minutes";
  const difference = data.dailyReferenceMinutes - total;
  document.getElementById("usage-note").textContent = difference >= 0
    ? difference + " minutes remaining of the demo daily reference."
    : -difference + " minutes over the demo daily reference.";
  const list = document.getElementById("app-list");
  // Existing semantic links remain usable if scripting is unavailable.
  apps.forEach(app => {
    const row = list.querySelector('[href$="app=' + app.id + '"]');
    row.querySelector(".app-time").textContent = formatMinutes(app.actualMinutes);
    row.href = window.IC_NAV.href("intention", { app: app.id });
    list.append(row.parentElement);
  });
})();
