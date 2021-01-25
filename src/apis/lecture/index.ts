import { CardLectureItem } from '@/components/listCard';
import API from '@/utils/axios';
import log from '@/utils/log';
import { LectureDetail } from './types';
import {
  GetLecturesRespDto,
  GetLecturesIdRespDto,
} from './dto';
import { transferLectureItemToCardLectureItem } from './utils';

/** 获取某用户的课程列表 */
const getSelectList: (req: {
  /** 用户 Id */
  userId: string;
  /** 拉取条数 */
  limit: number;
  /** 当前学期，没有时返回所有学期 */
  semester?: string;
  /** 分页 - 最后一个 lecture 的 id */
  lastId?: string;
}) => Promise<{
  msg?: string;
  data: CardLectureItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('lectureClient.getSelectList', req);
    API
      .get<GetLecturesRespDto>('lectures', {
        params: {
          user_id: req.userId,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferLectureItemToCardLectureItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 根据课程类型获得课程列表 */
const getLectureList: (req: {
  /** 课程类型 */
  type: string;
  /** 拉取条数 */
  limit: number;
  /** 分页 - 最后一个 lecture 的 id */
  lastId?: string;
}) => Promise<{
  msg?: string;
  data: CardLectureItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('lectureClient.getLectureList', req);
    API
      .get<GetLecturesRespDto>('lectures', {
        params: {
          category: req.type,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferLectureItemToCardLectureItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 获取某课程详情 */
const getLectureDetail: (req: {
  /** Lecture Id */
  lectureId: string;
}) => Promise<{
  msg?: string;
  data: LectureDetail;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('lectureClient.getLectureDetail', req);
    API
      .get<GetLecturesIdRespDto>(`lectures/${req.lectureId}`, {
        params: {
          id: req.lectureId,
        },
      })
      .then(({ data: { data } }) => {
        resolve({
          data,
        });
      })
      .catch((err) => reject(err));
  });

const lectureClient = {
  getLectureList,
  getSelectList,
  getLectureDetail,
};

export default lectureClient;
