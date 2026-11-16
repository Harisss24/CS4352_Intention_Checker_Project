(() => {
  'use strict';
  const KEY = 'ic.currentIntention';
  const apps = {instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube'};
  const asked = new URLSearchParams(location.search).get('app')?.toLowerCase();
  let state = {appId: Object.hasOwn(apps, asked) ? asked : 'instagram', reason: '', intendedMinutes: 0};
  let startedAt = 0, interval;
  const error = document.querySelector('#form-error');
  const views = [...document.querySelectorAll('[data-view]')];
  function show(name) {
    views.forEach(v => v.hidden = v.dataset.view !== name);
    const heading = document.querySelector(`[data-view="${name}"] h1`);
    heading.tabIndex = -1;
    heading.focus();
  }
  function paint() {
    document.querySelectorAll('[data-app-name]').forEach(n => n.textContent = apps[state.appId]);
    document.querySelectorAll('[data-reason]').forEach(n => n.textContent = state.reason);
    document.querySelectorAll('[data-duration]').forEach(n => n.textContent = state.intendedMinutes);
    const link = document.querySelector('#app-reminders');
    link.href = 'reminders.html?app=' + state.appId;
    link.textContent = apps[state.appId] + ' reminder settings';
  }
  function tick() {
    const seconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    document.querySelector('#session-timer').textContent = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
    document.querySelector('#timer-goal').textContent = seconds >= state.intendedMinutes * 60 ? 'Your demo intention time has been reached.' : state.intendedMinutes + ' minute intention';
  }
  function startTimer() { clearInterval(interval); tick(); interval = setInterval(tick, 1000); }
  document.querySelectorAll('[data-group]').forEach(group => group.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    group.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (group.dataset.group === 'reason') state.reason = b.dataset.value;
    else state.intendedMinutes = Number(b.dataset.value);
    error.hidden = true;
  }));
  document.querySelector('#intention-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!state.reason || !state.intendedMinutes) {
      error.textContent = 'Choose both a reason and an intended duration before starting.';
      error.hidden = false;
      return;
    }
    startedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify({...state, status: 'active', createdAt: new Date(startedAt).toISOString()})); } catch (_) {}
    paint(); show('active'); startTimer();
  });
  document.querySelector('#keep-going').onclick = e => e.currentTarget.textContent = 'Continuing demo session';
  document.querySelector('#close-app').onclick = () => {
    clearInterval(interval);
    document.querySelector('#actual-duration').textContent = state.intendedMinutes + 2;
    try { localStorage.removeItem(KEY); } catch (_) {}
    show('summary');
  };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    const reasons = [...document.querySelectorAll('[data-group="reason"] button')].map(b => b.dataset.value);
    const timestamp = Date.parse(saved?.createdAt);
    if (saved?.status === 'active' && Object.hasOwn(apps, saved.appId) && (!asked || asked === saved.appId) && reasons.includes(saved.reason) && [5,10,15,30].includes(saved.intendedMinutes) && Number.isFinite(timestamp) && timestamp <= Date.now()) {
      state = {appId: saved.appId, reason: saved.reason, intendedMinutes: saved.intendedMinutes};
      startedAt = timestamp;
      paint(); show('active'); startTimer();
    }
  } catch (_) {}
  paint();
})();
