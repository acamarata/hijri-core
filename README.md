# hijri-core

[![npm](https://img.shields.io/npm/v/hijri-core.svg)](https://www.npmjs.com/package/hijri-core)
[![CI](https://github.com/acamarata/hijri-core/actions/workflows/ci.yml/badge.svg)](https://github.com/acamarata/hijri-core/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/hijri-core.svg)](LICENSE)

Zero-dependency Hijri calendar engine. Supports the Umm al-Qura (UAQ) and FCNA/ISNA calendars out of the box. Extensible via a calendar registry for custom implementations.

## Installation

```bash
npm install hijri-core
# or
pnpm add hijri-core
```

## Quick Start

```typescript
import { toHijri, toGregorian, isValidHijriDate, daysInHijriMonth } from 'hijri-core';

// Gregorian to Hijri (UAQ, default)
const hijri = toHijri(new Date(2025, 2, 1));
// { hy: 1446, hm: 9, hd: 1 }

// Hijri to Gregorian (UAQ)
const greg = toGregorian(1446, 9, 1);
// Date: 2025-03-01

// FCNA/ISNA calendar
const hijriFcna = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
const gregFcna = toGregorian(1446, 9, 1, { calendar: 'fcna' });

// Validation and month length
isValidHijriDate(1444, 9, 1); // true
daysInHijriMonth(1444, 9); // 29
```

### Custom Calendar

```typescript
import { registerCalendar, toHijri, type CalendarEngine } from 'hijri-core';

const myEngine: CalendarEngine = {
  id: 'my-calendar',
  toHijri: (date) => {
    /* your logic */ return { hy: 1446, hm: 1, hd: 1 };
  },
  toGregorian: (hy, hm, hd) => {
    /* your logic */ return new Date();
  },
  isValid: (hy, hm, hd) => hy > 0 && hm >= 1 && hm <= 12 && hd >= 1,
  daysInMonth: (hy, hm) => 30,
};

registerCalendar('my-calendar', myEngine);

const result = toHijri(new Date(), { calendar: 'my-calendar' });
```

## API

### Conversion functions

| Function                              | Parameters                                   | Returns             | Notes                         |
| ------------------------------------- | -------------------------------------------- | ------------------- | ----------------------------- |
| `toHijri(date, opts?)`                | `Date`, `ConversionOptions?`                 | `HijriDate \| null` | Throws on invalid Date        |
| `toGregorian(hy, hm, hd, opts?)`      | `number, number, number, ConversionOptions?` | `Date \| null`      | Returns null on invalid input |
| `isValidHijriDate(hy, hm, hd, opts?)` | `number, number, number, ConversionOptions?` | `boolean`           |                               |
| `daysInHijriMonth(hy, hm, opts?)`     | `number, number, ConversionOptions?`         | `number`            |                               |

`ConversionOptions.calendar` defaults to `'uaq'`. Pass `'fcna'` or any registered calendar name.

### Registry functions

| Function                         | Parameters               | Returns          |
| -------------------------------- | ------------------------ | ---------------- |
| `registerCalendar(name, engine)` | `string, CalendarEngine` | `void`           |
| `getCalendar(name)`              | `string`                 | `CalendarEngine` |
| `listCalendars()`                | none                     | `string[]`       |

### Data exports

| Export        | Type                | Description                                    |
| ------------- | ------------------- | ---------------------------------------------- |
| `hDatesTable` | `HijriYearRecord[]` | Full Umm al-Qura reference table (184 entries) |
| `hmLong`      | `string[]`          | Long month names (e.g., "Ramadan")             |
| `hmMedium`    | `string[]`          | Medium month names (e.g., "Ramadan")           |
| `hmShort`     | `string[]`          | Short month names (e.g., "Ram")                |
| `hwLong`      | `string[]`          | Long weekday names                             |
| `hwShort`     | `string[]`          | Short weekday names                            |
| `hwNumeric`   | `number[]`          | Weekday numbers (1 = Sunday)                   |

## Custom Calendars

Implement the `CalendarEngine` interface to add any calendar system:

```typescript
interface CalendarEngine {
  readonly id: string;
  toHijri(date: Date): HijriDate | null;
  toGregorian(hy: number, hm: number, hd: number): Date | null;
  isValid(hy: number, hm: number, hd: number): boolean;
  daysInMonth(hy: number, hm: number): number;
}
```

Register with `registerCalendar('my-id', myEngine)`. Then pass `{ calendar: 'my-id' }` to any conversion function.

## Compatibility

- Node.js 20, 22, 24
- Modern browsers (ESM build)
- CommonJS and ESM

## TypeScript

```typescript
import type { HijriDate, HijriYearRecord, CalendarEngine, ConversionOptions } from 'hijri-core';
```

## Documentation

Full API reference and architecture notes: [GitHub Wiki](https://github.com/acamarata/hijri-core/wiki)

## Related

- [luxon-hijri](https://github.com/acamarata/luxon-hijri) - Hijri formatting with Luxon
- [dayjs-hijri-plus](https://github.com/acamarata/dayjs-hijri-plus) - Day.js Hijri plugin
- [date-fns-hijri](https://github.com/acamarata/date-fns-hijri) - date-fns Hijri helpers
- [moment-hijri-plus](https://github.com/acamarata/moment-hijri-plus) - Moment.js Hijri plugin
- [temporal-hijri](https://github.com/acamarata/temporal-hijri) - Temporal API Hijri support

## License

MIT. Copyright (c) 2024-2026 Aric Camarata.
