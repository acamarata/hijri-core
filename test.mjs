// ESM test suite for hijri-core.

import { describe, it } from 'node:test';
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

// ─── Exports exist ──────────────────────────────────────────────────────────

describe('exports', () => {
  it('toHijri is a function', () => {
    assert.equal(typeof toHijri, 'function');
  });
  it('toGregorian is a function', () => {
    assert.equal(typeof toGregorian, 'function');
  });
  it('isValidHijriDate is a function', () => {
    assert.equal(typeof isValidHijriDate, 'function');
  });
  it('daysInHijriMonth is a function', () => {
    assert.equal(typeof daysInHijriMonth, 'function');
  });
  it('registerCalendar is a function', () => {
    assert.equal(typeof registerCalendar, 'function');
  });
  it('getCalendar is a function', () => {
    assert.equal(typeof getCalendar, 'function');
  });
  it('listCalendars is a function', () => {
    assert.equal(typeof listCalendars, 'function');
  });
  it('hDatesTable is an array with > 180 entries', () => {
    assert.ok(Array.isArray(hDatesTable));
    assert.ok(hDatesTable.length > 180);
  });
  it('hmLong has 12 entries', () => {
    assert.equal(hmLong.length, 12);
  });
  it('hmMedium has 12 entries', () => {
    assert.equal(hmMedium.length, 12);
  });
  it('hmShort has 12 entries', () => {
    assert.equal(hmShort.length, 12);
  });
  it('hwLong has 7 entries', () => {
    assert.equal(hwLong.length, 7);
  });
  it('hwShort has 7 entries', () => {
    assert.equal(hwShort.length, 7);
  });
  it('hwNumeric has 7 entries [1..7]', () => {
    assert.equal(hwNumeric.length, 7);
    assert.deepEqual(hwNumeric, [1, 2, 3, 4, 5, 6, 7]);
  });
});

// ─── UAQ toGregorian ────────────────────────────────────────────────────────

