[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hmLong

# Variable: hmLong

> `const` **hmLong**: `string`[]

Defined in: [names/months.ts:13](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/names/months.ts#L13)

Full English transliterations of the 12 Hijri month names.

Index 0 corresponds to Muharram (month 1); index 11 to Dhul Hijjah (month 12).
Suitable for display in contexts where the full name aids readability.

## Example

```ts
const month = hmLong[hijriDate.hm - 1]; // "Ramadan"
```
