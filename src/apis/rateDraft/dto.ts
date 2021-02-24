import { RateDraftDto, RateDraftDtoPartial } from './types';

/** POST rate_drafts Req */
export interface PostRateDraftsReqDto extends RateDraftDtoPartial {
  /** Lecture Id */
  lectureId: string;
}

/** GET rate_drafts/:lectureId Resp */
export interface GetRateDraftsLectureIdRespDto {
  data: RateDraftDto;
}

/** PATCH rate_drafts/:lectureId Req */
export type PatchRateDraftsLectureIdReqDto = RateDraftDtoPartial;
