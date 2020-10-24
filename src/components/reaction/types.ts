/** 单条 emoji 记录 */
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
export type EmojiEntry = {
  /** emoji Id */
  emojiId: string;
  /** emoji 记录列表 */
  emojiItems: EmojiItem[];
  /** 当前用户的 Reaction 在其中的位置 */
  activeIndex: number;
};
