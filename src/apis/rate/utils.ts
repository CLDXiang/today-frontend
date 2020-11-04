import { CardRatingItem } from '@/components/listCard';
import { dayjsOrUndefined } from '@/utils/dayjs';
import dayjs from 'dayjs';
import { RateItem } from './types';

/** 将 RateItem 转为 CardRatingItem */
export const transferRateItemToCardRatingItem: (rateItem: RateItem) => CardRatingItem = (
  rateItem,
) => ({
  ...rateItem,
  createdAt: dayjs(rateItem.createdAt),
  updatedAt: dayjs(rateItem.updatedAt),
  form: {
    ...rateItem.form,
    updatedAt: dayjsOrUndefined(rateItem.form.updatedAt),
  },
});
