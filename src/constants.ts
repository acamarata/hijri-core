/**
 * Milliseconds in one day (24 * 60 * 60 * 1000).
 *
 * Used internally for day-offset arithmetic when converting between Gregorian
 * timestamps and Hijri dates. Exposed as a public constant so custom engine
 * authors can share the same value without redefining it.
 */
export const MS_PER_DAY = 86_400_000;

/**
 * Number of months in a Hijri year.
 *
 * The Islamic calendar is purely lunar: 12 months of 29 or 30 days each,
 * totalling 354 or 355 days per year. This constant is 12.
 */
export const MONTHS_PER_YEAR = 12;
