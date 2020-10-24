import dayjs from 'dayjs';
import { EmojiEntry } from './types';

/** 最早的 createdAt 更早的排前面 */
export const compareEmojiEntryByTime: (a: EmojiEntry, b: EmojiEntry) => number = (a, b) => {
  const earliestTimeA = a.emojiItems.reduce(
    (pv, cv) => Math.min(pv, dayjs(cv.createdAt).unix()),
    Infinity,
  );
  const earliestTimeB = b.emojiItems.reduce(
    (pv, cv) => Math.min(pv, dayjs(cv.createdAt).unix()),
    Infinity,
  );
  return earliestTimeA - earliestTimeB;
};

/** 数目更高的排前面 */
export const compareEmojiEntryByCount: (a: EmojiEntry, b: EmojiEntry) => number = (a, b) => {
  const totalCountA = a.emojiItems.length;
  const totalCountB = b.emojiItems.length;
  return totalCountB - totalCountA;
};
