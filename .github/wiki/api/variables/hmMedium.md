[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hmMedium

# Variable: hmMedium

> `const` **hmMedium**: `string`[]

Defined in: [names/months.ts:37](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/names/months.ts#L37)

Medium-length transliterations of the 12 Hijri month names.

Shorter than [hmLong](hmLong.md) but more readable than [hmShort](hmShort.md).
Useful for compact date labels where space is limited.

## Example

```ts
const label = hmMedium[hijriDate.hm - 1]; // "Ramadan"
```
