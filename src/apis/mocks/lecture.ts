import { CardLectureItem } from '@/components/listCard';
import { LectureDetail } from '../lecture/types';

export const mockSelects: CardLectureItem[] = [
  {
    id: 'COMP233333.3',
    type: 'lecture',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 4,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
  {
    id: 'COMP233333.4',
    type: 'lecture',
    name: '马基',
    teachers: ['老师1', '老师2'],
    score: 4,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
  {
    id: 'COMP233333.4',
    type: 'lecture',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 4,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
  {
    id: 'COMP233333.4',
    type: 'lecture',
    name: '马基',
    teachers: ['老师1', '老师2'],
    score: 4,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
  {
    id: 'COMP233333.4',
    type: 'lecture',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 4,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
];

export const mockLectureDetail: LectureDetail = {
  id: '5',
  code: 'COMP111232.23',
  taughtBy: ['老王', '老李'],
  name: '测试课程名',
  category: '通识选修',
  rateCount: 123,
  starCount: 321,
  recommended: 4,
  starred: true,
  detailInfo: {
    credit: 2,
    department: '哈哈哈学院',
    campus: '邯郸校区',
    language: '中文',
    remark: '上海市精品课程',
    examType: '论文',
    examTime: 'coiwdjqowijd',
    withdrawable: '是',
    r3limit: '无',
  },
  difficulty: 3,
  nice: 2,
  workload: 1,
  rated: false,
  watched: true,
  ratingId: undefined,
};
