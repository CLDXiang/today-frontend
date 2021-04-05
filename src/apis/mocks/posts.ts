import { Post } from '@/views/Forum/types';
import dayjs from 'dayjs';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: '第一篇帖子',
    content: '这是有史以来第一篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '张陆洋',
      avatar: '/default_avatar.png',
    },
  },
  {
    id: 2,
    title: '第二篇帖子',
    content: '这是有史以来第二篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '吴蚝田',
      avatar: '/default_avatar.png',
    },
  },
  {
    id: 3,
    title: '第三篇帖子',
    content: '这是有史以来第三篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: '/default_avatar.png',
    },
  },
  {
    id: 4,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: '/default_avatar.png',
    },
  },
];
