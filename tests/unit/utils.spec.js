import { spans2slots } from '@/components/utils';
import { spans2segments } from '../../src/components/utils';

test('sort', () => {
  expect(
    [{ d: 1, s: 0 }, { d: 0, s: 1 }].sort((a, b) => {
      return a.d < b.d ? -1 : a.d == b.d && a.s < b.s ? -1 : 1;
    }),
  ).toEqual([{ d: 0, s: 1 }, { d: 1, s: 0 }]);
});

test('spans2slots returns sorted slots', () => {
  expect(
    spans2slots([{ day: 0, start: 1, end: 5 }, { day: 0, start: 2, end: 6 }]),
  ).toEqual([
    { d: 0, s: 1 },
    { d: 0, s: 2 },
    { d: 0, s: 3 },
    { d: 0, s: 4 },
    { d: 0, s: 5 },
    { d: 0, s: 6 },
  ]);
  expect(
    spans2slots([
      { day: 0, start: 1, end: 5 },
      { day: 0, start: 2, end: 6 },
      { day: 1, start: 3, end: 6 },
      { day: 1, start: 0, end: 4 },
    ]),
  ).toEqual([
    { d: 0, s: 1 },
    { d: 0, s: 2 },
    { d: 0, s: 3 },
    { d: 0, s: 4 },
    { d: 0, s: 5 },
    { d: 0, s: 6 },
    { d: 1, s: 0 },
    { d: 1, s: 1 },
    { d: 1, s: 2 },
    { d: 1, s: 3 },
    { d: 1, s: 4 },
    { d: 1, s: 5 },
    { d: 1, s: 6 },
  ]);
});

test('spans2segments', () => {
  var spans = [
    { day: 2, start: 0, end: 0 },
    { day: 2, start: 1, end: 1 },
    { day: 2, start: 2, end: 2 },
    { day: 2, start: 3, end: 3 },
    { day: 2, start: 4, end: 4 },
    { day: 2, start: 5, end: 5 },
    { day: 2, start: 6, end: 6 },
    { day: 2, start: 7, end: 7 },
    { day: 2, start: 8, end: 8 },
    { day: 2, start: 9, end: 9 },
    { day: 2, start: 2, end: 11 },
    { day: 1, start: 0, end: 2 },
    { day: 1, start: 3, end: 4 },
    { day: 3, start: 0, end: 1},
    { day: 3, start: 3, end: 4},
    { day: 3, start: 5, end: 6},
  ];
  expect(spans2segments(spans)).toEqual([
    { d: 1, s: 0, e: 4 },
    { d: 2, s: 0, e: 11 },
    { d: 3, s: 0, e: 1},
    { d: 3, s: 3, e: 6},
  ]);
});
