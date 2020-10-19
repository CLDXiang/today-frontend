// Reaction 一级字段
export interface ReactionFieldValue {
  /** 总 Reaction 数 */
  count: number;
  /** 各 Reaction 信息 */
  emoji: { [emojiId: string]: {
      /** 创建者 User ID */
      id: string;
      /** 创建者昵称 */
      nickname: string;
    }[];
  };
}
