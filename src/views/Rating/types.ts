import { Dayjs } from 'dayjs';

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

export interface Rate extends RateForm {
  /** 草稿 */
  draft?: RateForm;
}
