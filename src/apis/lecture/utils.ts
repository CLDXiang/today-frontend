import { CardLectureItem } from '@/components/listCard';
import { LectureItem } from './types';

/** 将 LectureItem 转为 CardLectureItem */
export const transferLectureItemToCardLectureItem: (lectureItem: LectureItem) => CardLectureItem = (
  lectureItem,
) => ({
  id: lectureItem.id,
  type: 'lecture',
  name: lectureItem.name,
  teachers: lectureItem.taughtBy,
  score: lectureItem.recommended,
  ratingCount: lectureItem.rateCount,
  likeCount: lectureItem.starCount,
});
