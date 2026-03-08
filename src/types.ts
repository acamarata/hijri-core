export interface HijriDate {
  hy: number; // Hijri year
  hm: number; // Hijri month (1-12)
  hd: number; // Hijri day (1-30)
}

export interface HijriYearRecord {
  hy: number; // Hijri year
  dpm: number; // days-per-month bitmask (bit 0 = month 1: 1 -> 30 days, 0 -> 29 days)
  gy: number; // Gregorian year of 1 Muharram
  gm: number; // Gregorian month of 1 Muharram (1-based)
  gd: number; // Gregorian day of 1 Muharram
}

// Any calendar engine must implement this interface.
export interface CalendarEngine {
  readonly id: string;
  toHijri(date: Date): HijriDate | null;
  /** Returns null for invalid or out-of-range input. Never throws. */
  toGregorian(hy: number, hm: number, hd: number): Date | null;
  isValid(hy: number, hm: number, hd: number): boolean;
  daysInMonth(hy: number, hm: number): number;
}

export interface ConversionOptions {
  calendar?: string; // defaults to 'uaq'
}
