import { Channel, ChannelGroup } from '@/views/Forum/types';

export const mockChannels1: Channel[] = [
  {
    id: 1,
    name: '官方消息',
    description: '学校官方发布的消息',
  },
  {
    id: 2,
    name: '闲聊灌水',
    description: '随便聊聊',
  },
  {
    id: 3,
    name: '校园活动',
    description: '最近有啥活动瞅瞅',
  },
  {
    id: 4,
    name: '约饭约自习',
    description: '校园有约',
  },
];
export const mockChannels2: Channel[] = [
  {
    id: 1,
    name: '运动打卡',
    description: '天天运动',
  },
  {
    id: 2,
    name: '书影音',
    description: '一起阅读观影',
  },
];

export const mockChannels3: Channel[] = [
  {
    id: 1,
    name: '选课交流',
    description: '交流交流选课相关信息',
  },
  {
    id: 2,
    name: '资料分享',
    description: '学习有关的资料分享',
  },
  {
    id: 3,
    name: '升学备考经验',
    description: '问问学长姐考试那些事',
  },
  {
    id: 4,
    name: '实习求职经验',
    description: '问问学长姐求职那些事',
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
    description: '关于平台想说的都可以',
  },
];

export const mockChannels5: Channel[] = [
  {
    id: 1,
    name: '尤克里里',
    description: '',
  },
  {
    id: 2,
    name: '钢琴协会',
    description: '',
  },
];

export const mockChannelGroups: ChannelGroup[] = [
  {
    id: 1,
    name: '校园生活',
    channels: mockChannels1,
  },
  {
    id: 2,
    name: '兴趣广场',
    channels: mockChannels2,
  },
  {
    id: 3,
    name: '生存手册',
    channels: mockChannels3,
  },
  {
    id: 4,
    name: '社区建设',
    channels: mockChannels4,
  },
  {
    id: 5,
    name: '社团天地',
    channels: mockChannels5,
  },
];
