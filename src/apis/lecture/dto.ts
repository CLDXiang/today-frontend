import { LectureItem, LectureDetail } from './types';

/** GET lectures Resp */
export interface GetLecturesRespDto {
  /** 返回信息（非 200 时给用户看的） */
  msg?: string;
  /** 课程列表 */
  data: LectureItem[];
}

/** GET lectures/:id Resp */
export interface GetLecturesIdRespDto {
  /** 返回信息（非 200 时给用户看的） */
  msg?: string;
  /** 课程信息 */
  data: LectureDetail;
}