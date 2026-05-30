# Example: Gregorian to Hijri Conversion Table

Convert a range of notable Gregorian dates to Hijri.

```js
import { toHijri, hmLong } from 'hijri-core';

const dates = [
  { label: 'Islamic New Year 1446', date: new Date('2024-07-07') },
  { label: 'Ashura 1446',          date: new Date('2024-07-16') },
  { label: 'Ramadan 1446 start',   date: new Date('2025-03-01') },
  { label: 'Eid al-Fitr 1446',     date: new Date('2025-03-30') },
  { label: 'Arafat Day 1446',      date: new Date('2025-06-05') },
  { label: 'Eid al-Adha 1446',     date: new Date('2025-06-06') },
];

console.log(`${'Event'.padEnd(26)}  Gregorian    Hijri`);
console.log('-'.repeat(62));

for (const { label, date } of dates) {
  const h = toHijri(date);
  const greg = date.toISOString().slice(0, 10);
  const hijri = h
    ? `${h.hd} ${hmLong[h.hm - 1]} ${h.hy} AH`
    : 'out of range';

  console.log(`${label.padEnd(26)}  ${greg}   ${hijri}`);
}
```

Sample output:

```
Event                       Gregorian    Hijri
--------------------------------------------------------------
Islamic New Year 1446       2024-07-07   1 Muharram 1446 AH
Ashura 1446                 2024-07-16   10 Muharram 1446 AH
Ramadan 1446 start          2025-03-01   1 Ramadan 1446 AH
Eid al-Fitr 1446            2025-03-30   1 Shawwal 1446 AH
Arafat Day 1446             2025-06-05   9 Dhul Hijjah 1446 AH
Eid al-Adha 1446            2025-06-06   10 Dhul Hijjah 1446 AH
```
