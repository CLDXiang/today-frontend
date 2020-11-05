import { CardRatingItem } from '@/components/listCard';
import dayjs from 'dayjs';
import { RateItem } from './types';

/** 将 RateItem 转为 CardRatingItem */
export const transferRateItemToCardRatingItem: (item: RateItem) => CardRatingItem = (
  item,
) => ({
  ...item,
  type: 'rating',
  createdAt: dayjs(item.createdAt),
  updatedAt: dayjs(item.updatedAt),
});
