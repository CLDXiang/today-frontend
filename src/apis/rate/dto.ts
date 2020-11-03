import { RateItem, RawRate } from './types';

/** GET rates Resp */
export interface GetRatesRespDto {
  /** 列表数据 */
  data: RateItem[];
}

/** POST rates Req */
export interface PostRatesReqDto {
  /** 点评 */
  data: RawRate;
}

/** POST rates Resp */
export interface PostRatesRespDto {
  msg?: string;
  data: RateItem[];
}

/** GET rates/:id Resp */
export interface GetRatesIdRespDto {
  data: RawRate;
}

/** PATCH rates/:id Req */
export interface PatchRatesIdReqDto {
  data: RawRate;
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
