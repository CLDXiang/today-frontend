export interface Channel {
  /** channel ID */
  id: number;
  /** channel 名称 */
  name: string;
  /** channel 描述 */
  description: string;
}

export interface ChannelGroup {
  /** channel group ID */
  id: number;
  /** channel group 名称 */
  name: string;
  /** 下属的 channels */
  channels: Channel[];
}
