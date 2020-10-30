import { CardRatingItem } from '@/components/listCard';
import dayjs from 'dayjs';
import { Rate } from '../types';

export const mockRatings: CardRatingItem[] = [
  {
    id: '233',
    type: 'rating',
    creator: {
      id: '1',
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
      content: '点点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容评内容点评内容点评内容点评内容点评内容',
    },
  },
  {
    id: '234',
    type: 'rating',
    creator: {
      id: '2',
      nickname: '小2',
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
      content: '点评点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内arsteniarsteanrsitnariotneioatnioantieornitnaritnioarntinairtsniroani容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容点评内容内容点评内容点评内容点评内容点评内容',
    },
  },
  {
    id: '235',
    type: 'rating',
    creator: {
      id: '3',
      nickname: '小明3',
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
      content: '点评内容点评内容点评内容点评内容点评内容',
    },
  },
  {
    id: '236',
    type: 'rating',
    creator: {
      id: '4',
      nickname: '小明4',
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
      content: '点评内容点评内容点评内容点评内容点评内容',
    },
  },
];

export const mockRate: Rate = {
  difficulty: 4,
  nice: 4,
  workload: 4,
  recommended: 4,
  content: '服务器点评',
  draft: {
    difficulty: 4,
    nice: 4,
    workload: 4,
    recommended: 4,
    content: '服务器草稿',
    updatedAt: dayjs('Wed Oct 14 2020 00:09:34 GMT+0800 (中国标准时间)'),
  },
  updatedAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
};
