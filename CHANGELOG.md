## [1.1.0] - 2026-08-20

### Added
- Opt-in anonymous telemetry via `@acamarata/telemetry`, off by default (see TELEMETRY.md). This was merged after 1.0.4 was published, so 1.0.4 on npm does not contain it.
- Round-trip stability coverage across 40 years (123 sampled dates, 2000-2040) and range assertions on returned month/day fields.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-06-13

### Fixed
- Published package now includes dist/index.d.mts so ESM type resolution under node16/nodenext resolves the import condition.

## [1.0.3] - 2026-06-10

### Fixed
- UAQ engine `toHijri` was reading local date components (`getFullYear/getMonth/getDate`) instead of UTC components, causing incorrect results on hosts west of UTC (e.g. `America/New_York`, `Pacific/Auckland`) when the input Date was a UTC-midnight value such as those returned by `toGregorian` or ISO date-only strings. `toHijri` now reads UTC calendar day components (`getUTCFullYear/getUTCMonth/getUTCDate`), matching the FCNA engine. **Behavior change:** on non-UTC hosts the converted Hijri day may shift to the UTC calendar day; round-trips via `toGregorian` are now exact on every machine.

## [1.0.2] - 2026-05-30

### Changed
- Apply TypeScript strict null-check fixes in uaq.ts and fcna.ts (non-null assertions compile away; no behavior change)

## [1.0.1] - 2026-05-28

### Changed
- Flatten exports map to ADR-015 standard (import/require/types at top level)
- Add "./package.json" export condition
- Add coverage script (c8 --reporter=lcov)
- Migrate CI from pnpm/action-setup to corepack enable

## [1.0.0] - 2026-05-28

### Added
- Initial release
