// UAQ engine: Umm al-Qura calendar (official Saudi Arabian Islamic calendar).
//
// Conversions are table-driven. The reference table covers Hijri years 1318-1500
// (Gregorian 1900-2076). Each entry records the Gregorian date of 1 Muharram and
// a 12-bit days-per-month bitmask. Dates outside that window return null.

import { hDatesTable } from '../data/hDates';
import type { CalendarEngine, HijriDate } from '../types';

// toHijri uses local date components (getFullYear, getMonth, getDate) so that
// the calendar-date lookup is timezone-safe regardless of the host environment.
function uaqToHijri(date: Date): HijriDate | null {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Gregorian date');
  }

  const inputUtc = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Binary search: find the last table entry whose Gregorian start date <= input.
  let lo = 0;
  let hi = hDatesTable.length - 1;
  let found = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const entry = hDatesTable[mid];
    const entryUtc = Date.UTC(entry.gy, entry.gm - 1, entry.gd);

    if (entryUtc <= inputUtc) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  // dpm === 0 is the sentinel entry (hy 1501) marking the upper bound.
  if (found === -1 || hDatesTable[found].dpm === 0) return null;

  const record = hDatesTable[found];
  const startUtc = Date.UTC(record.gy, record.gm - 1, record.gd);
  let remaining = Math.round((inputUtc - startUtc) / 86_400_000);
  let hijriMonth = 0;

  for (let i = 0; i < 12; i++) {
    const dim = (record.dpm >> i) & 1 ? 30 : 29;
    if (remaining < dim) {
      hijriMonth = i + 1;
      break;
    }
    remaining -= dim;
  }

  if (hijriMonth === 0) return null;

  return { hy: record.hy, hm: hijriMonth, hd: remaining + 1 };
}

function uaqToGregorian(hy: number, hm: number, hd: number): Date | null {
  if (!uaqIsValid(hy, hm, hd)) {
    throw new Error('Invalid Hijri date');
  }

  // Binary search on hy.
  let lo = 0;
  let hi = hDatesTable.length - 1;
  let found = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const midHy = hDatesTable[mid].hy;
    if (midHy === hy)     { found = mid; break; }
    else if (midHy < hy)  lo = mid + 1;
    else                   hi = mid - 1;
  }

  if (found === -1) return null;

  const record = hDatesTable[found];
  let totalDays = 0;

  for (let i = 0; i < hm - 1; i++) {
    totalDays += (record.dpm >> i) & 1 ? 30 : 29;
  }
  totalDays += hd - 1;

  return new Date(Date.UTC(record.gy, record.gm - 1, record.gd) + totalDays * 86_400_000);
}

function uaqIsValid(hy: number, hm: number, hd: number): boolean {
  if (hm < 1 || hm > 12 || hd < 1) return false;

  let lo = 0;
  let hi = hDatesTable.length - 1;
  let found = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const midHy = hDatesTable[mid].hy;
    if (midHy === hy)     { found = mid; break; }
    else if (midHy < hy)  lo = mid + 1;
    else                   hi = mid - 1;
  }

  if (found === -1 || hDatesTable[found].dpm === 0) return false;

  const dim = (hDatesTable[found].dpm >> (hm - 1)) & 1 ? 30 : 29;
  return hd <= dim;
}

function uaqDaysInMonth(hy: number, hm: number): number {
  let lo = 0;
  let hi = hDatesTable.length - 1;
  let found = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const midHy = hDatesTable[mid].hy;
    if (midHy === hy)     { found = mid; break; }
    else if (midHy < hy)  lo = mid + 1;
    else                   hi = mid - 1;
  }

  if (found === -1 || hDatesTable[found].dpm === 0) return 0;
  return (hDatesTable[found].dpm >> (hm - 1)) & 1 ? 30 : 29;
}

export const uaqEngine: CalendarEngine = {
  id: 'uaq',
  toHijri:    uaqToHijri,
  toGregorian: uaqToGregorian,
  isValid:    uaqIsValid,
  daysInMonth: uaqDaysInMonth,
};
