// Hijri weekday names.
// Index 0 = Sunday, index 6 = Saturday (matching JS Date.getDay()).

/**
 * Full Arabic-transliterated names for the seven days of the week.
 *
 * Index alignment matches `Date.prototype.getDay()`:
 * index 0 = Sunday, index 6 = Saturday.
 *
 * @example
 * const dayName = hwLong[gregorianDate.getDay()]; // "Yawm al-Jum`a"
 */
export const hwLong = [
  'Yawm al-Ahad', // Sunday
  'Yawm al-Ithnayn', // Monday
  "Yawm ath-Thulatha'", // Tuesday
  "Yawm al-Arba`a'", // Wednesday
  'Yawm al-Khamis', // Thursday
  'Yawm al-Jum`a', // Friday
  'Yawm as-Sabt', // Saturday
];

/**
 * Short single-word transliterations for the seven days of the week.
 *
 * Index alignment matches `Date.prototype.getDay()`:
 * index 0 = Sunday, index 6 = Saturday.
 *
 * @example
 * const abbr = hwShort[gregorianDate.getDay()]; // "Jum`a"
 */
export const hwShort = [
  'Ahad', // Sunday
  'Ithn', // Monday
  'Thul', // Tuesday
  'Arba', // Wednesday
  'Kham', // Thursday
  'Jum`a', // Friday
  'Sabt', // Saturday
];

/**
 * Numeric weekday values: 1 = Sunday through 7 = Saturday.
 *
 * This follows the ISO 8601 convention where Monday = 1, but offset by one
 * to match the Islamic numbering where Sunday is the first day of the week.
 * Index alignment matches `Date.prototype.getDay()`.
 */
// Numeric representation: 1 = Sunday, 7 = Saturday.
export const hwNumeric = [1, 2, 3, 4, 5, 6, 7];
