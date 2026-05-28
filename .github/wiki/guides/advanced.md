# Advanced Usage

## Iterating over a Hijri month

Build a calendar grid for a given Hijri month:

```js
import { daysInHijriMonth, toGregorian } from 'hijri-core';

const HY = 1446;
const HM = 9; // Ramadan

const days = daysInHijriMonth(HY, HM);

for (let d = 1; d <= days; d++) {
  const greg = toGregorian(HY, HM, d);
  console.log(`${String(d).padStart(2)} Ramadan — ${greg.toISOString().slice(0, 10)}`);
}
```

## Custom calendar engines

`hijri-core` exposes a registry so you can plug in your own conversion engine — a lunar sighting authority, an adjusted algorithmic calendar, or a custom dataset:

```js
import { registerCalendar, toHijri } from 'hijri-core';

registerCalendar('my-calendar', {
  toHijri(date) {
    // Return { year, month, day, monthName, calendar: 'my-calendar' } or null
    // date is a JS Date; use local components for timezone-safe lookup
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    // ... your logic
    return null;
  },
  toGregorian(hy, hm, hd) {
    // Return a Date (UTC midnight) or null for out-of-range
    return null;
  },
  isValidHijriDate(hy, hm, hd) {
    return false;
  },
  daysInHijriMonth(hy, hm) {
    return 29;
  },
});

// Use it just like the built-in calendars
const result = toHijri(new Date('2025-03-20'), { calendar: 'my-calendar' });
```

## Generating a Ramadan calendar

Print the Gregorian dates for Ramadan across multiple years:

```js
import { toGregorian } from 'hijri-core';

const RAMADAN = 9;

for (let hy = 1440; hy <= 1450; hy++) {
  const start = toGregorian(hy, RAMADAN, 1);
  const end   = toGregorian(hy, RAMADAN + 1, 1);

  if (!start) continue;

  // Ramadan ends the day before Shawwal 1
  const last = new Date(end.getTime() - 86400_000);

  console.log(
    `${hy} AH: ${start.toISOString().slice(0, 10)} — ${last.toISOString().slice(0, 10)}`
  );
}
```

## Date range validation

Before batch-processing a range of dates, check the calendar bounds:

```js
import { toHijri } from 'hijri-core';

function isSupportedDate(date) {
  return toHijri(date) !== null;
}

const dates = [
  new Date('1900-01-01'), // outside UAQ range
  new Date('2000-01-01'), // inside range
  new Date('2077-11-16'), // may be outside future range
];

for (const d of dates) {
  const supported = isSupportedDate(d);
  console.log(`${d.toISOString().slice(0, 10)}: ${supported ? 'supported' : 'out of range'}`);
}
```

## FCNA vs UAQ differences

FCNA and UAQ can differ by one or two days around month transitions:

```js
import { toHijri } from 'hijri-core';

const dates = [
  new Date('2025-03-01'),
  new Date('2025-03-29'),
  new Date('2025-03-30'),
  new Date('2025-03-31'),
];

console.log('Date          UAQ              FCNA');
console.log('-'.repeat(48));

for (const d of dates) {
  const uaq  = toHijri(d, { calendar: 'uaq'  });
  const fcna = toHijri(d, { calendar: 'fcna' });

  const fmtH = (h) => h ? `${h.day}/${h.month}/${h.year}` : 'out of range';
  console.log(`${d.toISOString().slice(0, 10)}  ${fmtH(uaq).padEnd(16)} ${fmtH(fcna)}`);
}
```

## Related pages

- [API Reference](../API-Reference) — full function signatures and types
- [Architecture](../Architecture) — calendar engine interface, table format, accuracy bounds
