import { LectureItem, LectureDetailDto } from './types';

/** GET lectures Resp */
export interface GetLecturesRespDto {
  /** 课程列表 */
  data: LectureItem[];
}

/** GET lectures/:id Resp */
export interface GetLecturesIdRespDto {
  /** 课程信息 */
  data: LectureDetailDto;
}
