import { Channel, ChannelGroup } from '@/views/Forum/types';

export const mockChannels1: Channel[] = [
  {
    id: 1,
    name: '校园快讯',
    description: '',
  },
  {
    id: 2,
    name: '校友杂谈',
    description: '尽情闲聊吧！',
  },
  {
    id: 3,
    name: '校园活动',
    description: '',
  },
  {
    id: 4,
    name: '约自习',
    description: '',
  },
];

export const mockChannels2: Channel[] = [
  {
    id: 1,
    name: '社团交流',
    description: '',
  },
  {
    id: 2,
    name: '寻找同好',
    description: '',
  },
];

export const mockChannels3: Channel[] = [
  {
    id: 1,
    name: '选课交流',
    description: '',
  },
  {
    id: 2,
    name: '资料分享',
    description: '',
  },
  {
    id: 3,
    name: '留学经验',
    description: '',
  },
  {
    id: 4,
    name: '求职攻略',
    description: '一切关于实习和工作的攻略',
  },
];

export const mockChannels4: Channel[] = [
  {
    id: 1,
    name: '论坛公告',
    description: '',
  },
  {
    id: 2,
    name: '用户反馈',
    description: '',
  },
];

export const mockChannelGroups: ChannelGroup[] = [
  {
    id: 1,
    name: '复旦生活',
    channels: mockChannels1,
  },
  {
    id: 2,
    name: '兴趣小组',
    channels: mockChannels2,
  },
  {
    id: 3,
    name: '攻略指南',
    channels: mockChannels3,
  },
  {
    id: 4,
    name: '社区事务',
    channels: mockChannels4,
  },
];
