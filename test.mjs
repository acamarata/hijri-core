// ESM test suite for hijri-core.
// Uses Node.js assert — no test framework needed.

import assert from 'node:assert/strict';
import {
  toHijri,
  toGregorian,
  isValidHijriDate,
  daysInHijriMonth,
  registerCalendar,
  getCalendar,
  listCalendars,
  hDatesTable,
  hmLong,
  hmMedium,
  hmShort,
  hwLong,
  hwShort,
  hwNumeric,
} from './dist/index.mjs';

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

// ─── 1. Exports exist ─────────────────────────────────────────────────────────

test('exports: toHijri is a function', () => {
  assert.equal(typeof toHijri, 'function');
});
test('exports: toGregorian is a function', () => {
  assert.equal(typeof toGregorian, 'function');
});
test('exports: isValidHijriDate is a function', () => {
  assert.equal(typeof isValidHijriDate, 'function');
});
test('exports: daysInHijriMonth is a function', () => {
  assert.equal(typeof daysInHijriMonth, 'function');
});
test('exports: registerCalendar is a function', () => {
  assert.equal(typeof registerCalendar, 'function');
});
test('exports: getCalendar is a function', () => {
  assert.equal(typeof getCalendar, 'function');
});
test('exports: listCalendars is a function', () => {
  assert.equal(typeof listCalendars, 'function');
});
test('exports: hDatesTable is an array', () => {
  assert.ok(Array.isArray(hDatesTable));
  assert.ok(hDatesTable.length > 180);
});
test('exports: hmLong has 12 entries', () => {
  assert.equal(hmLong.length, 12);
});
test('exports: hmMedium has 12 entries', () => {
  assert.equal(hmMedium.length, 12);
});
test('exports: hmShort has 12 entries', () => {
  assert.equal(hmShort.length, 12);
});
test('exports: hwLong has 7 entries', () => {
  assert.equal(hwLong.length, 7);
});
test('exports: hwShort has 7 entries', () => {
  assert.equal(hwShort.length, 7);
});
test('exports: hwNumeric has 7 entries', () => {
  assert.equal(hwNumeric.length, 7);
  assert.deepEqual(hwNumeric, [1, 2, 3, 4, 5, 6, 7]);
});

// ─── 2. UAQ toGregorian ───────────────────────────────────────────────────────

