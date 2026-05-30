[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / hwNumeric

# Variable: hwNumeric

> `const` **hwNumeric**: `number`[]

Defined in: [names/weekdays.ts:50](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/names/weekdays.ts#L50)

Numeric weekday values: 1 = Sunday through 7 = Saturday.

This follows the ISO 8601 convention where Monday = 1, but offset by one
to match the Islamic numbering where Sunday is the first day of the week.
Index alignment matches `Date.prototype.getDay()`.
