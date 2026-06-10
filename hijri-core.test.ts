/**
 * Purpose:    Vitest suite for hijri-core — conversion, validation, registry, and name exports.
 * Inputs:     Pure functions from src/index.ts (no network; module-load registers uaq+fcna engines).
 * Outputs:    Vitest pass/fail assertions.
 * Constraints: UAQ calendar covers 1318–1500 AH (≈1900–2076 CE). toHijri interprets the input
 *             Date by its UTC calendar day (getUTC* components); pass UTC-explicit Dates for
 *             deterministic results. toGregorian returns UTC midnight, so round-trips are exact.
 * Usage:      pnpm vitest run
 * SOT:        packages.md — hijri-core row
 */
import { describe, it, expect } from "vitest";
import {
  toHijri,
  toGregorian,
  isValidHijriDate,
  daysInHijriMonth,
  listCalendars,
  hmLong,
  hwLong,
} from "./src/index";

describe("toGregorian (UAQ default)", () => {
  it("converts 1 Ramadan 1446 to 2025-03-01 UTC midnight", () => {
    const result = toGregorian(1446, 9, 1);
    expect(result).not.toBeNull();
    expect(result!.toISOString()).toBe("2025-03-01T00:00:00.000Z");
  });

  it("converts 1 Muharram 1446 to 2024-07-07 UTC midnight", () => {
    const result = toGregorian(1446, 1, 1);
    expect(result).not.toBeNull();
    expect(result!.toISOString()).toBe("2024-07-07T00:00:00.000Z");
  });

  it("returns null for an out-of-range Hijri year (1501)", () => {
    expect(toGregorian(1501, 1, 1)).toBeNull();
  });
});

describe("toHijri (UAQ default)", () => {
  it("converts 2025-03-01 noon UTC to 1 Ramadan 1446", () => {
    // toGregorian(1446,9,1) = 2025-03-01 midnight; add 12h to stay on that Gregorian day
    const noonOnRamadanStart = new Date("2025-03-01T12:00:00Z");
    const result = toHijri(noonOnRamadanStart);
    expect(result).not.toBeNull();
    expect(result!.hy).toBe(1446);
    expect(result!.hm).toBe(9);
    expect(result!.hd).toBe(1);
  });

  it("returns null for a date outside UAQ range (year 2100)", () => {
    expect(toHijri(new Date("2100-01-01T12:00:00Z"))).toBeNull();
  });

  it("throws on an invalid Date object", () => {
    expect(() => toHijri(new Date("invalid"))).toThrow();
  });
});

describe("isValidHijriDate", () => {
  it("accepts a known valid date", () => {
    expect(isValidHijriDate(1446, 9, 1)).toBe(true);
  });

  it("rejects month 13", () => {
    expect(isValidHijriDate(1446, 13, 1)).toBe(false);
  });

  it("rejects day 0", () => {
    expect(isValidHijriDate(1446, 1, 0)).toBe(false);
  });
});

describe("daysInHijriMonth", () => {
  it("returns 29 or 30 for a valid month", () => {
    const days = daysInHijriMonth(1446, 9);
    expect([29, 30]).toContain(days);
  });
});

describe("registry", () => {
  it("lists at least uaq and fcna after module load", () => {
    const calendars = listCalendars();
    expect(calendars).toContain("uaq");
    expect(calendars).toContain("fcna");
  });
});

describe("name tables", () => {
  it("hmLong has 12 entries and index 8 is Ramadan", () => {
    expect(hmLong).toHaveLength(12);
    expect(hmLong[8]).toBe("Ramadan");
  });

  it("hwLong has 7 weekday entries", () => {
    expect(hwLong).toHaveLength(7);
  });
});

describe("day boundaries (UTC contract)", () => {
  it("UAQ round-trip: toHijri(toGregorian(1446, 9, 1)) returns {hy:1446, hm:9, hd:1}", () => {
    const greg = toGregorian(1446, 9, 1);
    expect(greg).not.toBeNull();
    const hijri = toHijri(greg!);
    expect(hijri).not.toBeNull();
    expect(hijri!.hy).toBe(1446);
    expect(hijri!.hm).toBe(9);
    expect(hijri!.hd).toBe(1);
  });

  it("toHijri(new Date('2025-03-01T00:00:00Z')) = 1 Ramadan 1446", () => {
    const result = toHijri(new Date("2025-03-01T00:00:00Z"));
    expect(result).not.toBeNull();
    expect(result!.hy).toBe(1446);
    expect(result!.hm).toBe(9);
    expect(result!.hd).toBe(1);
  });

  it("last ms of 2025-02-28 UTC maps to the same Hijri day as noon on 2025-02-28 UTC", () => {
    const lastMs = toHijri(new Date("2025-02-28T23:59:59.999Z"));
    const noon = toHijri(new Date("2025-02-28T12:00:00Z"));
    expect(lastMs).not.toBeNull();
    expect(noon).not.toBeNull();
    expect(lastMs!.hy).toBe(noon!.hy);
    expect(lastMs!.hm).toBe(noon!.hm);
    expect(lastMs!.hd).toBe(noon!.hd);
    // and it is the day before 1 Ramadan 1446
    expect(lastMs!.hm).not.toBe(9);
  });

  it("FCNA round-trip: toHijri(toGregorian(1446, 9, 1, {calendar:'fcna'}), {calendar:'fcna'}) is exact", () => {
    const greg = toGregorian(1446, 9, 1, { calendar: "fcna" });
    expect(greg).not.toBeNull();
    const hijri = toHijri(greg!, { calendar: "fcna" });
    expect(hijri).not.toBeNull();
    expect(hijri!.hy).toBe(1446);
    expect(hijri!.hm).toBe(9);
    expect(hijri!.hd).toBe(1);
  });
});
