import { RateItem, RawRate, RawRateResp } from './types';

/** GET rates Resp */
export interface GetRatesRespDto {
  /** 列表数据 */
  data: RateItem[];
}

/** POST rates Req */
export interface PostRatesReqDto {
  /** Lecture Id */
  lectureId: string;
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
  /** 发布时间 */
  updatedAt?: string;
  /** 草稿 */
  draft?: {
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
    /** 发布时间 */
    updatedAt: string;
  }
}

/** POST rates Resp */
export interface PostRatesRespDto {
  msg?: string;
  data: RateItem[];
}

/** GET rates/:id Resp */
export interface GetRatesIdRespDto {
  data: RawRateResp;
}

/** PATCH rates/:id Req */
export interface PatchRatesIdReqDto {
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
  /** 发布时间 */
  updatedAt?: string;
  /** 草稿 */
  draft?: {
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
    /** 发布时间 */
    updatedAt: string;
  }
}

/** PATCH rates/:id Resp */
export interface PatchRatesIdRespDto {
  /** 当前修改项数据 */
  data: RateItem;
}

/** DELETE rates/:id Req */
export interface DeleteRatesIdReqDto {
  id: string;
}

/** DELETE rates/:id Resp */
export interface DeleteRatesIdRespDto {
  msg?: string;
  /** 最新列表数据 */
  data: RateItem[];
}
