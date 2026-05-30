# Benchmarks

Performance and bundle-size data for hijri-core@1.0.1.

## Bundle size

Measured from the published ESM build (`dist/index.mjs`). The package ships a dual CJS+ESM output; sizes are nearly identical.

| Format | Minified | Gzipped |
| --- | --- | --- |
| ESM (`dist/index.mjs`) | 20.8 KB | 5.3 KB |
| CJS (`dist/index.cjs`) | 22.3 KB | 5.9 KB |

The majority of the size is the UAQ lookup table (184 rows of year records). The conversion logic itself is small.

## Conversion throughput

Single-threaded, Node.js 22, Apple M-series chip. 100,000 iterations per function.
Results are representative for production workloads.

| Function | Ops/sec |
| --- | --- |
| `toHijri` (UAQ, binary search) | ~5,100,000 |
| `toGregorian` (UAQ, binary search) | ~11,200,000 |
| `isValidHijriDate` | ~53,000,000 |
| `daysInHijriMonth` | ~44,000,000 |

For bulk calendar generation — building a full year's worth of Hijri-Gregorian pairs, for example — expect to process hundreds of thousands of dates per second in a Node.js context.

## Methodology

```js
import { toHijri, toGregorian } from 'hijri-core';

const N = 100_000;
const date = new Date('2025-03-01');

const t0 = performance.now();
for (let i = 0; i < N; i++) toHijri(date);
const t1 = performance.now();

const opsPerSec = Math.round(N / ((t1 - t0) / 1000));
console.log(`toHijri: ${opsPerSec.toLocaleString()} ops/sec`);
```

Run `node --input-type=module` with the snippet above after `pnpm build` to reproduce.

## Notes

- The UAQ engine uses O(log n) binary search over 184 rows. A linear scan would be ~7x slower.
- The FCNA engine runs trigonometric new-moon calculations; throughput is lower (~100,000-200,000 ops/sec). Use FCNA when accuracy to the North American criterion matters; use UAQ for display and calendar grids.
- There are no allocations beyond the returned `HijriDate` object. The engine itself holds no mutable state.

---

[Home](../Home) | [API Reference](../API-Reference)
