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

/** GET rates/:lectureId Resp */
export interface GetRatesLectureIdRespDto {
  data: RateFormDto | RateDraftDtoPartial;
}

/** PATCH rates/:lectureId Req */
export type PatchRatesLectureIdReqDto = RateFormDtoPartial;

/** DELETE rates/:lectureId Resp */
export interface DeleteRatesLectureIdRespDto {
  /** 最新列表数据 */
  data: RateItem[];
}
