[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hwShort

# Variable: hwShort

> `const` **hwShort**: `string`[]

Defined in: [names/weekdays.ts:32](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/names/weekdays.ts#L32)

Short single-word transliterations for the seven days of the week.

Index alignment matches `Date.prototype.getDay()`:
index 0 = Sunday, index 6 = Saturday.

## Example

```ts
const abbr = hwShort[gregorianDate.getDay()]; // "Jum`a"
```
