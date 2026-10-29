// Dependency-free fault-injection tests. Browser interaction checks are in docs/TASK02_IMPLEMENTATION.md.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/reminders.js'), 'utf8');

function page({ raw = null, app = 'instagram', denyRead = false, denyWrite = false } = {}) {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      hidden: true, textContent: '', value: '', checked: false, disabled: false,
      listeners: {}, attributes: {}, focus() {},
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { this.listeners[name] = callback; }
    });
    return elements.get(id);
  }
  const storage = {
    getItem() { if (denyRead) throw new Error('SecurityError'); return raw; },
    setItem(key, value) { if (denyWrite) throw new Error('QuotaExceededError'); assert.equal(key, 'ic.reminderSettings'); raw = value; }
  };
  const context = {
    URL, location: { href: 'https://example.test/pages/reminders.html?app=' + encodeURIComponent(app) },
    document: { getElementById: element, querySelectorAll: () => [] },
    localStorage: storage, window: { addEventListener() {} }
  };
  vm.runInNewContext(source, context);
  return { element, replaceStore: value => { raw = JSON.stringify(value); }, saved: () => JSON.parse(raw), submit: () => element('reminder-form').listeners.submit({ preventDefault() {} }), change: () => element('reminder-form').listeners.change() };
}

test('missing settings use defaults without an error', () => {
  const p = page();
  assert.equal(p.element('reminder-frequency').value, '10');
  assert.equal(p.element('reminder-vibration').checked, true);
  assert.equal(p.element('storage-warning').hidden, true);
});

test('malformed JSON and invalid root shapes recover with visible feedback', () => {
  for (const raw of ['{broken', '[]', 'null', '42']) {
    const p = page({ raw });
    assert.equal(p.element('reminder-frequency').value, '10');
    assert.equal(p.element('storage-warning').hidden, false);
    p.submit();
    assert.equal(p.saved().instagram.frequencyMinutes, 10);
    assert.equal(p.element('storage-warning').hidden, true);
  }
});

test('invalid individual fields fall back without discarding valid fields', () => {
  const p = page({ raw: JSON.stringify({ instagram: { enabled: false, frequencyMinutes: -5, vibration: 'yes', notificationStyle: 'invalid' } }) });
  assert.equal(p.element('reminders-enabled').checked, false);
  assert.equal(p.element('reminder-frequency').value, '10');
  assert.equal(p.element('reminder-vibration').checked, true);
  assert.equal(p.element('reminder-in-app').checked, true);
  assert.equal(p.element('frequency-controls').disabled, true);
});

test('a save merges the latest store and retains disabled preferences', () => {
  const other = { enabled: true, frequencyMinutes: 30, vibration: false, notificationStyle: 'sound' };
  const p = page();
  // Simulate another tab saving TikTok after this page was loaded.
  p.replaceStore({ tiktok: other });
  p.element('reminders-enabled').checked = false;
  p.element('reminder-frequency').value = '5';
  p.change();
  p.submit();
  assert.deepEqual(p.saved().tiktok, other);
  assert.deepEqual(p.saved().instagram, { enabled: false, frequencyMinutes: 5, vibration: true, notificationStyle: 'in-app' });
  assert.equal(p.element('save-status').textContent, 'Instagram reminder settings saved.');
});

test('blocked reads and writes do not crash or claim a successful save', () => {
  const p = page({ denyRead: true, denyWrite: true });
  assert.equal(p.element('storage-warning').hidden, false);
  p.element('reminder-frequency').value = '5';
  p.submit();
  assert.equal(p.element('save-error').hidden, false);
  assert.equal(p.element('save-status').textContent, '');
  assert.equal(p.element('reminder-frequency').value, '5');
});

test('all sound/in-app style combinations round trip independently from vibration', () => {
  for (const [sound, inApp, expected] of [[true, true, 'sound-and-in-app'], [true, false, 'sound'], [false, true, 'in-app'], [false, false, 'silent']]) {
    const p = page();
    p.element('reminder-sound').checked = sound;
    p.element('reminder-in-app').checked = inApp;
    p.submit();
    assert.equal(p.saved().instagram.notificationStyle, expected);
    const reloaded = page({ raw: JSON.stringify(p.saved()) });
    assert.equal(reloaded.element('reminder-sound').checked, sound);
    assert.equal(reloaded.element('reminder-in-app').checked, inApp);
  }
});

test('unsupported or prototype property app IDs show the safe overview', () => {
  for (const app of ['unknown', '__proto__', 'constructor']) {
    const p = page({ app });
    assert.equal(p.element('settings-overview').hidden, false);
    assert.equal(p.element('app-settings').hidden, true);
    assert.match(p.element('storage-warning').textContent, /not supported/);
  }
});
