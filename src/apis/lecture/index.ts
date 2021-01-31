import { CardLectureItem } from '@/components/listCard';
import API from '@/utils/axios';
import log from '@/utils/log';
import { LectureDetail } from './types';
import {
  GetLecturesRespDto,
  GetLecturesIdRespDto,
} from './dto';
import { transferLectureItemToCardLectureItem } from './utils';

// /** 获取某用户的课程列表 */
// const getSelectList = async (req: {
//   /** 用户 Id */
//   userId: string;
//   /** 拉取条数 */
//   limit: number;
//   /** 当前学期，没有时返回所有学期 */
//   semester?: string;
//   /** 分页 - 最后一个 lecture 的 id */
//   lastId?: string;
// }): Promise<{
//   data: CardLectureItem[];
// }> => {
//   log.info('lectureClient.getSelectList', req);
//   const { data: { data } } = await API.get<GetLecturesRespDto>('lectures', {
//     params: {
//       user_id: req.userId,
//       limit: req.limit,
//       last_id: req.lastId,
//     },
//   });
//   return { data: data.map(transferLectureItemToCardLectureItem) };
// };

/** 根据课程类型获得课程列表 */
const getLectureList = async (req: {
  /** 课程分类 */
  categories: string[];
  /** 拉取条数 */
  limit: number;
  /** 分页 - 最后一个 lecture 的 id */
  lastId?: string;
}): Promise<{
  data: CardLectureItem[];
}> => {
  log.info('lectureClient.getLectureList', req);
  const { data: { data } } = await API.get<GetLecturesRespDto>('lectures', {
    params: {
      categories: req.categories.join(','),
      limit: req.limit,
      last_id: req.lastId,
    },
  });
  return { data: data.map(transferLectureItemToCardLectureItem) };
};

/** 获取某课程详情 */
const getLectureDetail = async (req: {
  /** Lecture Id */
  lectureId: string;
}): Promise<{
  data: LectureDetail;
}> => {
  log.info('lectureClient.getLectureDetail', req);
  const { data: { data } } = await API.get<GetLecturesIdRespDto>(`lectures/${req.lectureId}`, {
    params: {
      id: req.lectureId,
    },
  });
  const {
    difficulty, nice, workload, recommended,
  } = data;
  const DEFAULT_SCORE = 3;
  return {
    data: {
      ...data,
      difficulty: difficulty ?? DEFAULT_SCORE,
      nice: nice ?? DEFAULT_SCORE,
      workload: workload ?? DEFAULT_SCORE,
      recommended: recommended ?? DEFAULT_SCORE,
    },
  };
};

const lectureClient = {
  getLectureList,
  // getSelectList,
  getLectureDetail,
};

export default lectureClient;
