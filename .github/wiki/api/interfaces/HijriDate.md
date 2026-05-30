[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / HijriDate

# Interface: HijriDate

Defined in: [types.ts:10](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/types.ts#L10)

A Hijri date triple.

All three fields are required. Month and day are 1-based.
The year is a Hijri (AH) year number, e.g. 1446.

## Example

```ts
const d: HijriDate = { hy: 1446, hm: 9, hd: 1 }; // 1 Ramadan 1446 AH
```

## Properties

### hd

> **hd**: `number`

Defined in: [types.ts:13](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/types.ts#L13)

***

### hm

> **hm**: `number`

Defined in: [types.ts:12](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/types.ts#L12)

***

### hy

> **hy**: `number`

Defined in: [types.ts:11](https://github.com/acamarata/hijri-core/blob/235ffb8851dac2e67cab33f1fc76cd8c00bbbe7c/src/types.ts#L11)
