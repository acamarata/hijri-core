/**
 * A Hijri date triple.
 *
 * All three fields are required. Month and day are 1-based.
 * The year is a Hijri (AH) year number, e.g. 1446.
 *
 * @example
 * const d: HijriDate = { hy: 1446, hm: 9, hd: 1 }; // 1 Ramadan 1446 AH
 */
export interface HijriDate {
  hy: number; // Hijri year
  hm: number; // Hijri month (1-12)
  hd: number; // Hijri day (1-30)
}

/**
 * One row in the Umm al-Qura reference table.
 *
 * The table covers Hijri years 1318-1500 (Gregorian 1900-2076). A sentinel row
 * at hy=1501 with dpm=0 marks the upper boundary and is used to detect
 * out-of-range inputs without a separate bounds check.
 *
 * The `dpm` bitmask encodes month lengths for all 12 months:
 * bit i (0-indexed from bit 0) = month i+1; 1 = 30 days, 0 = 29 days.
 */
export interface HijriYearRecord {
  hy: number; // Hijri year
  dpm: number; // 12-bit days-per-month bitmask (bit 0 = month 1: 1 -> 30 days, 0 -> 29 days)
  gy: number; // Gregorian year of 1 Muharram
  gm: number; // Gregorian month of 1 Muharram (1-based)
  gd: number; // Gregorian day of 1 Muharram
}

/**
 * Interface every calendar engine must implement.
 *
 * Return `null` when a date is outside the engine's supported range.
 * Throw `Error` for structurally invalid input (malformed Date, month outside 1-12, etc.).
 * Never throw for out-of-range inputs — return `null` instead so callers can handle
 * the boundary gracefully without try/catch.
 */
export interface CalendarEngine {
  readonly id: string;
  toHijri(date: Date): HijriDate | null;
  /** Returns null for invalid or out-of-range input. Never throws. */
  toGregorian(hy: number, hm: number, hd: number): Date | null;
  isValid(hy: number, hm: number, hd: number): boolean;
  daysInMonth(hy: number, hm: number): number;
}

/**
 * Options accepted by the convenience conversion functions.
 *
 * Omitting `calendar` defaults to `'uaq'` (Umm al-Qura).
 * Pass any name previously given to {@link registerCalendar} to use a custom engine.
 */
export interface ConversionOptions {
  calendar?: string; // defaults to 'uaq'
}
