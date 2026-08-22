/**
 * Generates the cross-language parity fixture consumed by the Dart port.
 *
 * `hijri-core` and `hijri_core` are transcriptions of the same tabular calendar data and
 * arithmetic, and must agree exactly. This script writes the output of THIS package across
 * both supported calendars and a wide date span; `hijri_core` asserts every value in
 * `test/parity_test.dart`.
 *
 * Usage, from the repository root:
 *
 *   pnpm build
 *   node tool/generate-parity-fixture.mjs > ../hijri-core-dart/test/fixtures/cross_language_golden.json
 *
 * Regenerate only when an intentional data or algorithm change lands in both ports. If the
 * Dart suite fails against an unchanged fixture, that is the divergence it exists to catch —
 * fix the port, do not refresh the fixture.
 */

import { toHijri, toGregorian, daysInHijriMonth, isValidHijriDate, listCalendars } from "../dist/index.mjs";

const calendars = listCalendars();

/** Gregorian dates: month boundaries, leap days, and the ends of the supported range. */
const gregorian = [];
for (let y = 1938; y <= 2076; y += 6) {
  for (const [m, d] of [[0, 1], [1, 28], [5, 15], [11, 31]]) {
    gregorian.push(Date.UTC(y, m, d));
  }
}
// Leap days, where an off-by-one in day counting shows up first.
for (const y of [1940, 2000, 2024, 2048]) gregorian.push(Date.UTC(y, 1, 29));

const out = { calendars, toHijri: [], toGregorian: [], monthLengths: [] };

for (const cal of calendars) {
  for (const ms of gregorian) {
    const d = new Date(ms);
    const h = toHijri(d, { calendar: cal });
    out.toHijri.push({ cal, g: d.toISOString().slice(0, 10), h: h ? [h.hy, h.hm, h.hd] : null });
  }

  // Hijri -> Gregorian across the same span, plus every month of two full years so a
  // month-length table error cannot hide between samples.
  for (let hy = 1360; hy <= 1500; hy += 7) {
    for (const hm of [1, 6, 12]) {
      const g = toGregorian(hy, hm, 1, { calendar: cal });
      out.toGregorian.push({ cal, h: [hy, hm, 1], g: g ? g.toISOString().slice(0, 10) : null });
    }
  }
  for (const hy of [1447, 1448]) {
    for (let hm = 1; hm <= 12; hm++) {
      out.monthLengths.push({ cal, hy, hm, days: daysInHijriMonth(hy, hm, { calendar: cal }) });
      const g = toGregorian(hy, hm, 1, { calendar: cal });
      out.toGregorian.push({ cal, h: [hy, hm, 1], g: g ? g.toISOString().slice(0, 10) : null });
    }
  }
}

// Validity edge cases: day 30 of a 29-day month, month 13, day 0.
out.validity = [];
for (const cal of calendars) {
  for (const [hy, hm, hd] of [[1448, 3, 30], [1448, 3, 29], [1448, 13, 1], [1448, 1, 0], [1448, 12, 30]]) {
    out.validity.push({ cal, h: [hy, hm, hd], valid: isValidHijriDate(hy, hm, hd, { calendar: cal }) });
  }
}

console.log(JSON.stringify(out, null, 0));
