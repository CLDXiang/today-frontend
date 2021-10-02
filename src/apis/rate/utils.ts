import dayjs from 'dayjs';
import { CardRatingItem } from '@/components/listCard';
import { RateItem } from './types';

/** 将 RateItem 转为 CardRatingItem */
export const transferRateItemToCardRatingItem: (item: RateItem) => CardRatingItem = (
  item,
) => ({
  ...item,
  type: 'rating',
  lecture: {
    ...item.lecture,
    teachers: item.lecture.taughtBy,
  },
  createdAt: dayjs(item.createdAt),
  updatedAt: dayjs(item.updatedAt),
});
