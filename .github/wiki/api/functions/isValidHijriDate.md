[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / isValidHijriDate

# Function: isValidHijriDate()

> **isValidHijriDate**(`hy`, `hm`, `hd`, `options?`): `boolean`

Defined in: [index.ts:78](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/index.ts#L78)

Check whether a Hijri date is valid for the given calendar engine.

## Parameters

### hy

`number`

Hijri year

### hm

`number`

Hijri month (1-12)

### hd

`number`

Hijri day (1-30)

### options?

[`ConversionOptions`](../interfaces/ConversionOptions.md)

conversion options (calendar engine selection)

## Returns

`boolean`

true if the date is valid
