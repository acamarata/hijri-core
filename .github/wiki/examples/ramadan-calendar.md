# Example: Ramadan Calendar Generator

Generate the full Ramadan calendar for a given Hijri year showing Gregorian dates.

```js
import { toGregorian, daysInHijriMonth } from 'hijri-core';

const HIJRI_YEAR = 1446;
const RAMADAN   = 9;

const totalDays = daysInHijriMonth(HIJRI_YEAR, RAMADAN);

console.log(`Ramadan ${HIJRI_YEAR} AH — ${totalDays} days`);
console.log('');
console.log('Day  Gregorian    Weekday');
console.log('-'.repeat(32));

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

for (let d = 1; d <= totalDays; d++) {
  const greg    = toGregorian(HIJRI_YEAR, RAMADAN, d);
  const iso     = greg.toISOString().slice(0, 10);
  const weekday = DAYS[greg.getUTCDay()];

  // Mark Jumu'ah
  const marker = weekday === 'Friday' ? ' ★' : '';

  console.log(`${String(d).padStart(3)}  ${iso}   ${weekday}${marker}`);
}
```

Sample output:

```
Ramadan 1446 AH — 30 days

Day  Gregorian    Weekday
--------------------------------
  1  2025-03-01   Saturday
  2  2025-03-02   Sunday
  3  2025-03-03   Monday
  4  2025-03-04   Tuesday
  5  2025-03-05   Wednesday
  6  2025-03-06   Thursday
  7  2025-03-07   Friday ★
  8  2025-03-08   Saturday
  ...
 28  2025-03-28   Friday ★
 29  2025-03-29   Saturday
 30  2025-03-30   Sunday
```

> Eid al-Fitr falls on 1 Shawwal — the day after the last day of Ramadan.
