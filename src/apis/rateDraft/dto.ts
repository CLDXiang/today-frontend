import { RateDraftDto, RateDraftDtoPartial } from './types';

/** POST rate_drafts Req */
export interface PostRateDraftsReqDto extends RateDraftDtoPartial {
  /** Lecture Id */
  lectureId: string;
}

/** POST rate_drafts Resp */
export interface PostRateDraftsRespDto {
  msg?: string;
}

/** GET rate_drafts/:lectureId Resp */
export interface GetRateDraftsLectureIdRespDto {
  msg?: string;
  data: RateDraftDto;
}

/** PATCH rate_drafts/:lectureId Req */
export type PatchRateDraftsLectureIdReqDto = RateDraftDtoPartial;

/** PATCH rate_drafts/:lectureId Resp */
export interface PatchRateDraftsLectureIdRespDto {
  msg?: string;
}

/** DELETE rate_drafts/:lectureId Resp */
export interface DeleteRateDraftsLectureIdRespDto {
  msg?: string;
}
