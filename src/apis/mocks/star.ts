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
      id: 'COMP233333.3',
      name: '思修',
      teachers: ['老师1', '老师2'],
    },
    commentCount: 323,
    starCount: 213,
    starred: true,
    reaction: {
      count: 123,
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
      content: 'hello',
    },
  },
  {
    id: 'COMP233333.3',
    type: 'lecture',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 85,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
];
