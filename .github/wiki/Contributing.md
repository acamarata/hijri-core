# Contributing

## Prerequisites

- Node.js 20 or later
- pnpm (enabled via corepack: `corepack enable`)

## Setup

```sh
git clone https://github.com/acamarata/hijri-core.git
cd hijri-core
pnpm install
```

## Development

```sh
pnpm build          # compile TypeScript
pnpm test           # build + run test suite
pnpm run typecheck  # type-check without emitting
pnpm run lint       # ESLint
pnpm run format     # Prettier format
```

## Conversion Engines

The package ships two engines:

- **UAQ** (Umm al-Qura): table-based, identical to the official Saudi calendar
- **FCNA**: an algorithmic engine for Fiqh Council of North America calculations

When modifying either engine, cross-validate against the reference tables in the test suite. The UAQ table covers 1318-1500 AH; the FCNA engine is unbounded but less authoritative outside that range.

## Downstream Packages

hijri-core is the foundation for several thin wrapper packages:

- `luxon-hijri`, `date-fns-hijri`, `dayjs-hijri-plus`, `moment-hijri-plus`, `temporal-hijri` (JS)
- `hijri_core` (Dart)

Breaking changes here require coordinated updates across all downstream packages. When changing the public API, note which downstream packages are affected in your PR description.

## Pull Requests

- One logical change per PR
- Include tests with cross-validation against known dates
- Update `CHANGELOG.md` under `[Unreleased]`
- Do not bump the version number
