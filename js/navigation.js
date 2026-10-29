(() => {
  "use strict";
  // Resolve from this file, never from the current document's directory.
  const root = new URL("../", document.currentScript.src);
  const paths = {
    home: "index.html",
    intention: "pages/intention.html",
    calendar: "pages/calendar.html",
    insights: "pages/session-details.html?view=insights",
    settings: "pages/reminders.html"
  };
  const shapes = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2m4 0h2m-8 3h2"/>',
    insights: '<path d="M4 3v18h17M9 17v-5m5 5V7m5 10V4"/>',
    settings: '<path d="m9 3-.6 2.2-2 .9L4.3 6l-2 3.5L4 11v2l-1.7 1.5 2 3.5 2.1-.1 2 .9L9 21h6l.6-2.2 2-.9 2.1.1 2-3.5L20 13v-2l1.7-1.5-2-3.5-2.1.1-2-.9L15 3Z"/><circle cx="12" cy="12" r="3"/>'
  };
  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (shapes[name] || shapes.home) + '</svg>';
  }
  function href(page, params = {}) {
    if (!Object.hasOwn(paths, page)) throw new Error("Unknown navigation destination: " + page);
    const url = new URL(paths[page], root);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.href;
  }
  function render(activePage = document.body.dataset.page) {
    document.querySelectorAll("[data-bottom-nav]").forEach(nav => {
      nav.replaceChildren();
      [["home", "Home"], ["calendar", "Calendar"], ["insights", "Insights"], ["settings", "Settings"]].forEach(([page, label]) => {
        const link = document.createElement("a");
        link.className = "nav-link";
        link.href = href(page);
        if (page === activePage) link.setAttribute("aria-current", "page");
        link.innerHTML = icon(page);
        link.append(document.createTextNode(label));
        nav.append(link);
      });
    });
    document.querySelectorAll("[data-icon]").forEach(element => { element.innerHTML = icon(element.dataset.icon); });
  }
  window.IC_NAV = Object.freeze({ href, icon, render });
  render();
})();
