# API Reference

## Conversion functions

### `toHijri(date, options?)`

Converts a Gregorian `Date` to a Hijri date object.

```typescript
function toHijri(date: Date, options?: ConversionOptions): HijriDate | null
```

| Parameter | Type | Description |
| --- | --- | --- |
| `date` | `Date` | Gregorian date to convert |
| `options.calendar` | `string` | Calendar name. Defaults to `'uaq'` |

Returns `HijriDate` or `null` if the date falls outside the calendar's supported range.

Throws `Error('Invalid Gregorian date')` if `date` is not a valid `Date` instance.

UAQ uses local date components (`getFullYear`, `getMonth`, `getDate`) for timezone-safe lookup. FCNA uses UTC components because its criterion is UTC-based.

### `toGregorian(hy, hm, hd, options?)`

Converts a Hijri date to a Gregorian `Date`.

```typescript
function toGregorian(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions
): Date | null
```

| Parameter | Type | Description |
| --- | --- | --- |
| `hy` | `number` | Hijri year |
| `hm` | `number` | Hijri month (1-12) |
| `hd` | `number` | Hijri day (1-30) |
| `options.calendar` | `string` | Calendar name. Defaults to `'uaq'` |

Returns a UTC midnight `Date` or `null` if the input is out of range.

Throws `Error('Invalid Hijri date')` for UAQ when the date is not in the reference table.

### `isValidHijriDate(hy, hm, hd, options?)`

Returns `true` if the given Hijri date exists in the selected calendar.

```typescript
function isValidHijriDate(
  hy: number,
  hm: number,
  hd: number,
  options?: ConversionOptions
): boolean
```

### `daysInHijriMonth(hy, hm, options?)`

Returns the number of days in a given Hijri month.

```typescript
function daysInHijriMonth(hy: number, hm: number, options?: ConversionOptions): number
```

Returns 29 or 30. Returns 0 for UAQ when the year is out of range.

## Registry functions

### `registerCalendar(name, engine)`

Registers a calendar engine. Overwrites any existing engine with the same name.

```typescript
function registerCalendar(name: string, engine: CalendarEngine): void
```

### `getCalendar(name)`

Returns the registered engine for a given name. Throws if not found.

```typescript
function getCalendar(name: string): CalendarEngine
```

Throws `Error('Unknown Hijri calendar: "name". Available: ...')`.

### `listCalendars()`

Returns the names of all registered calendars.

```typescript
function listCalendars(): string[]
```

## Types

### `HijriDate`

```typescript
interface HijriDate {
  hy: number; // Hijri year
  hm: number; // Hijri month (1-12)
  hd: number; // Hijri day (1-30)
}
```

### `HijriYearRecord`

One entry in the Umm al-Qura reference table.

```typescript
interface HijriYearRecord {
  hy:  number; // Hijri year
  dpm: number; // 12-bit days-per-month bitmask
  gy:  number; // Gregorian year of 1 Muharram
  gm:  number; // Gregorian month of 1 Muharram (1-based)
  gd:  number; // Gregorian day of 1 Muharram
}
```

The `dpm` bitmask encodes month lengths. Bit `i` (0-indexed from bit 0) corresponds to month `i+1`: `1` = 30 days, `0` = 29 days.

### `CalendarEngine`

```typescript
interface CalendarEngine {
  readonly id: string;
  toHijri(date: Date): HijriDate | null;
  toGregorian(hy: number, hm: number, hd: number): Date | null;
  isValid(hy: number, hm: number, hd: number): boolean;
  daysInMonth(hy: number, hm: number): number;
}
```

### `ConversionOptions`

```typescript
interface ConversionOptions {
  calendar?: string; // defaults to 'uaq'
}
```

## Data exports

| Export | Type | Description |
| --- | --- | --- |
| `hDatesTable` | `HijriYearRecord[]` | Full UAQ table, 184 entries (1318-1500 H) plus sentinel |
| `hmLong` | `string[]` | Long month names. Index 0 = Muharram |
| `hmMedium` | `string[]` | Medium month names |
| `hmShort` | `string[]` | Short month codes (3 chars) |
| `hwLong` | `string[]` | Long weekday names. Index 0 = Sunday |
| `hwShort` | `string[]` | Short weekday names |
| `hwNumeric` | `number[]` | Weekday numbers, 1 = Sunday, 7 = Saturday |

---

[Home](Home) | [Architecture](Architecture)
