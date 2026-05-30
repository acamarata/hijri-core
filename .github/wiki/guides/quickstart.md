# Quick Start

Five minutes from install to Hijri date conversions.

## Install

```sh
npm install hijri-core
```

## Convert Gregorian to Hijri

```js
import { toHijri } from 'hijri-core';

const d = new Date('2025-03-20');
const h = toHijri(d);

console.log(h);
// { hy: 1446, hm: 9, hd: 20 }

console.log(`${h.hd} Ramadan ${h.hy} AH`);
// 20 Ramadan 1446 AH
```

## Convert Hijri to Gregorian

```js
import { toGregorian } from 'hijri-core';

const greg = toGregorian(1446, 9, 1);

console.log(greg.toISOString().slice(0, 10));
// 2025-03-01
```

## Check a Hijri date is valid

```js
import { isValidHijriDate } from 'hijri-core';

isValidHijriDate(1446, 9, 30);  // true  — Ramadan 1446 has 30 days
isValidHijriDate(1446, 9, 31);  // false — no 31st day in any Hijri month
isValidHijriDate(1446, 13, 1);  // false — Hijri calendar has only 12 months
```

## Days in a month

```js
import { daysInHijriMonth } from 'hijri-core';

daysInHijriMonth(1446, 9);  // 30  (Ramadan 1446)
daysInHijriMonth(1446, 10); // 29  (Shawwal 1446)
```

## Choosing a calendar

Two calendars are built in:

| Name | Description |
| ---- | ----------- |
| `'uaq'` | Umm al-Qura (Saudi Arabia, official tabular calendar) — **default** |
| `'fcna'` | Fiqh Council of North America (astronomical computation for North America) |

```js
import { toHijri } from 'hijri-core';

const d = new Date('2025-03-20');

const uaq  = toHijri(d, { calendar: 'uaq'  });
const fcna = toHijri(d, { calendar: 'fcna' });

console.log(uaq.hd,  uaq.hm,  uaq.hy);
console.log(fcna.hd, fcna.hm, fcna.hy);
```

## Out-of-range dates

Both built-in calendars cover a finite date range. `toHijri` and `toGregorian` return `null` when the input falls outside the supported range:

```js
import { toHijri } from 'hijri-core';

const result = toHijri(new Date('1800-01-01'));
if (result === null) {
  console.log('Date outside calendar range');
}
```

## Next steps

- [API Reference](../API-Reference) — all functions and types
- [Advanced Guide](advanced) — custom calendar engines, iteration, Ramadan calendars
- [Architecture](../Architecture) — calendar engine design, table format
