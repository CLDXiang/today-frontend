import { RawReactionType } from '../reaction/types';

export interface CommentItem {
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
  /** Reaction 概要（此页面是否展示 Reaction 看 UI 反馈，若不展示去掉此字段） */
  reaction: RawReactionType;
}
