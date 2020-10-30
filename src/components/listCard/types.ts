// TODO: 根据 API 调整
import { Dayjs } from 'dayjs';

interface ReactionFieldValue {
  /** 总 Reaction 数 */
  count: number;
  /** 各 Reaction 信息 */
  emoji: {
    [emojiId: string]: {
      /** 创建者 User ID */
      id: string;
      /** 创建者昵称 */
      nickname: string;
    }[];
  };
}

export interface RateForm {
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
  updatedAt?: Dayjs;
}

/** 点评类列表项 */
export interface CardRatingItem {
  /** 点评 ID */
  id: string;
  /** 类型 */
  type?: string;
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
  createdAt: Dayjs;
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
  reaction: ReactionFieldValue;
  /** 点评表单 */
  form: RateForm;
}

/** 回复类列表项 */
export interface CardCommentItem {
  /** 回复 ID */
  id: string;
  /** 类型 */
  type?: string;
  /** 回复者信息 */
  creator: {
    /** 回复者用户 ID */
    id: string;
    /** 回复者昵称 */
    nickname: string;
    /** 回复者头像 */
    avatar: string;
  };
  /** 回复时间 */
  createdAt: Dayjs;
  /** 回复内容 */
  content: string;
  /** 点评 ID */
  rateID: string;
  /** 收藏数 */
  starCount: number;
  /** 当前用户是否收藏 */
  starred: boolean;
  /** Reaction 概要（此页面是否展示 Reaction 看 UI 反馈，若不展示去掉此字段） */
  reaction: ReactionFieldValue;
}

/** 课程类列表项 */
export interface CardLectureItem {
  /** lecture ID */
  id: string;
  /** 类型 */
  type?: string;
  /** 课程名称 */
  name: string;
  /** 授课教师 */
  teachers: string[];
  /** 平均综合评分 */
  score: number;
  /** reaction 数（TODO: 如果 reaction 系统能够完成设计，可以返回各 reaction 数量） */
  reactionCount: number;
  /** 评价数 */
  ratingCount: number;
  /** 收藏数 */
  likeCount: number;
}

/** 用户类列表项 */
export interface CardUserItem {
  /** 用户 id */
  id: string;
  /** 类型 */
  type?: string;
  /** 用户邮箱 */
  email: string;
  /** 用户名 */
  name: string;
  /** 用户昵称 */
  nickname: string;
  /** 用户头像 */
  avatar: string;
  /** 个性签名 */
  bio: string;
}

/** 类型不定列表项 */
export type CardCommonItem = CardCommentItem | CardLectureItem | CardRatingItem | CardUserItem;
