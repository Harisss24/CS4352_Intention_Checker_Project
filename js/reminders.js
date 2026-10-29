(() => {
  "use strict";
  const STORAGE_KEY = "ic.reminderSettings";
  const apps = { instagram: { name: "Instagram", badge: "Ig" }, tiktok: { name: "TikTok", badge: "Tk" }, youtube: { name: "YouTube", badge: "▶" } };
  const defaults = { enabled: true, frequencyMinutes: 10, vibration: true, notificationStyle: "in-app" };
  const styles = ["in-app", "sound", "sound-and-in-app", "silent"];
  const drafts = new Map();
  const byId = id => document.getElementById(id);
  let currentApp = null;
  const controls = { enabled: byId("reminders-enabled"), frequency: byId("reminder-frequency"), sound: byId("reminder-sound"), vibration: byId("reminder-vibration"), inApp: byId("reminder-in-app") };

  function normalize(value) {
    const settings = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    return {
      enabled: typeof settings.enabled === "boolean" ? settings.enabled : defaults.enabled,
      frequencyMinutes: [5, 10, 15, 30].includes(settings.frequencyMinutes) ? settings.frequencyMinutes : defaults.frequencyMinutes,
      vibration: typeof settings.vibration === "boolean" ? settings.vibration : defaults.vibration,
      notificationStyle: styles.includes(settings.notificationStyle) ? settings.notificationStyle : defaults.notificationStyle
    };
  }

  function readStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw === null ? {} : JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid settings");
      byId("storage-warning").hidden = true;
      return parsed;
    } catch {
      byId("storage-warning").textContent = "Saved preferences could not be read. Default settings are shown; saving will try to store your choices again.";
      byId("storage-warning").hidden = false;
      return {};
    }
  }

  function getSettings(appId, store) {
    return normalize(Object.hasOwn(store, appId) ? store[appId] : null);
  }

  function readForm() {
    return {
      enabled: controls.enabled.checked,
      frequencyMinutes: Number(controls.frequency.value),
      vibration: controls.vibration.checked,
      notificationStyle: controls.sound.checked ? (controls.inApp.checked ? "sound-and-in-app" : "sound") : (controls.inApp.checked ? "in-app" : "silent")
    };
  }

  function updateControls() {
    const enabled = controls.enabled.checked;
    byId("frequency-controls").disabled = !enabled;
    byId("notification-controls").disabled = !enabled;
    byId("preview-button").disabled = !enabled;
    byId("disabled-note").hidden = enabled;
    byId("silent-note").hidden = !enabled || controls.sound.checked || controls.vibration.checked || controls.inApp.checked;
  }

  function closePreview() {
    byId("reminder-preview").hidden = true;
    byId("preview-button").setAttribute("aria-expanded", "false");
  }

  function updateOverview(store) {
    Object.keys(apps).forEach(id => {
      const settings = getSettings(id, store);
      byId("summary-" + id).textContent = settings.enabled ? "On · Every " + settings.frequencyMinutes + " minutes" : "Off · Preferences kept";
    });
  }

  function renderRoute(focusHeading = false) {
    const requestedApp = new URL(location.href).searchParams.get("app");
    currentApp = Object.hasOwn(apps, requestedApp) ? requestedApp : null;
    const store = readStore();
    updateOverview(store);
    byId("settings-overview").hidden = currentApp !== null;
    byId("app-settings").hidden = currentApp === null;
    byId("save-status").textContent = "";
    byId("save-error").hidden = true;
    closePreview();
    if (!currentApp) {
      document.title = "Settings · Intention Checker";
      if (requestedApp) {
        byId("storage-warning").textContent = "That app is not supported. Choose Instagram, TikTok or YouTube below.";
        byId("storage-warning").hidden = false;
      }
      if (focusHeading) byId("main").focus();
      return;
    }
    const app = apps[currentApp];
    const settings = drafts.get(currentApp) || getSettings(currentApp, store);
    byId("app-heading").textContent = app.name + " Settings";
    document.title = app.name + " Settings · Intention Checker";
    byId("selected-app-icon").className = "settings-app-icon " + currentApp;
    byId("selected-app-icon").textContent = app.badge;
    controls.enabled.checked = settings.enabled;
    controls.frequency.value = String(settings.frequencyMinutes);
    controls.vibration.checked = settings.vibration;
    controls.sound.checked = ["sound", "sound-and-in-app"].includes(settings.notificationStyle);
    controls.inApp.checked = ["in-app", "sound-and-in-app"].includes(settings.notificationStyle);
    byId("draft-note").textContent = drafts.has(currentApp) ? "Unsaved changes. Select Save Changes to keep them after refresh." : "Changes are saved only when you select Save Changes.";
    updateControls();
    if (focusHeading) byId("app-heading").focus();
  }

  document.querySelectorAll(".settings-app, .settings-back").forEach(link => {
    link.addEventListener("click", event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      history.pushState(null, "", link.href);
      renderRoute(true);
    });
  });
  window.addEventListener("popstate", () => renderRoute(true));
  byId("reminder-form").addEventListener("change", () => {
    drafts.set(currentApp, readForm());
    byId("save-status").textContent = "";
    byId("save-error").hidden = true;
    byId("draft-note").textContent = "Unsaved changes. Select Save Changes to keep them after refresh.";
    closePreview();
    updateControls();
  });
  byId("preview-button").addEventListener("click", () => {
    if (!currentApp || !controls.enabled.checked) return;
    const settings = readForm();
    const cues = [];
    if (controls.inApp.checked) cues.push("In-app reminder");
    if (settings.vibration) cues.push("Vibration");
    if (controls.sound.checked) cues.push("Sound");
    byId("preview-message").textContent = "You've used " + apps[currentApp].name + " for " + settings.frequencyMinutes + " minutes. Is this still what you intended?";
    byId("preview-style").textContent = cues.length ? "Selected styles: " + cues.join(" · ") + "." : "All styles are off. This sample will not appear during a session.";
    byId("reminder-preview").hidden = false;
    byId("preview-button").setAttribute("aria-expanded", "true");
    byId("preview-heading").focus();
  });
  byId("dismiss-preview").addEventListener("click", () => { closePreview(); byId("preview-button").focus(); });
  byId("reminder-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!currentApp) return;
    const settings = normalize(readForm());
    const store = readStore();
    try {
      // Re-read on save to preserve settings saved for other apps or in another tab.
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...store, [currentApp]: settings }));
      drafts.delete(currentApp);
      byId("storage-warning").hidden = true;
      byId("save-error").hidden = true;
      byId("save-status").textContent = apps[currentApp].name + " reminder settings saved.";
      byId("draft-note").textContent = "Saved in this browser. You can change these preferences any time.";
      updateOverview({ ...store, [currentApp]: settings });
    } catch {
      byId("save-status").textContent = "";
      byId("save-error").textContent = "Your settings could not be saved. Browser storage may be blocked or full. Your choices are still here; allow storage and try Save Changes again.";
      byId("save-error").hidden = false;
    }
  });
  renderRoute();
})();
