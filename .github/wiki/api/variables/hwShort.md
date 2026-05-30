[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hwShort

# Variable: hwShort

> `const` **hwShort**: `string`[]

Defined in: [names/weekdays.ts:32](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/names/weekdays.ts#L32)

Short single-word transliterations for the seven days of the week.

Index alignment matches `Date.prototype.getDay()`:
index 0 = Sunday, index 6 = Saturday.

## Example

```ts
const abbr = hwShort[gregorianDate.getDay()]; // "Jum`a"
```
