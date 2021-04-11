import { Post } from '@/views/Forum/types';
import dayjs from 'dayjs';

export const mockReplies: Post[] = [
  {
    id: 1,
    thumbUpCount: 3,
    content: '沙发',
    createdAt: dayjs('20210409140211'),
    creator: {
      id: '234',
      nickname: '张希希',
      avatar: 'https://picsum.photos/seed/zxx/40/40',
    },
  },
  {
    id: 2,
    thumbUpCount: 2,
    content: '地板',
    createdAt: dayjs('20210409140214'),
    creator: {
      id: '234',
      nickname: '孙浩田',
      avatar: 'https://picsum.photos/seed/wht/40/40',
    },
  },
  {
    id: 3,
    thumbUpCount: 5,
    content: '在知乎看过一遍，写得挺好的',
    createdAt: dayjs('20210409153111'),
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: 'https://picsum.photos/seed/zys/40/40',
    },
  },
  {
    id: 4,
    thumbUpCount: 0,
    content: '太长不看',
    createdAt: dayjs('20210409154211'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://picsum.photos/seed/ll/40/40',
    },
  },
  {
    id: 5,
    thumbUpCount: 1,
    content: '好长好长 orz',
    createdAt: dayjs('20210409154511'),
    creator: {
      id: '234',
      nickname: '徐晶',
      avatar: 'https://picsum.photos/seed/xj/40/40',
    },
  },
  {
    id: 6,
    thumbUpCount: 0,
    content: '路过，图好多',
    createdAt: dayjs('20210409162311'),
    creator: {
      id: '234',
      nickname: '项千筏',
      avatar: 'https://picsum.photos/seed/xqf/40/40',
    },
  },
  {
    id: 7,
    thumbUpCount: 0,
    content: '看完了，一脸懵🤣',
    createdAt: dayjs('20210409152711'),
    creator: {
      id: '234',
      nickname: '夏库拉',
      avatar: 'https://picsum.photos/seed/xkl/40/40',
    },
  },
  {
    id: 8,
    thumbUpCount: 0,
    content: '搬运辛苦',
    createdAt: dayjs('20210409154411'),
    creator: {
      id: '234',
      nickname: '钱思',
      avatar: 'https://picsum.photos/seed/qs/40/40',
    },
  },
  {
    id: 9,
    thumbUpCount: 7,
    content: '图能少点就好了，和文章关系貌似不大',
    createdAt: dayjs('20210409162511'),
    creator: {
      id: '234',
      nickname: '常使清',
      avatar: 'https://picsum.photos/seed/csq/40/40',
    },
  },
  {
    id: 10,
    thumbUpCount: 0,
    content: '看傻了都',
    createdAt: dayjs('20210409175911'),
    creator: {
      id: '234',
      nickname: '许侯',
      avatar: 'https://picsum.photos/seed/xh/40/40',
    },
  },
  {
    id: 11,
    thumbUpCount: 3,
    content: '还是喜欢原创内容一些，知乎上太水啦',
    createdAt: dayjs('20210409180511'),
    creator: {
      id: '234',
      nickname: '柳霜叶',
      avatar: 'https://picsum.photos/seed/lsy/40/40',
    },
  },
  {
    id: 12,
    thumbUpCount: 0,
    content: '谢邀，人在蒙古，刚下航母',
    createdAt: dayjs('20210409194711'),
    creator: {
      id: '234',
      nickname: '韩武舞',
      avatar: 'https://picsum.photos/seed/hww/40/40',
    },
  },
];
