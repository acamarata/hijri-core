// UAQ engine: Umm al-Qura calendar (official Saudi Arabian Islamic calendar).
//
// Conversions are table-driven. The reference table covers Hijri years 1318-1500
// (Gregorian 1900-2076). Each entry records the Gregorian date of 1 Muharram and
// a 12-bit days-per-month bitmask. Dates outside that window return null.

import { hDatesTable } from "../data/hDates";
import { MS_PER_DAY, MONTHS_PER_YEAR } from "../constants";
import type { CalendarEngine, HijriDate, HijriYearRecord } from "../types";

/**
 * Binary search for a Hijri year entry in the UAQ table.
 *
 * Returns the entry whose `hy` matches exactly, or null if the year is not
 * present in the table. The table covers Hijri years 1318 through 1501
 * (the final entry is a sentinel with dpm === 0).
 *
 * @param hy - Hijri year to locate
 * @returns the matching table entry, or null if not found
 */
function findYearEntry(hy: number): HijriYearRecord | null {
  let lo = 0;
  let hi = hDatesTable.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    // mid is always within [0, hDatesTable.length-1] by binary search invariant
    const row = hDatesTable[mid]!;
    const midHy = row.hy;
    if (midHy === hy) return row;
    else if (midHy < hy) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

// toHijri interprets the input Date by its UTC calendar day (getUTC* components),
// matching the FCNA engine and the UTC-midnight Dates returned by toGregorian.
// This makes conversions host-timezone-independent and round-trips exact:
//   toHijri(toGregorian(hy, hm, hd)) === { hy, hm, hd }  on any machine.
// To convert a local wall-clock date, pass new Date(Date.UTC(y, m - 1, d)).
function uaqToHijri(date: Date): HijriDate | null {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid Gregorian date");
  }

  const inputUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  // Binary search: find the last table entry whose Gregorian start date <= input.
  let lo = 0;
  let hi = hDatesTable.length - 1;
  let found = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    // mid is always within [0, hDatesTable.length-1] by binary search invariant
    const entry = hDatesTable[mid]!;
    const entryUtc = Date.UTC(entry.gy, entry.gm - 1, entry.gd);

    if (entryUtc <= inputUtc) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  // dpm === 0 is the sentinel entry (hy 1501) marking the upper bound.
  // found is within [0, hDatesTable.length-1]; guard above confirms it's valid.
  if (found === -1 || hDatesTable[found]!.dpm === 0) return null;

  const record = hDatesTable[found]!;
  const startUtc = Date.UTC(record.gy, record.gm - 1, record.gd);
  let remaining = Math.round((inputUtc - startUtc) / MS_PER_DAY);
  let hijriMonth = 0;

  for (let i = 0; i < MONTHS_PER_YEAR; i++) {
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
    return null;
  }

  const record = findYearEntry(hy);
  if (!record) return null;

  let totalDays = 0;

  for (let i = 0; i < hm - 1; i++) {
    totalDays += (record.dpm >> i) & 1 ? 30 : 29;
  }
  totalDays += hd - 1;

  return new Date(Date.UTC(record.gy, record.gm - 1, record.gd) + totalDays * MS_PER_DAY);
}

function uaqIsValid(hy: number, hm: number, hd: number): boolean {
  if (hm < 1 || hm > MONTHS_PER_YEAR || hd < 1) return false;

  const record = findYearEntry(hy);
  if (!record || record.dpm === 0) return false;

  const dim = (record.dpm >> (hm - 1)) & 1 ? 30 : 29;
  return hd <= dim;
}

function uaqDaysInMonth(hy: number, hm: number): number {
  if (hm < 1 || hm > MONTHS_PER_YEAR) {
    throw new RangeError(`month must be 1-12, got ${hm}`);
  }

  const record = findYearEntry(hy);
  if (!record || record.dpm === 0) {
    throw new RangeError(`Hijri year ${hy} is outside the UAQ table range (1318-1500).`);
  }
  return (record.dpm >> (hm - 1)) & 1 ? 30 : 29;
}

export const uaqEngine: CalendarEngine = {
  id: "uaq",
  toHijri: uaqToHijri,
  toGregorian: uaqToGregorian,
  isValid: uaqIsValid,
  daysInMonth: uaqDaysInMonth,
};
