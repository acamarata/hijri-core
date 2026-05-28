# hijri-core — PRI (Per-Repo Instructions)

**PPI:** `~/Sites/acamarata/.claude/CLAUDE.md`

## What This Is

Core Hijri calendar engine for JavaScript/TypeScript. Provides Hijri/Gregorian date conversion with a pluggable calendar registry supporting multiple calculation methods.

**npm:** `hijri-core@1.0.0`
**Language:** TypeScript
**License:** MIT

## Key Technical Details

- Zero runtime dependencies
- Pluggable engine architecture: UAQ (Umm al-Qura, 1318-1500 AH) and FCNA engines built in
- Foundation package: used by luxon-hijri, date-fns-hijri, dayjs-hijri-plus, moment-hijri-plus, temporal-hijri
- Dart counterpart: hijri-core-dart (hijri_core@1.0.0 on pub.dev)

## API Surface

- `toHijri(gregorianDate, engine?)` — Gregorian to Hijri
- `toGregorian(hijriYear, hijriMonth, hijriDay, engine?)` — Hijri to Gregorian
- `registerCalendar(name, engine)` — add custom calendar engine
- `getCalendar(name)` — retrieve registered engine
- `isValidHijriDate(year, month, day, engine?)` — validation
- `daysInHijriMonth(year, month, engine?)` — month length
- Month name arrays: long/medium/short (Arabic + English)
- Weekday name arrays

## Important Notes

- This is a FOUNDATION package. Breaking changes here affect 5 downstream plugin packages.
- When making API changes: update all 5 plugin packages (luxon-hijri, date-fns-hijri, dayjs-hijri-plus, moment-hijri-plus, temporal-hijri) and bump their versions too.
- Test all 5 plugins against any hijri-core change before publishing.

## Commands

- `pnpm test` — run test.mjs + test-cjs.cjs
- `pnpm run typecheck` — tsc --noEmit
- `pnpm build` — tsup build
