// FIXME: 在 @/components/listCard 中也有定义，考虑放哪比较好
interface RateForm {
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
}

export interface Rate extends RateForm {
  /** 草稿 */
  draft?: RateForm;
}
