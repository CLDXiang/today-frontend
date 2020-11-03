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
  // TODO: 加上数据
  msg?: string;
}

/** GET rates/:id Resp */
export interface GetRatesIdRespDto {
  data: RawRate;
}

/** PATCH rates/:id Req */
export interface PatchRatesIdReqDto {
  data: RawRate;
}

/** DELETE rates/:id Req */
export interface DeleteRatesIdReqDto {
  id: string;
}

/** DELETE rates/:id Resp */
export interface DeleteRatesIdRespDto {
  msg?: string;
}
