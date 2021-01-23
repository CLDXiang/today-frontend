import { CardLectureItem } from '@/components/listCard';
import axios from 'axios';
import { API_URL } from '@/utils/config';
import log from '@/utils/log';
import {
  LectureDetail,
  GetLecturesRespDto,
  GetLecturesIdRespDto,
} from './dto';
import { transferLectureItemToCardLectureItem } from './utils';

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
    axios
      .get<GetLecturesRespDto>(`${API_URL}/lectures`, {
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
    axios
      .get<GetLecturesRespDto>(`${API_URL}/lectures`, {
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

const getLectureDetail: (req: {
  /** Lecture Id */
  lectureId: string;
}) => Promise<{
  msg?: string;
  data: LectureDetail;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('lectureClient.getLectureDetail', req);
    axios
      .get<GetLecturesIdRespDto>(`${API_URL}/lectures/${req.lectureId}`, {
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
