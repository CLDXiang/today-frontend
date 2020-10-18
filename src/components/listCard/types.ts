// TODO: 根据 API 调整
import { Dayjs } from 'dayjs';

/** 点评类列表页 */
export interface CardRatingItem {
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
  createdAt: Dayjs;
  /** 点评内容（TODO: 概要？后端仅返回一部分？） */
  content: string;
  /** 课程信息 */
  lecture: {
    /** lecture ID */
    id: string;
    /** 课程名称 */
    name: string;
    /** 授课教师 */
    teachers: string[];
  };
  /** reaction 数（TODO: 如果 reaction 系统能够完成设计，可以返回各 reaction 数量） */
  reactionCount: number;
  /** 回复数 */
  replyCount: number;
  /** 点赞数 */
  likeCount: number;
}

/** 课程类列表项 */
export interface CardLectureItem {
  /** lecture ID */
  id: string;
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
  /** User ID */
  id: string;
  /** 邮箱 */
  email: string;
  /** 用户名 */
  name: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar: string;
  /** 个性签名 */
  bio: string;
}

export interface CardCommentItem {
  /** 回复 ID */
  id: string;
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
  createdAt: string;
  /** 回复内容 */
  content: string;
  /** 点评 ID */
  rateID: string;
  /** 收藏数 */
  starCount: number;
  /** 当前用户是否收藏 */
  starred: boolean;
}
