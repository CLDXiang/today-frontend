import { CardLessonItem } from '@/components/listCard';
import { LessonItemDto } from './types';

/** 将 LessonItem 转为 CardLessonItem */
export const transferLessonItemToCardLessonItem: (item: LessonItemDto) => CardLessonItem = (
  item,
) => ({
  id: item.id,
  type: 'lesson',
  codeFull: item.codeFull,
  semester: item.semester,
  name: item.name,
  teachers: item.taughtBy.split('@@'),
});
