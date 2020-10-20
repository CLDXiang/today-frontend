import { CardCommonItem } from '@/components/listCard';
import defaultAvatar from '@/assets/default_avatar.jpg';

export const mockWatches: CardCommonItem[] = [
  {
    type: 'user',
    email: 'abc@def.xyz',
    name: 'xiao_ming',
    nickname: '小明',
    avatar: defaultAvatar,
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
