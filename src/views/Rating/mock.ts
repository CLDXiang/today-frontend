// FIXME: 接入 API 后删除此文件
import dayjs from 'dayjs';
import { CardRatingItem, CardLectureItem } from '@/components/listCard';

export const mockRatings1: CardRatingItem[] = [
  {
    id: '0',
    creator: {
      id: '0',
      nickname: '发布者0',
      avatar: '/default_avatar.png',
    },
    createdAt: dayjs('20200812020100'),
    content: '啊，这真是一门超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级优秀的课程！',
    lecture: {
      id: '0',
      name: '创意设计前沿',
      teachers: ['汤筠冰'],
    },
    reactionCount: 123,
    replyCount: 22,
    likeCount: 1,
  },
  {
    id: '1',
    creator: {
      id: '0',
      nickname: '发布者1',
      avatar: '/default_avatar.png',
    },
    createdAt: dayjs('20200812020100'),
    content: '点评内容点评内容',
    lecture: {
      id: '0',
      name: '计算机体系结构',
      teachers: ['韩军', '周晓方'],
    },
    reactionCount: 123,
    replyCount: 22,
    likeCount: 1,
  },
  {
    id: '2',
    creator: {
      id: '0',
      nickname: '发布者2',
      avatar: '/default_avatar.png',
    },
    createdAt: dayjs('20200812020100'),
    content: '点评内容点评内容',
    lecture: {
      id: '0',
      name: '操作系统',
      teachers: ['赵进', '张亮', '王飞'],
    },
    reactionCount: 123,
    replyCount: 22,
    likeCount: 1,
  },
];

export const mockLectures1: CardLectureItem[] = [
  {
    id: '0',
    name: '创意设计前沿',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '1',
    name: '操作系统',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '2',
    name: '编译原理',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '3',
    name: '计算机体系结构',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
];
