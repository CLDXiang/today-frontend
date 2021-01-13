import { ReactionType } from '../reaction/types';

export interface RawRateFormResp {
  /** 难易程度 */
  difficulty: number;
  /** 给分好坏 */
  nice: number;
  /** 工作量 */
  workload: number;
  /** 综合推荐指数 */
  recommended: number;
  /** 评价内容 */
  content: string;
  /** 发布时间 */
  updatedAt: string;
}

export interface RawRateResp extends RawRateFormResp {
  /** 草稿 */
  draft?: RawRateFormResp;
  /** 课程 Id */
  lectureId?: string;
}

export interface RawRateForm {
  /** 难易程度 */
  difficulty?: number;
  /** 给分好坏 */
  nice?: number;
  /** 工作量 */
  workload?: number;
  /** 综合推荐指数 */
  recommended?: number;
  /** 评价内容 */
  content?: string;
  /** 更新时间 */
  updatedAt?: string;
}

export interface RawRate extends RawRateForm {
  /** 草稿 */
  draft?: RawRateForm;
}

export interface RateItem {
  /** 点评 ID */
  id: string;
  /** 点评发布者信息 */
  creator: {
    /** 发布者用户 ID */
    id: string;
    /** 发布者昵称 */
    nickname: string;
    /** 发布者头像 */
    avatar: string;
  };
  /** 发布时间 */
  createdAt: string;
  /** 发布时间 */
  updatedAt: string;
  /** 点评表单 */
  form: RawRateForm;
  /** 课程信息 */
  lecture: {
    /** lecture ID */
    id: string;
    /** 课程名称 */
    name: string;
    /** 授课教师 */
    teachers: string[];
  };
  /** 回复数 */
  commentCount: number;
  /** 收藏数 */
  starCount: number;
  /** 当前用户是否收藏 */
  starred: boolean;
  /** Reaction 概要（此页面是否展示 Reaction 看 UI 反馈，若不展示去掉此字段） */
  reaction: ReactionType;
}