test('UAQ toGregorian: 1444/9/1 = 2023-03-23', () => {
  const d = toGregorian(1444, 9, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2023-03-23');
});
test('UAQ toGregorian: 1446/9/1 = 2025-03-01', () => {
  const d = toGregorian(1446, 9, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
});
test('UAQ toGregorian: 1446/10/1 = 2025-03-30', () => {
  const d = toGregorian(1446, 10, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-30');
});
test('UAQ toGregorian: 1318/1/1 = 1900-04-30', () => {
  const d = toGregorian(1318, 1, 1);
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '1900-04-30');
});

// ─── 3. UAQ toHijri ───────────────────────────────────────────────────────────

test('UAQ toHijri: 2023-03-23 = 1444/9/1', () => {
  const h = toHijri(new Date(2023, 2, 23, 12));
  assert.ok(h !== null);
  assert.equal(h.hy, 1444);
  assert.equal(h.hm, 9);
  assert.equal(h.hd, 1);
});
test('UAQ toHijri: 2025-03-01 = 1446/9/1', () => {
  const h = toHijri(new Date(2025, 2, 1, 12));
  assert.ok(h !== null);
  assert.equal(h.hy, 1446);
  assert.equal(h.hm, 9);
  assert.equal(h.hd, 1);
});

// ─── 4. UAQ isValidHijriDate ──────────────────────────────────────────────────

test('UAQ isValid: 1444/9/1 = true', () => {
  assert.equal(isValidHijriDate(1444, 9, 1), true);
});
test('UAQ isValid: 1317/1/1 = false (before table)', () => {
  assert.equal(isValidHijriDate(1317, 1, 1), false);
});
test('UAQ isValid: 1501/1/1 = false (sentinel)', () => {
  assert.equal(isValidHijriDate(1501, 1, 1), false);
});
test('UAQ isValid: month 0 = false', () => {
  assert.equal(isValidHijriDate(1444, 0, 1), false);
});

// ─── 5. daysInHijriMonth ──────────────────────────────────────────────────────

test('UAQ daysInMonth: Ramadan 1444 = 29 days', () => {
  // 1444 dpm = 0x0A9A; bit 8 (month 9) = (0x0A9A >> 8) & 1 = 0x0A & 1 = 0 -> 29
  assert.equal(daysInHijriMonth(1444, 9), 29);
});

// ─── 6. FCNA toGregorian ──────────────────────────────────────────────────────

test('FCNA toGregorian: 1446/9/1 = 2025-03-01', () => {
  const d = toGregorian(1446, 9, 1, { calendar: 'fcna' });
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
});
test('FCNA toGregorian: 1446/10/1 = 2025-03-30', () => {
  const d = toGregorian(1446, 10, 1, { calendar: 'fcna' });
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString().slice(0, 10), '2025-03-30');
});

// ─── 7. FCNA toHijri ──────────────────────────────────────────────────────────

test('FCNA toHijri: 2025-03-01 = 1446/9/1', () => {
  // Use UTC date for FCNA (criterion is UTC-based).
  const h = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
  assert.ok(h !== null);
  assert.equal(h.hy, 1446);
  assert.equal(h.hm, 9);
  assert.equal(h.hd, 1);
});

// ─── 8. FCNA round-trips ──────────────────────────────────────────────────────

test('FCNA round-trip: 1446/9/1 toGregorian->toHijri', () => {
  const greg = toGregorian(1446, 9, 1, { calendar: 'fcna' });
  assert.ok(greg !== null);
  const hijri = toHijri(greg, { calendar: 'fcna' });
  assert.ok(hijri !== null);
  assert.equal(hijri.hy, 1446);
  assert.equal(hijri.hm, 9);
  assert.equal(hijri.hd, 1);
});
test('FCNA round-trip: 1446/10/15 toGregorian->toHijri', () => {
  const greg = toGregorian(1446, 10, 15, { calendar: 'fcna' });
  assert.ok(greg !== null);
  const hijri = toHijri(greg, { calendar: 'fcna' });
  assert.ok(hijri !== null);
  assert.equal(hijri.hy, 1446);
  assert.equal(hijri.hm, 10);
  assert.equal(hijri.hd, 15);
});

// ─── 9. FCNA isValid ──────────────────────────────────────────────────────────

test('FCNA isValid: 1/1/1 = true', () => {
  assert.equal(isValidHijriDate(1, 1, 1, { calendar: 'fcna' }), true);
});
test('FCNA isValid: 1600/1/1 = true', () => {
  assert.equal(isValidHijriDate(1600, 1, 1, { calendar: 'fcna' }), true);
});
test('FCNA isValid: 0/1/1 = false', () => {
  assert.equal(isValidHijriDate(0, 1, 1, { calendar: 'fcna' }), false);
});

// ─── 10. listCalendars ────────────────────────────────────────────────────────

test('listCalendars includes uaq and fcna', () => {
  const cals = listCalendars();
  assert.ok(cals.includes('uaq'));
  assert.ok(cals.includes('fcna'));
});

// ─── 11. getCalendar throws for unknown ───────────────────────────────────────

test('getCalendar throws for unknown calendar', () => {
  assert.throws(
    () => getCalendar('nonexistent'),
    /Unknown Hijri calendar/,
  );
});

// ─── 12. Custom calendar registration ────────────────────────────────────────

test('registerCalendar: custom engine works', () => {
  const mockEngine = {
    id: 'mock',
    toHijri: (_date) => ({ hy: 999, hm: 1, hd: 1 }),
    toGregorian: (_hy, _hm, _hd) => new Date(Date.UTC(2000, 0, 1)),
    isValid: (hy, hm, hd) => hy > 0 && hm >= 1 && hm <= 12 && hd >= 1,
    daysInMonth: (_hy, _hm) => 30,
  };
  registerCalendar('mock', mockEngine);

  const cals = listCalendars();
  assert.ok(cals.includes('mock'));

  const h = toHijri(new Date(2020, 0, 1), { calendar: 'mock' });
  assert.ok(h !== null);
  assert.equal(h.hy, 999);

  const g = toGregorian(1, 1, 1, { calendar: 'mock' });
  assert.ok(g instanceof Date);
  assert.equal(g.toISOString().slice(0, 10), '2000-01-01');

  assert.equal(isValidHijriDate(1, 1, 1, { calendar: 'mock' }), true);
  assert.equal(daysInHijriMonth(1, 1, { calendar: 'mock' }), 30);
});

// ─── 13. Error cases ──────────────────────────────────────────────────────────

test('toHijri throws on non-Date input', () => {
  assert.throws(
    () => toHijri('2023-03-23'),
    /Invalid Gregorian date/,
  );
});
test('toHijri throws on invalid Date', () => {
  assert.throws(
    () => toHijri(new Date('invalid')),
    /Invalid Gregorian date/,
  );
});
test('UAQ toGregorian throws on invalid Hijri date', () => {
  assert.throws(
    () => toGregorian(1317, 1, 1),
    /Invalid Hijri date/,
  );
});

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log(`\n${total} tests total: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
