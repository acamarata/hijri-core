# Architecture

## Calendar registry pattern

The library separates the conversion API from calendar implementations. A registry maps string keys to engine objects. This allows adding N calendar systems without modifying core code.

```
toHijri(date, { calendar: 'uaq' })
         |
         v
  getCalendar('uaq')  <-- Map<string, CalendarEngine>
         |
         v
  uaqEngine.toHijri(date)
```

The two built-in engines register at module load time. Custom engines register at any point before use.

## CalendarEngine interface

Every calendar engine must implement four methods:

```typescript
interface CalendarEngine {
  readonly id: string;
  toHijri(date: Date): HijriDate | null;
  toGregorian(hy: number, hm: number, hd: number): Date | null;
  isValid(hy: number, hm: number, hd: number): boolean;
  daysInMonth(hy: number, hm: number): number;
}
```

Return `null` when a date is outside the engine's supported range. Throw `Error` when given structurally invalid input (malformed Date, or Hijri params that fail basic range checks).

## UAQ engine

The Umm al-Qura calendar is the official Islamic calendar of Saudi Arabia. Month start dates are computed by observation and committee decision, not by a fixed astronomical formula. The reference table encodes the result of those decisions.

### Data format

Each `HijriYearRecord` stores:
- The Gregorian date of 1 Muharram for that Hijri year
- A 12-bit `dpm` bitmask: bit `i` (0-indexed) = month length for month `i+1`. Bit 1 = 30 days, bit 0 = 29 days

The table covers Hijri years 1318-1500 (Gregorian 1900-2076). A sentinel entry at Hijri year 1501 with `dpm = 0` marks the upper boundary.

### toHijri (Gregorian to Hijri)

1. Normalize input to UTC midnight using local date components (`getFullYear`, `getMonth`, `getDate`). This makes the result independent of the host timezone.
2. Binary search the table for the last entry whose Gregorian start date is before or on the input.
3. The sentinel check (`dpm === 0`) rejects out-of-range inputs.
4. Walk the `dpm` bitmask to consume months until the remaining day count falls within a single month.

### toGregorian (Hijri to Gregorian)

1. Validate with `uaqIsValid`.
2. Binary search the table for the exact Hijri year.
3. Sum month lengths from the `dpm` bitmask for months 1 through `hm - 1`.
4. Add `hd - 1` to get total days offset.
5. Return `new Date(Date.UTC(gy, gm - 1, gd) + totalDays * 86_400_000)`. Pure millisecond arithmetic, no date library needed.

### Binary search

Both `toHijri` and `toGregorian` use O(log n) binary search over the 184-entry table. The UAQ table is ordered by both Hijri year and Gregorian date (they are monotonically increasing together).

## FCNA engine

The Fiqh Council of North America uses a global astronomical criterion rather than local sighting or a pre-computed table.

### Criterion

If the new moon conjunction occurs before 12:00 noon UTC on calendar day D:
- The new Hijri month begins at midnight starting day D+1.

If at or after 12:00 noon UTC:
- The new Hijri month begins at midnight starting day D+2.

This makes every Hijri month start deterministic from the astronomical conjunction time.

### New moon calculation

New moon Julian Day Ephemeris (JDE) comes from Jean Meeus, _Astronomical Algorithms_, 2nd ed., Chapter 49. The formula includes the mean JDE (Eq. 49.1), eccentricity corrections, and 24 planetary perturbation terms. Accuracy is within a few minutes for 1000-3000 CE.

The k index in Meeus numbering counts synodic months from a reference point near 2000-01-06. The Islamic epoch anchor (`K_EPOCH = -17037`) maps Meeus k to Hijri month numbers.

### UAQ anchor

For Hijri years in the UAQ table (1318-1500 H), the engine uses the table's 1 Muharram date as the starting anchor for finding the nearest new moon. This gives FCNA and UAQ consistent alignment for those years. For years outside the table, the engine estimates the anchor from the Islamic epoch plus mean synodic month count.

### toHijri (FCNA)

1. Convert input to UTC midnight (FCNA criterion is UTC-based, so UTC components are correct).
2. Estimate the approximate k index from 15 days before the input date.
3. Search k0-1, k0, k0+1 for the FCNA month containing the input date.
4. Map the k index back to a Hijri (hy, hm) pair via `K_EPOCH` offset.

### toGregorian (FCNA)

1. Compute the UAQ anchor for (hy, hm).
2. Find the nearest new moon to that anchor.
3. Apply the FCNA criterion to get the month start midnight.
4. Add `hd - 1` days in milliseconds.

## Writing a custom engine

Minimal working example:

```typescript
import { registerCalendar, type CalendarEngine } from 'hijri-core';

// A fixed-offset arithmetic calendar (not accurate, for illustration only).
function hijriFromMs(ms: number) {
  const HIJRI_EPOCH_MS = -42521974440000; // approx
  const MEAN_MONTH_MS  = 29.530588861 * 86_400_000;
  const months = Math.floor((ms - HIJRI_EPOCH_MS) / MEAN_MONTH_MS);
  const hy     = Math.floor(months / 12) + 1;
  const hm     = (months % 12) + 1;
  const hd     = Math.floor(((ms - HIJRI_EPOCH_MS) % MEAN_MONTH_MS) / 86_400_000) + 1;
  return { hy, hm: hm <= 0 ? hm + 12 : hm, hd };
}

const arithmeticEngine: CalendarEngine = {
  id: 'arithmetic',
  toHijri: (date) => hijriFromMs(date.getTime()),
  toGregorian: (hy, hm, hd) => null, // left as an exercise
  isValid: (hy, hm, hd) => hy > 0 && hm >= 1 && hm <= 12 && hd >= 1 && hd <= 30,
  daysInMonth: (hy, hm) => (hm % 2 === 1 || hm === 12) ? 30 : 29,
};

registerCalendar('arithmetic', arithmeticEngine);
```

Any engine registered this way works with all four convenience functions (`toHijri`, `toGregorian`, `isValidHijriDate`, `daysInHijriMonth`) by passing `{ calendar: 'arithmetic' }`.

---

[Home](Home) | [API Reference](API-Reference)
