[**hijri-core v1.0.1**](../README.md)

***

[hijri-core](../README.md) / getCalendar

# Function: getCalendar()

> **getCalendar**(`name`): [`CalendarEngine`](../interfaces/CalendarEngine.md)

Defined in: [registry.ts:25](https://github.com/acamarata/hijri-core/blob/94bc28ebc35ae2f3cb39db5be34561152a5b899d/src/registry.ts#L25)

Retrieve a registered calendar engine by name.

## Parameters

### name

`string`

the calendar identifier passed to [registerCalendar](registerCalendar.md)

## Returns

[`CalendarEngine`](../interfaces/CalendarEngine.md)

the matching engine

## Throws

if no engine is registered under that name
