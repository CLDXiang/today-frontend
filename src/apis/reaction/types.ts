import { EmojiTable } from '@/components/reaction';

/** API 单次 emoji */
export interface RawEmoji {
  /** 创建者 User ID */
  id: string;
  /** 创建者昵称 */
  nickname: string;
  /** 创建时间 */
  createdAt: string;
}

// API Reaction 一级字段
export interface RawReactionType {
  /** Uni ID */
  id: string;
  /** 总 Reaction 数 */
  count: number;
  /** 各 Reaction 信息 */
  emoji: { [emojiId: string]: RawEmoji[] };
}

export interface ReactionType {
  /** Uni ID */
  id: string;
  /** 总 Reaction 数 */
  count: number;
  /** 各 Reaction 信息 */
  emoji: EmojiTable;
}

export interface PostReactionsIdResp {
  /** Reaction */
  data: RawReactionType;
}

export interface DeleteReactionsIdResp {
  /** Reaction */
  data: RawReactionType;
}
