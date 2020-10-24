/** 单次 emoji */
export interface EmojiItem {
  /** 创建者 User ID */
  id: string;
  /** 创建者昵称 */
  nickname: string;
  /** 创建时间（原始） */
  createdAt: string;
}

/** reaction emoji 字段表 */
export type EmojiTable = {
  [emojiId: string]: EmojiItem[];
};

/** EmojiTable Entry */
export type EmojiEntry = [string, EmojiItem[]];
