import { CardLectureItem } from '@/components/listCard';
import { LectureItem } from './types';

/** 将 LectureItem 转为 CardLectureItem */
export const transferLectureItemToCardLectureItem: (item: LectureItem) => CardLectureItem = (
  item,
) => ({
  id: item.id,
  type: 'lecture',
  name: item.name,
  teachers: item.taughtBy,
  score: item.recommended,
  ratingCount: item.rateCount,
  likeCount: item.starCount,
});
