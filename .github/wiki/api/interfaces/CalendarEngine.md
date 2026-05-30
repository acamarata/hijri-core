[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / CalendarEngine

# Interface: CalendarEngine

Defined in: [types.ts:42](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L42)

Interface every calendar engine must implement.

Return `null` when a date is outside the engine's supported range.
Throw `Error` for structurally invalid input (malformed Date, month outside 1-12, etc.).
Never throw for out-of-range inputs — return `null` instead so callers can handle
the boundary gracefully without try/catch.

## Properties

### id

> `readonly` **id**: `string`

Defined in: [types.ts:43](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L43)

## Methods

### daysInMonth()

> **daysInMonth**(`hy`, `hm`): `number`

Defined in: [types.ts:48](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L48)

#### Parameters

##### hy

`number`

##### hm

`number`

#### Returns

`number`

***

### isValid()

> **isValid**(`hy`, `hm`, `hd`): `boolean`

Defined in: [types.ts:47](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L47)

#### Parameters

##### hy

`number`

##### hm

`number`

##### hd

`number`

#### Returns

`boolean`

***

### toGregorian()

> **toGregorian**(`hy`, `hm`, `hd`): `Date` \| `null`

Defined in: [types.ts:46](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L46)

Returns null for invalid or out-of-range input. Never throws.

#### Parameters

##### hy

`number`

##### hm

`number`

##### hd

`number`

#### Returns

`Date` \| `null`

***

### toHijri()

> **toHijri**(`date`): [`HijriDate`](HijriDate.md) \| `null`

Defined in: [types.ts:44](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/types.ts#L44)

#### Parameters

##### date

`Date`

#### Returns

[`HijriDate`](HijriDate.md) \| `null`
