[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / toHijri

# Function: toHijri()

> **toHijri**(`date`, `options?`): [`HijriDate`](../interfaces/HijriDate.md) \| `null`

Defined in: [index.ts:42](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/index.ts#L42)

Convert a Gregorian date to a Hijri date.

Uses the UAQ (Umm al-Qura) calendar by default. Pass `{ calendar: 'fcna' }`
or any registered calendar name via options to use a different engine.

## Parameters

### date

`Date`

a valid JavaScript Date object

### options?

[`ConversionOptions`](../interfaces/ConversionOptions.md)

conversion options (calendar engine selection)

## Returns

[`HijriDate`](../interfaces/HijriDate.md) \| `null`

the corresponding Hijri date, or null if the date is out of range

## Throws

if `date` is not a valid Date instance
