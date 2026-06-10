# hijri-core

[![npm](https://img.shields.io/npm/v/hijri-core.svg)](https://www.npmjs.com/package/hijri-core)
[![CI](https://github.com/acamarata/hijri-core/actions/workflows/ci.yml/badge.svg)](https://github.com/acamarata/hijri-core/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/hijri-core.svg)](LICENSE)
[![wiki](https://img.shields.io/badge/docs-wiki-blue)](https://github.com/acamarata/hijri-core/wiki)

Zero-dependency Hijri calendar engine for JavaScript and TypeScript. Supports the Umm al-Qura (UAQ) and FCNA/ISNA calendars out of the box. A pluggable registry lets you add custom calendar implementations at runtime.

## Installation

```bash
npm install hijri-core
```

## Quick Start

```typescript
import { toHijri, toGregorian, isValidHijriDate, daysInHijriMonth } from 'hijri-core';

// Gregorian to Hijri (UAQ, default)
const hijri = toHijri(new Date(2025, 2, 1));
// { hy: 1446, hm: 9, hd: 1 }

// Hijri to Gregorian
const greg = toGregorian(1446, 9, 1);
// Date: 2025-03-01

// FCNA/ISNA calendar
toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
toGregorian(1446, 9, 1, { calendar: 'fcna' });

// Validation and month length
isValidHijriDate(1444, 9, 1); // true
daysInHijriMonth(1444, 9);    // 29
```

## Day boundaries and time zones

hijri-core maps civil calendar days one-to-one (tabular UAQ, computed FCNA). The religious Hijri day beginning at sunset is intentionally out of scope.

`toHijri` reads the input Date's UTC calendar day (`getUTCFullYear`, `getUTCMonth`, `getUTCDate`). `toGregorian` returns a UTC-midnight Date. This means round-trips are exact and results are identical on every machine regardless of local time zone:

```typescript
// Safe on any host — UTC-explicit construction
const greg = toGregorian(1446, 9, 1);          // 2025-03-01T00:00:00.000Z
const back = toHijri(greg!);                   // { hy: 1446, hm: 9, hd: 1 } — always exact

// ISO date-only strings parse as UTC midnight — correct
toHijri(new Date('2025-03-01'));               // { hy: 1446, hm: 9, hd: 1 }

// For a local wall-clock date, construct explicitly in UTC
toHijri(new Date(Date.UTC(2025, 2, 1)));       // { hy: 1446, hm: 9, hd: 1 }

// Avoid local Date constructor for date-only conversions — breaks on UTC+13
// toHijri(new Date(2025, 2, 1))  ← do NOT do this
```

## Custom Calendars

Implement `CalendarEngine` and call `registerCalendar('my-id', engine)`. Pass `{ calendar: 'my-id' }` to any conversion function.

## TypeScript

```typescript
import type { HijriDate, HijriYearRecord, CalendarEngine, ConversionOptions } from 'hijri-core';
```

## Documentation

Full API reference, architecture notes, and calendar background: [GitHub Wiki](https://github.com/acamarata/hijri-core/wiki)

## Related

- [luxon-hijri](https://github.com/acamarata/luxon-hijri): Hijri formatting with Luxon
- [dayjs-hijri-plus](https://github.com/acamarata/dayjs-hijri-plus): Day.js Hijri plugin
- [date-fns-hijri](https://github.com/acamarata/date-fns-hijri): date-fns Hijri helpers
- [moment-hijri-plus](https://github.com/acamarata/moment-hijri-plus): Moment.js Hijri plugin
- [temporal-hijri](https://github.com/acamarata/temporal-hijri): Temporal API Hijri support

## Acknowledgments

The Umm al-Qura table is derived from data published by the King Abdulaziz City for Science and Technology (KACST). The FCNA new moon algorithm follows Jean Meeus, "Astronomical Algorithms," 2nd ed., Chapter 49.

## License

MIT. Copyright (c) 2024-2026 Aric Camarata.
