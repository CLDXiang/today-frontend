import { Post } from '@/views/Forum/types';
import dayjs from 'dayjs';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: '第一篇帖子',
    content: '这是有史以来第一篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    replyCount: 13,
    thumbupCount: 3,
    creator: {
      id: '234',
      nickname: '张陆洋',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 2,
    title: '第二篇帖子',
    content: '这是有史以来第二篇帖子',
    replyCount: 24,
    thumbupCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '吴蚝田',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 3,
    title: '第三篇帖子',
    content: '这是有史以来第三篇帖子',
    replyCount: 1,
    thumbupCount: 7,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 4,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 7,
    thumbupCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 5,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 14,
    thumbupCount: 6,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 6,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 10,
    thumbupCount: 9,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 7,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbupCount: 8,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 8,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbupCount: 4,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 9,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 2,
    thumbupCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
  {
    id: 10,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 5,
    thumbupCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    channelId: 1,
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random',
    },
  },
];
