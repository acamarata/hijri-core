# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2026-02-25

### Added

- UAQ (Umm al-Qura) calendar engine with binary search over a 184-year reference table (1318-1500 H / 1900-2076 CE)
- FCNA/ISNA calendar engine based on Jean Meeus Chapter 49 new moon algorithm with the FCNA conjunction criterion
- Calendar registry (`registerCalendar`, `getCalendar`, `listCalendars`) for pluggable calendar support
- `toHijri(date, options?)` convenience wrapper
- `toGregorian(hy, hm, hd, options?)` convenience wrapper
- `isValidHijriDate(hy, hm, hd, options?)` validation function
- `daysInHijriMonth(hy, hm, options?)` month-length function
- `hDatesTable` export of the full Umm al-Qura data
- `hmLong`, `hmMedium`, `hmShort` Hijri month name arrays
- `hwLong`, `hwShort`, `hwNumeric` Hijri weekday name arrays
- Full TypeScript type declarations for all exports
- Dual CJS and ESM build (tsup)
- `CalendarEngine` interface for writing custom calendar implementations
- Node 20/22/24 CI matrix
- GitHub Wiki with API reference and architecture documentation
