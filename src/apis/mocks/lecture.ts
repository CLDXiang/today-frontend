import { CardLectureItem } from '@/components/listCard';
import { LectureItem } from '../types';

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

export const mockLectureItem: LectureItem = {
/** Lecture ID */
  id: 'ididid',
  /** 课程代码 */
  code: 'codecode',
  /** 教师 */
  taughtBy: ['t1', 't2'],
  /** 课程名 */
  name: 'name',
  /** 学分 */
  credit: 2,
  /** 开课院系 */
  department: 'department',
  /** 校区 */
  campus: 'campus',
  /** 语言 */
  language: 'language',
  /** 备注 */
  remark: 'remark',
  /** 考试形式 */
  examType: 'examType',
  /** 考试时间 */
  examTime: 'examType',
  /** 期中是否允许退课 */
  withdrawable: 'withdrawable',
  /** 三轮选课是否限制 */
  r3limit: 'r3limit',
  /** Reaction 概要（此页面是否展示 Reaction 看 UI 反馈，若不展示去掉此字段） */
  reaction: {
    /** 总 Reaction 数 */
    count: 15,
    /** 各 Reaction 信息 */
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
  /** 评课数 */
  rateCount: 123,
  /** 收藏数 */
  starCount: 321,
  /** 当前用户是否收藏 */
  starred: true,
};
