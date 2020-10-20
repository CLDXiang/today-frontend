import { CardUserItem } from '@/components/listCard';
import defaultAvatar from '@/assets/default_avatar.jpg';

interface MockUserProfileItem extends CardUserItem {
  nickName: string;
  following?: number;
  follower?: number;
  star?: number;
}

export const mockProfiles: MockUserProfileItem[] = [
  {
    email: 'abc@def.xyz',
    name: 'xiao_ming',
    nickname: '小明',
    avatar: defaultAvatar,
    bio: '个性签名个性签名个性签名个性签名个性签名',
    nickName: '小明',
    following: 10,
    follower: 20,
    star: 30,
  },
];
