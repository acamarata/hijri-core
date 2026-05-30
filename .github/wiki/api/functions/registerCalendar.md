[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / registerCalendar

# Function: registerCalendar()

> **registerCalendar**(`name`, `engine`): `void`

Defined in: [registry.ts:14](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/registry.ts#L14)

Register a calendar engine under the given name.

Once registered, the engine can be selected via `{ calendar: name }` in any
conversion function or retrieved directly with [getCalendar](getCalendar.md).

## Parameters

### name

`string`

unique identifier for the calendar (e.g. 'uaq', 'fcna')

### engine

[`CalendarEngine`](../interfaces/CalendarEngine.md)

an object implementing the [CalendarEngine](../interfaces/CalendarEngine.md) interface

## Returns

`void`
