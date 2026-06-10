'use strict';

// CJS test suite for hijri-core.
// Subset of test.mjs to verify the CommonJS build works correctly.

const { describe, it } = require('node:test');
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

// ─── Exports ────────────────────────────────────────────────────────────────

describe('CJS exports', () => {
  it('toHijri is a function', () => {
    assert.equal(typeof toHijri, 'function');
  });
  it('toGregorian is a function', () => {
    assert.equal(typeof toGregorian, 'function');
  });
  it('hDatesTable is an array with > 180 entries', () => {
    assert.ok(Array.isArray(hDatesTable));
    assert.ok(hDatesTable.length > 180);
  });
  it('hmLong[8] = Ramadan', () => {
    assert.equal(hmLong[8], 'Ramadan');
  });
  it('hmShort[8] = Ram', () => {
    assert.equal(hmShort[8], 'Ram');
  });
  it('hwLong[4] = Yawm al-Khamis', () => {
    assert.equal(hwLong[4], 'Yawm al-Khamis');
  });
  it('hwNumeric[0] = 1', () => {
    assert.equal(hwNumeric[0], 1);
  });
});

// ─── UAQ conversions ────────────────────────────────────────────────────────

describe('CJS UAQ conversions', () => {
  it('toGregorian: 1444/9/1 = 2023-03-23', () => {
    const d = toGregorian(1444, 9, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2023-03-23');
  });
  it('toGregorian: 1446/9/1 = 2025-03-01', () => {
    const d = toGregorian(1446, 9, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
  });
  it('toHijri: 2023-03-23 = 1444/9/1', () => {
    const h = toHijri(new Date(Date.UTC(2023, 2, 23, 12)));
    assert.ok(h !== null);
    assert.equal(h.hy, 1444);
    assert.equal(h.hm, 9);
    assert.equal(h.hd, 1);
  });
  it('isValid: 1444/9/1 = true', () => {
    assert.equal(isValidHijriDate(1444, 9, 1), true);
  });
  it('isValid: 1317/1/1 = false', () => {
    assert.equal(isValidHijriDate(1317, 1, 1), false);
  });
  it('daysInMonth: Ramadan 1444 = 29', () => {
    assert.equal(daysInHijriMonth(1444, 9), 29);
  });
});

// ─── Invalid month validation ───────────────────────────────────────────────

describe('CJS invalid month', () => {
  it('daysInMonth throws for month 0', () => {
    assert.throws(() => daysInHijriMonth(1444, 0), /month must be 1-12/);
  });
  it('daysInMonth throws for month 13', () => {
    assert.throws(() => daysInHijriMonth(1444, 13), /month must be 1-12/);
  });
  it('isValid: month 13 = false', () => {
    assert.equal(isValidHijriDate(1444, 13, 1), false);
  });
});

// ─── FCNA conversions ───────────────────────────────────────────────────────

describe('CJS FCNA conversions', () => {
  it('toGregorian: 1446/9/1 = 2025-03-01', () => {
    const d = toGregorian(1446, 9, 1, { calendar: 'fcna' });
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
  });
  it('toHijri: 2025-03-01 = 1446/9/1', () => {
    const h = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
    assert.ok(h !== null);
    assert.equal(h.hy, 1446);
    assert.equal(h.hm, 9);
    assert.equal(h.hd, 1);
  });
});

// ─── Registry ───────────────────────────────────────────────────────────────

describe('CJS registry', () => {
  it('listCalendars includes uaq and fcna', () => {
    const cals = listCalendars();
    assert.ok(cals.includes('uaq'));
    assert.ok(cals.includes('fcna'));
  });
  it('getCalendar throws for unknown', () => {
    assert.throws(() => getCalendar('nope'), /Unknown Hijri calendar/);
  });
  it('registerCalendar: custom engine', () => {
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
});

// ─── Error cases ────────────────────────────────────────────────────────────

describe('CJS error cases', () => {
  it('toHijri throws on non-Date', () => {
    assert.throws(() => toHijri('bad'), /Invalid Gregorian date/);
  });
  it('toGregorian returns null for out-of-range date', () => {
    assert.strictEqual(toGregorian(1317, 1, 1), null);
  });
});
