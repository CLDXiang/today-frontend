import dayjs from 'dayjs';
import { CardCommentItem } from '@/components/listCard';
import { CommentItem } from './types';

/** 将 CommentItem 转为 CardCommentItem */
export const transferCommentItemToCardCommentItem: (item: CommentItem) => CardCommentItem = (
  item,
) => ({
  ...item,
  createdAt: dayjs(item.createdAt),
  type: 'comment',
});
