import { LectureItem } from '../lecture/types';

/** GET search Resp */
export interface GetSearchRespDto {
  /** 课程列表 */
  data: LectureItem[];
}
