import { CardLectureItem } from '@/components/listCard';
import { LectureDetail } from '../types';

export const mockSelects: CardLectureItem[] = [
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
  {
    id: 'COMP233333.4',
    type: 'lecture',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 85,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
];

export const mockLectureDetail: LectureDetail = {
  id: 'ididid',
  code: 'COMP111232.23',
  taughtBy: ['老王', '老李'],
  name: '测试课程名',
  credit: 2,
  department: '哈哈哈学院',
  campus: '邯郸校区',
  language: '中文',
  remark: '上海市精品课程',
  examType: '论文',
  examTime: 'XXXXXX',
  withdrawable: '是',
  r3limit: '无',
  reaction: {
    count: 15,
    emoji: {
      emoji1: [{
        id: '1',
        nickname: 'haha',
      }, {
        id: '2',
        nickname: 'biubiu',
      }],
      emoji2: [{
        id: '1',
        nickname: 'haha',
      }],
    },
  },
  rateCount: 123,
  starCount: 321,
  starred: true,
  difficulty: 3.2,
  grade: 4.5,
  workload: 2.3,
  overall: 4,
};
