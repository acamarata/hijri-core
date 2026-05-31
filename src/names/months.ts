// Hijri month names in three forms.
// Index 0 = Muharram (month 1), index 11 = Dhul Hijjah (month 12).

/**
 * Full English transliterations of the 12 Hijri month names.
 *
 * Index 0 corresponds to Muharram (month 1); index 11 to Dhul Hijjah (month 12).
 * Suitable for display in contexts where the full name aids readability.
 *
 * @example
 * const month = hmLong[hijriDate.hm - 1]; // "Ramadan"
 */
export const hmLong = [
  "Muharram", // 1
  "Safar", // 2
  "Rabi'l Awwal", // 3
  "Rabi'l Thani", // 4
  "Jumadal Awwal", // 5
  "Jumadal Thani", // 6
  "Rajab", // 7
  "Sha'ban", // 8
  "Ramadan", // 9
  "Shawwal", // 10
  "Dhul Qi'dah", // 11
  "Dhul Hijjah", // 12
];

/**
 * Medium-length transliterations of the 12 Hijri month names.
 *
 * Shorter than {@link hmLong} but more readable than {@link hmShort}.
 * Useful for compact date labels where space is limited.
 *
 * @example
 * const label = hmMedium[hijriDate.hm - 1]; // "Ramadan"
 */
export const hmMedium = [
  "Muharram",
  "Safar",
  "Rabi1",
  "Rabi2",
  "Jumada1",
  "Jumada2",
  "Rajab",
  "Shaban",
  "Ramadan",
  "Shawwal",
  "Dhul-Qidah",
  "Dhul-Hijjah",
];

/**
 * Three-character short codes for the 12 Hijri months.
 *
 * Designed for narrow columns such as calendar grids or spreadsheet headers.
 * Each code is exactly 3 ASCII characters.
 *
 * @example
 * const abbr = hmShort[hijriDate.hm - 1]; // "Ram"
 */
export const hmShort = [
  "Muh",
  "Saf",
  "Ra1",
  "Ra2",
  "Ju1",
  "Ju2",
  "Raj",
  "Shb",
  "Ram",
  "Shw",
  "DhQ",
  "DhH",
];
