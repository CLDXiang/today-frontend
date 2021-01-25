import { RateDraftDtoPartial } from '../rateDraft/types';
import { RateItem, RateFormDto, RateFormDtoPartial } from './types';

/** GET rates Resp */
export interface GetRatesRespDto {
  /** 列表数据 */
  data: RateItem[];
}

/** POST rates Req */
export interface PostRatesReqDto extends RateFormDto {
  /** Lecture Id */
  lectureId: string;
}

/** POST rates Resp */
export interface PostRatesRespDto {
  msg?: string;
}

/** GET rates/:lectureId Resp */
export interface GetRatesLectureIdRespDto {
  msg?: string;
  data: RateFormDto | RateDraftDtoPartial;
}

/** PATCH rates/:lectureId Req */
export type PatchRatesLectureIdReqDto = RateFormDtoPartial;

/** PATCH rates/:lectureId Resp */
export interface PatchRatesLectureIdRespDto {
  msg?: string;
}

/** DELETE rates/:lectureId Resp */
export interface DeleteRatesLectureIdRespDto {
  msg?: string;
  /** 最新列表数据 */
  data: RateItem[];
}
