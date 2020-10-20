import { ReactionFieldValue } from './reaction';

export interface LectureType {
  /** Lecture ID */
  id: string;
  /** 课程代码 */
  code: string;
  /** 教师 */
  taughtBy: string[];
  /** 课程名 */
  name: string;
  /** 学分 */
  credit: number;
  /** 开课院系 */
  department: string;
  /** 校区 */
  campus: string;
  /** 语言 */
  language: string;
  /** 备注 */
  remark: string;
  /** 考试形式 */
  examType: string;
  /** 考试时间 */
  examTime: string;
  /** 期中是否允许退课 */
  withdrawable: string;
  /** 三轮选课是否限制 */
  r3limit: string;
}

export interface LectureItem extends LectureType {
  /** Reaction 概要（此页面是否展示 Reaction 看 UI 反馈，若不展示去掉此字段） */
  reaction: ReactionFieldValue;
  /** 评课数 */
  rateCount: number;
  /** 收藏数 */
  starCount: number;
  /** 当前用户是否收藏 */
  starred: boolean;
}

export interface LectureDetail extends LectureItem {
  /** 难易程度 */
  difficulty: number;
  /** 给分好坏 */
  grade: number;
  /** 工作量 */
  workload: number;
  /** 综合推荐指数 */
  overall: number;
}
