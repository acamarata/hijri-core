[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / toGregorian

# Function: toGregorian()

> **toGregorian**(`hy`, `hm`, `hd`, `options?`): `Date` \| `null`

Defined in: [index.ts:60](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/index.ts#L60)

Convert a Hijri date to a Gregorian date.

Uses the UAQ calendar by default.

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

`Date` \| `null`

a Date in UTC, or null if the input is invalid or out of range
