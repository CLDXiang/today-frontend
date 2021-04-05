import { CardCommonItem } from '@/components/listCard';
import dayjs from 'dayjs';

export const mockStars: CardCommonItem[] = [
  {
    id: '233',
    type: 'rating',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: '/default_avatar.png',
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    lecture: {
      id: 'CHIN1190113',
      name: '鲁迅与中国现代文化',
      teachers: ['郜元宝'],
    },
    commentCount: 2,
    starCount: 21,
    starred: true,
    reaction: {
      count: 2,
      emoji: {
        smile: [
          { id: '235', nickname: '小红' },
          { id: '236', nickname: '小白' },
        ],
      },
    },
    form: {
      difficulty: 4,
      nice: 4,
      workload: 4,
      recommended: 4,
      content: '老师很有趣',
    },
  },
  {
    id: 'CHIN1190113',
    type: 'lecture',
    name: '鲁迅与中国现代文化',
    teachers: ['郜元宝'],
    score: 4,
    reactionCount: 5,
    ratingCount: 12,
    likeCount: 21,
  },
];
