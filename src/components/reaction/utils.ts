import { EmojiEntry } from './types';

/** 最早的 createdAt 更早的排前面 */
export const compareEmojiEntryByTime: (a: EmojiEntry, b: EmojiEntry) => number = (a, b) => {
  const earliestTimeA = a[1].reduce((pv, cv) => Math.min(pv, cv.createdAt.unix()), Infinity);
  const earliestTimeB = b[1].reduce((pv, cv) => Math.min(pv, cv.createdAt.unix()), Infinity);
  return earliestTimeA - earliestTimeB;
};

/** 数目更高的排前面 */
export const compareEmojiEntryByCount: (a: EmojiEntry, b: EmojiEntry) => number = (a, b) => {
  const totalCountA = a[1].length;
  const totalCountB = b[1].length;
  return totalCountB - totalCountA;
};
