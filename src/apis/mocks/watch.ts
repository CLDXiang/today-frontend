import {
  CardCommonItem,
} from '@/components/listCard';

export const mockWatches: CardCommonItem[] = [
  {
    id: 3,
    type: 'user',
    email: 'abc@def.xyz',
    name: 'xiao_ming',
    nickname: '小明',
    avatar: '/default_avatar.png',
    bio: '个性签名个性签名个性签名个性签名个性签名',
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
