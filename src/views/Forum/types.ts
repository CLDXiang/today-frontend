import { Dayjs } from 'dayjs';

/** channel */
export interface Channel {
  /** channel ID */
  id: number;
  /** channel 名称 */
  name: string;
  /** channel 描述 */
  description: string;
}

/** channel 组 */
export interface ChannelGroup {
  /** channel group ID */
  id: number;
  /** channel group 名称 */
  name: string;
  /** 下属的 channels */
  channels: Channel[];
}

/** 帖子与回复本质上一样，只是多了 title */
/** 帖子 */
export interface Post {
  /** 帖子 ID */
  id: number;
  /** 帖子内容 */
  content: string;
  /** 帖子标题 */
  title?: string;
  /** 回复数量 */
  replyCount?: number;
  /** 赞的数量 */
  thumbUpCount: number;
  /** 创建时间 */
  createdAt: Dayjs;
  /** 发布者信息 */
  creator: {
    /** 发布者用户 ID */
    id: string;
    /** 发布者昵称 */
    nickname: string;
    /** 发布者头像 */
    avatar: string;
  };
}
