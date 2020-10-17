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
    /** 课程 ID */
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
  /** 课程 ID */
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
  // TODO: finish this section
  /** 用户 ID */
  id: string;
}
