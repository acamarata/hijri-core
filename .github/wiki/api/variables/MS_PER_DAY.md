[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / MS\_PER\_DAY

# Variable: MS\_PER\_DAY

> `const` **MS\_PER\_DAY**: `86400000` = `86_400_000`

Defined in: [constants.ts:8](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/constants.ts#L8)

Milliseconds in one day (24 * 60 * 60 * 1000).

Used internally for day-offset arithmetic when converting between Gregorian
timestamps and Hijri dates. Exposed as a public constant so custom engine
authors can share the same value without redefining it.
