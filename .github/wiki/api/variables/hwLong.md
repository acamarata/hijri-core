[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hwLong

# Variable: hwLong

> `const` **hwLong**: `string`[]

Defined in: [names/weekdays.ts:13](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/names/weekdays.ts#L13)

Full Arabic-transliterated names for the seven days of the week.

Index alignment matches `Date.prototype.getDay()`:
index 0 = Sunday, index 6 = Saturday.

## Example

```ts
const dayName = hwLong[gregorianDate.getDay()]; // "Yawm al-Jum`a"
```
