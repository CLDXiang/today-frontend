import { PostReactionsIdResp } from '../types';

export const mockReaction: PostReactionsIdResp = {
  data: {
    id: 'uni-1',
    count: 3,
    emoji: {
      '😄': [
        {
          id: 'xiaoming',
          nickname: '小明',
          createdAt: '20200501',
        },
      ],
      '🐶': [
        {
          id: 'xiaoming',
          nickname: '小明',
          createdAt: '20200801',
        },
        {
          id: 'xiaohong',
          nickname: '小红',
          createdAt: '20200701',
        },
      ],
    },
  },
};