describe('UAQ toGregorian', () => {
  it('1444/9/1 = 2023-03-23', () => {
    const d = toGregorian(1444, 9, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2023-03-23');
  });
  it('1446/9/1 = 2025-03-01', () => {
    const d = toGregorian(1446, 9, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
  });
  it('1446/10/1 = 2025-03-30', () => {
    const d = toGregorian(1446, 10, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-30');
  });
  it('1318/1/1 = 1900-04-30', () => {
    const d = toGregorian(1318, 1, 1);
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '1900-04-30');
  });
});

// ─── UAQ toHijri ────────────────────────────────────────────────────────────

describe('UAQ toHijri', () => {
  it('2023-03-23 = 1444/9/1', () => {
    const h = toHijri(new Date(2023, 2, 23, 12));
    assert.ok(h !== null);
    assert.equal(h.hy, 1444);
    assert.equal(h.hm, 9);
    assert.equal(h.hd, 1);
  });
  it('2025-03-01 = 1446/9/1', () => {
    const h = toHijri(new Date(2025, 2, 1, 12));
    assert.ok(h !== null);
    assert.equal(h.hy, 1446);
    assert.equal(h.hm, 9);
    assert.equal(h.hd, 1);
  });
});

// ─── UAQ isValidHijriDate ───────────────────────────────────────────────────

describe('UAQ isValid', () => {
  it('1444/9/1 = true', () => {
    assert.equal(isValidHijriDate(1444, 9, 1), true);
  });
  it('1317/1/1 = false (before table)', () => {
    assert.equal(isValidHijriDate(1317, 1, 1), false);
  });
  it('1501/1/1 = false (sentinel)', () => {
    assert.equal(isValidHijriDate(1501, 1, 1), false);
  });
  it('month 0 = false', () => {
    assert.equal(isValidHijriDate(1444, 0, 1), false);
  });
  it('month 13 = false', () => {
    assert.equal(isValidHijriDate(1444, 13, 1), false);
  });
});

// ─── daysInHijriMonth ───────────────────────────────────────────────────────

describe('UAQ daysInMonth', () => {
  it('Ramadan 1444 = 29 days', () => {
    assert.equal(daysInHijriMonth(1444, 9), 29);
  });
  it('throws for month 0', () => {
    assert.throws(() => daysInHijriMonth(1444, 0), /month must be 1-12/);
  });
  it('throws for month 13', () => {
    assert.throws(() => daysInHijriMonth(1444, 13), /month must be 1-12/);
  });
});

// ─── FCNA toGregorian ───────────────────────────────────────────────────────

describe('FCNA toGregorian', () => {
  it('1446/9/1 = 2025-03-01', () => {
    const d = toGregorian(1446, 9, 1, { calendar: 'fcna' });
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-01');
  });
  it('1446/10/1 = 2025-03-30', () => {
    const d = toGregorian(1446, 10, 1, { calendar: 'fcna' });
    assert.ok(d instanceof Date);
    assert.equal(d.toISOString().slice(0, 10), '2025-03-30');
  });
});

// ─── FCNA toHijri ───────────────────────────────────────────────────────────

describe('FCNA toHijri', () => {
  it('2025-03-01 = 1446/9/1', () => {
    const h = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
    assert.ok(h !== null);
    assert.equal(h.hy, 1446);
    assert.equal(h.hm, 9);
    assert.equal(h.hd, 1);
  });
});

// ─── FCNA round-trips ───────────────────────────────────────────────────────

describe('FCNA round-trips', () => {
  it('1446/9/1 toGregorian->toHijri', () => {
    const greg = toGregorian(1446, 9, 1, { calendar: 'fcna' });
    assert.ok(greg !== null);
    const hijri = toHijri(greg, { calendar: 'fcna' });
    assert.ok(hijri !== null);
    assert.equal(hijri.hy, 1446);
    assert.equal(hijri.hm, 9);
    assert.equal(hijri.hd, 1);
  });
  it('1446/10/15 toGregorian->toHijri', () => {
    const greg = toGregorian(1446, 10, 15, { calendar: 'fcna' });
    assert.ok(greg !== null);
    const hijri = toHijri(greg, { calendar: 'fcna' });
    assert.ok(hijri !== null);
    assert.equal(hijri.hy, 1446);
    assert.equal(hijri.hm, 10);
    assert.equal(hijri.hd, 15);
  });
});

// ─── FCNA isValid ───────────────────────────────────────────────────────────

describe('FCNA isValid', () => {
  it('1/1/1 = true', () => {
    assert.equal(isValidHijriDate(1, 1, 1, { calendar: 'fcna' }), true);
  });
  it('1600/1/1 = true', () => {
    assert.equal(isValidHijriDate(1600, 1, 1, { calendar: 'fcna' }), true);
  });
  it('0/1/1 = false', () => {
    assert.equal(isValidHijriDate(0, 1, 1, { calendar: 'fcna' }), false);
  });
});

// ─── FCNA daysInMonth invalid month ─────────────────────────────────────────

describe('FCNA daysInMonth', () => {
  it('throws for month 0', () => {
    assert.throws(() => daysInHijriMonth(1446, 0, { calendar: 'fcna' }), /month must be 1-12/);
  });
  it('throws for month 13', () => {
    assert.throws(() => daysInHijriMonth(1446, 13, { calendar: 'fcna' }), /month must be 1-12/);
  });
});

// ─── Registry ───────────────────────────────────────────────────────────────

describe('registry', () => {
  it('listCalendars includes uaq and fcna', () => {
    const cals = listCalendars();
    assert.ok(cals.includes('uaq'));
    assert.ok(cals.includes('fcna'));
  });
  it('getCalendar throws for unknown calendar', () => {
    assert.throws(() => getCalendar('nonexistent'), /Unknown Hijri calendar/);
  });
  it('registerCalendar: custom engine works', () => {
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
});

// ─── Error cases ────────────────────────────────────────────────────────────

describe('error cases', () => {
  it('toHijri throws on non-Date input', () => {
    assert.throws(() => toHijri('2023-03-23'), /Invalid Gregorian date/);
  });
  it('toHijri throws on invalid Date', () => {
    assert.throws(() => toHijri(new Date('invalid')), /Invalid Gregorian date/);
  });
  it('UAQ toGregorian returns null for out-of-range date', () => {
    assert.strictEqual(toGregorian(1317, 1, 1), null);
  });
});
