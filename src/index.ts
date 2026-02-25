// Register built-in engines at module load.
import { uaqEngine } from './engines/uaq';
import { fcnaEngine } from './engines/fcna';
import { registerCalendar } from './registry';

registerCalendar('uaq', uaqEngine);
registerCalendar('fcna', fcnaEngine);

// Registry
export { registerCalendar, getCalendar, listCalendars } from './registry';

// Types
export type { HijriDate, HijriYearRecord, CalendarEngine, ConversionOptions } from './types';

// Data
export { hDatesTable } from './data/hDates';

// Names
export { hmLong, hmMedium, hmShort } from './names/months';
export { hwLong, hwShort, hwNumeric } from './names/weekdays';

// Convenience wrappers
import { getCalendar } from './registry';
import type { HijriDate, ConversionOptions } from './types';

export function toHijri(date: Date, options?: ConversionOptions): HijriDate | null {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Gregorian date');
  }
  return getCalendar(options?.calendar ?? 'uaq').toHijri(date);
}

export function toGregorian(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions,
): Date | null {
  return getCalendar(options?.calendar ?? 'uaq').toGregorian(hy, hm, hd);
}

export function isValidHijriDate(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions,
): boolean {
  return getCalendar(options?.calendar ?? 'uaq').isValid(hy, hm, hd);
}

export function daysInHijriMonth(
  hy: number,
  hm: number,
  options?: ConversionOptions,
): number {
  return getCalendar(options?.calendar ?? 'uaq').daysInMonth(hy, hm);
}
