[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hmShort

# Variable: hmShort

> `const` **hmShort**: `string`[]

Defined in: [names/months.ts:61](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/names/months.ts#L61)

Three-character short codes for the 12 Hijri months.

Designed for narrow columns such as calendar grids or spreadsheet headers.
Each code is exactly 3 ASCII characters.

## Example

```ts
const abbr = hmShort[hijriDate.hm - 1]; // "Ram"
```
