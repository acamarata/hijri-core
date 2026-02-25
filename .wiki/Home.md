# hijri-core

Zero-dependency Hijri calendar engine for JavaScript and TypeScript.

Two built-in calendars: Umm al-Qura (UAQ) and FCNA/ISNA. Additional calendars can be registered at runtime through the engine registry.

## Quick example

```typescript
import { toHijri, toGregorian } from 'hijri-core';

// UAQ (default)
const hijri = toHijri(new Date(2025, 2, 1));
// { hy: 1446, hm: 9, hd: 1 }

const greg = toGregorian(1446, 9, 1);
// Date: 2025-03-01

// FCNA
const hijriFcna = toHijri(new Date('2025-03-01'), { calendar: 'fcna' });
const gregFcna  = toGregorian(1446, 9, 1, { calendar: 'fcna' });
```

## Custom calendar registration

```typescript
import { registerCalendar, toHijri, type CalendarEngine } from 'hijri-core';

const myEngine: CalendarEngine = {
  id: 'my-calendar',
  toHijri: (date) => ({ hy: 1446, hm: 1, hd: 1 }),
  toGregorian: (hy, hm, hd) => new Date(),
  isValid: (hy, hm, hd) => hy > 0 && hm >= 1 && hm <= 12 && hd >= 1,
  daysInMonth: (hy, hm) => 30,
};

registerCalendar('my-calendar', myEngine);
toHijri(new Date(), { calendar: 'my-calendar' });
```

## Key facts

- Zero dependencies
- Dual CJS + ESM build
- Full TypeScript declarations
- Extensible calendar registry
- UAQ table covers 1318-1500 H (1900-2076 CE)
- FCNA engine works for any year using Meeus astronomical algorithms

## Pages

- [API Reference](API-Reference)
- [Architecture](Architecture)
