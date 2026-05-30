[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / daysInHijriMonth

# Function: daysInHijriMonth()

> **daysInHijriMonth**(`hy`, `hm`, `options?`): `number`

Defined in: [index.ts:96](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/index.ts#L96)

Return the number of days in a given Hijri month.

## Parameters

### hy

`number`

Hijri year

### hm

`number`

Hijri month (1-12)

### options?

[`ConversionOptions`](../interfaces/ConversionOptions.md)

conversion options (calendar engine selection)

## Returns

`number`

29 or 30

## Throws

if the month or year is out of range
