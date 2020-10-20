import { CardCommentItem } from '@/components/listCard';
import dayjs from 'dayjs';
import defaultAvatar from '@/assets/default_avatar.jpg';

export const mockComments: CardCommentItem[] = [
  {
    id: '1',
    type: 'comment',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: defaultAvatar,
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    rateID: '233',
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
  },
  {
    id: '2',
    type: 'comment',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: defaultAvatar,
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    rateID: '233',
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
  },
];
