[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / HijriYearRecord

# Interface: HijriYearRecord

Defined in: [types.ts:26](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L26)

One row in the Umm al-Qura reference table.

The table covers Hijri years 1318-1500 (Gregorian 1900-2076). A sentinel row
at hy=1501 with dpm=0 marks the upper boundary and is used to detect
out-of-range inputs without a separate bounds check.

The `dpm` bitmask encodes month lengths for all 12 months:
bit i (0-indexed from bit 0) = month i+1; 1 = 30 days, 0 = 29 days.

## Properties

### dpm

> **dpm**: `number`

Defined in: [types.ts:28](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L28)

***

### gd

> **gd**: `number`

Defined in: [types.ts:31](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L31)

***

### gm

> **gm**: `number`

Defined in: [types.ts:30](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L30)

***

### gy

> **gy**: `number`

Defined in: [types.ts:29](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L29)

***

### hy

> **hy**: `number`

Defined in: [types.ts:27](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L27)
