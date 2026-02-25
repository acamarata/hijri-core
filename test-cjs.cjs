'use strict';

// CJS test suite for hijri-core.
// Subset of test.mjs — verifies the CommonJS build works correctly.

const assert = require('node:assert/strict');
const {
  toHijri,
  toGregorian,
  isValidHijriDate,
  daysInHijriMonth,
  registerCalendar,
  getCalendar,
  listCalendars,
  hDatesTable,
  hmLong,
  hmShort,
  hwLong,
  hwNumeric,
} = require('./dist/index.cjs');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`[${name}]... PASS`);
    passed++;
  } catch (err) {
    console.error(`[${name}]... FAIL: ${err.message}`);
    failed++;
  }
}

// Exports
test('CJS exports: toHijri is a function', () => {
  assert.equal(typeof toHijri, 'function');
});
test('CJS exports: toGregorian is a function', () => {
  assert.equal(typeof toGregorian, 'function');
});
test('CJS exports: hDatesTable is an array', () => {
  assert.ok(Array.isArray(hDatesTable));
  assert.ok(hDatesTable.length > 180);
});
test('CJS exports: hmLong[8] = Ramadan', () => {
  assert.equal(hmLong[8], 'Ramadan');
});
test('CJS exports: hmShort[8] = Ram', () => {
  assert.equal(hmShort[8], 'Ram');
});
test('CJS exports: hwLong[4] = Yawm al-Khamis', () => {
  assert.equal(hwLong[4], 'Yawm al-Khamis');
});
test('CJS exports: hwNumeric[0] = 1', () => {
  assert.equal(hwNumeric[0], 1);
});

// UAQ conversions
test('CJS UAQ toGregorian: 1444/9/1 = 2023-03-23', () => {
  const d = toGregorian(1444, 9, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2023-03-23');
});
test('CJS UAQ toGregorian: 1446/9/1 = 2025-03-01', () => {
  const d = toGregorian(1446, 9, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
});
test('CJS UAQ toHijri: 2023-03-23 = 1444/9/1', () => {
  const h = toHijri(new Date(2023, 2, 23, 12));
  assert.ok(h !== null);
  assert.equal(h.hy, 1444);
  assert.equal(h.hm, 9);
  assert.equal(h.hd, 1);
});
test('CJS UAQ isValid: 1444/9/1 = true', () => {
  assert.equal(isValidHijriDate(1444, 9, 1), true);
});
test('CJS UAQ isValid: 1317/1/1 = false', () => {
  assert.equal(isValidHijriDate(1317, 1, 1), false);
});
test('CJS UAQ daysInMonth: Ramadan 1444 = 29', () => {
  assert.equal(daysInHijriMonth(1444, 9), 29);
});

// FCNA conversions
test('CJS FCNA toGregorian: 1446/9/1 = 2025-03-01', () => {
  const d = toGregorian(1446, 9, 1, { calendar: 'fcna' });
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
});
test('CJS FCNA toHijri: 2025-03-01 = 1446/9/1', () => {
  const h = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
  assert.ok(h !== null);
  assert.equal(h.hy, 1446);
  assert.equal(h.hm, 9);
  assert.equal(h.hd, 1);
});

// Registry
test('CJS listCalendars includes uaq and fcna', () => {
  const cals = listCalendars();
  assert.ok(cals.includes('uaq'));
  assert.ok(cals.includes('fcna'));
});
test('CJS getCalendar throws for unknown', () => {
  assert.throws(
    () => getCalendar('nope'),
    /Unknown Hijri calendar/,
  );
});

// Custom calendar
test('CJS registerCalendar: custom engine', () => {
  const mockEngine = {
    id: 'mock-cjs',
    toHijri: () => ({ hy: 888, hm: 2, hd: 5 }),
    toGregorian: () => new Date(Date.UTC(2001, 0, 1)),
    isValid: (hy, hm, hd) => hy > 0 && hm >= 1 && hm <= 12 && hd >= 1,
    daysInMonth: () => 29,
  };
  registerCalendar('mock-cjs', mockEngine);

  const h = toHijri(new Date(2020, 0, 1), { calendar: 'mock-cjs' });
  assert.ok(h !== null);
  assert.equal(h.hy, 888);
  assert.equal(h.hm, 2);
  assert.equal(h.hd, 5);
});

// Error cases
test('CJS toHijri throws on non-Date', () => {
  assert.throws(() => toHijri('bad'), /Invalid Gregorian date/);
});
test('CJS toGregorian returns null for out-of-range date', () => {
  assert.strictEqual(toGregorian(1317, 1, 1), null);
});

// Summary
const total = passed + failed;
console.log(`\n${total} tests total: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
