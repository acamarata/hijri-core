// Built-in engines are registered at module load so that 'uaq' and 'fcna' are
// available immediately on import. This module-level side effect is intentional
// and documented in the sideEffects field of package.json.
import { uaqEngine } from "./engines/uaq";
import { fcnaEngine } from "./engines/fcna";
import { registerCalendar } from "./registry";

registerCalendar("uaq", uaqEngine);
registerCalendar("fcna", fcnaEngine);

// Registry
export { registerCalendar, getCalendar, listCalendars } from "./registry";

// Constants
export { MS_PER_DAY, MONTHS_PER_YEAR } from "./constants";

// Types
export type { HijriDate, HijriYearRecord, CalendarEngine, ConversionOptions } from "./types";

// Data
export { hDatesTable } from "./data/hDates";

// Names
export { hmLong, hmMedium, hmShort } from "./names/months";
export { hwLong, hwShort, hwNumeric } from "./names/weekdays";

// Convenience wrappers
import { getCalendar } from "./registry";
import type { HijriDate, ConversionOptions } from "./types";

/**
 * Convert a Gregorian date to a Hijri date.
 *
 * Uses the UAQ (Umm al-Qura) calendar by default. Pass `{ calendar: 'fcna' }`
 * or any registered calendar name via options to use a different engine.
 *
 * **Time-zone contract:** the Date is interpreted by its UTC calendar day
 * (`getUTCFullYear`, `getUTCMonth`, `getUTCDate`). `toGregorian` returns a
 * UTC-midnight Date, so round-trips are exact and results are identical on
 * every host regardless of its local time zone.
 *
 * To convert a local wall-clock date, pass `new Date(Date.UTC(y, m - 1, d))`.
 * Note that `new Date("2025-03-01")` parses as UTC midnight, which is correct.
 *
 * @param date - a valid JavaScript Date object
 * @param options - conversion options (calendar engine selection)
 * @returns the corresponding Hijri date, or null if the date is out of range
 * @throws {Error} if `date` is not a valid Date instance
 */
export function toHijri(date: Date, options?: ConversionOptions): HijriDate | null {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid Gregorian date");
  }
  return getCalendar(options?.calendar ?? "uaq").toHijri(date);
}

/**
 * Convert a Hijri date to a Gregorian date.
 *
 * Uses the UAQ calendar by default.
 *
 * @param hy - Hijri year
 * @param hm - Hijri month (1-12)
 * @param hd - Hijri day (1-30)
 * @param options - conversion options (calendar engine selection)
 * @returns a Date in UTC, or null if the input is invalid or out of range
 */
export function toGregorian(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions,
): Date | null {
  return getCalendar(options?.calendar ?? "uaq").toGregorian(hy, hm, hd);
}

/**
 * Check whether a Hijri date is valid for the given calendar engine.
 *
 * @param hy - Hijri year
 * @param hm - Hijri month (1-12)
 * @param hd - Hijri day (1-30)
 * @param options - conversion options (calendar engine selection)
 * @returns true if the date is valid
 */
export function isValidHijriDate(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions,
): boolean {
  return getCalendar(options?.calendar ?? "uaq").isValid(hy, hm, hd);
}

/**
 * Return the number of days in a given Hijri month.
 *
 * @param hy - Hijri year
 * @param hm - Hijri month (1-12)
 * @param options - conversion options (calendar engine selection)
 * @returns 29 or 30
 * @throws {RangeError} if the month or year is out of range
 */
export function daysInHijriMonth(hy: number, hm: number, options?: ConversionOptions): number {
  return getCalendar(options?.calendar ?? "uaq").daysInMonth(hy, hm);
}

// ── Opt-in anonymous telemetry ────────────────────────────────────────────────
// Off by default. Enable: ACAMARATA_TELEMETRY=1
// What is sent + how to disable: https://github.com/acamarata/telemetry/blob/main/TELEMETRY.md
import("@acamarata/telemetry")
  .then(({ track }) => track("load", { package: "hijri-core", version: "1.0.4" }))
  .catch(() => {
    // telemetry not installed or disabled — that's fine
  });
