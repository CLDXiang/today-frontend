import { CardLectureItem } from '@/components/listCard';
import { LectureItem } from './dto';

/** 将 RateItem 转为 CardRatingItem */
export const transferLectureItemToCardLectureItem: (lectureItem: LectureItem) => CardLectureItem = (
  lectureItem,
) => ({
  id: lectureItem.id,
  type: lectureItem.category,
  name: lectureItem.name,
  teachers: lectureItem.taughtBy,
  score: lectureItem.recommended,
  ratingCount: lectureItem.rateCount,
  likeCount: lectureItem.starCount,
});
