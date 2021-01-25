import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import axios from 'axios';
import { API_URL } from '@/utils/config';
import { RateForm } from '@/views/Rating/types';
import {
  GetRatesRespDto,
  GetRatesLectureIdRespDto,
  PostRatesRespDto,
  PostRatesReqDto,
  PatchRatesLectureIdReqDto,
  PatchRatesLectureIdRespDto,
  DeleteRatesLectureIdRespDto,
} from './dto';
import { transferRateItemToCardRatingItem } from './utils';
import { RateDraftDtoPartial } from '../rateDraft/types';

/** 获取某用户的点评列表 */
const getRatingListByUser: (req: {
  /** 用户 Id */
  userId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 分页 - 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.getRatingListByUser', req);
    axios
      .get<GetRatesRespDto>(`${API_URL}/rates`, {
        params: {
          user_id: req.userId,
          last_id: req.lastId,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 获取某门课的点评列表 */
const getRatingListByLecture: (req: {
  /** 课程 Id */
  lectureId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.getRatingListByLecture', req);
    axios
      .get<GetRatesRespDto>(`${API_URL}/rates`, {
        params: {
          lecture_id: req.lectureId,
          last_id: req.lastId,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 根据 Lecture Id 获取点评 */
const getRatingByLectureId: (req: {
  /** Lecture Id */
  lectureId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 分页 - 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: RateForm | RateDraftDtoPartial;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.getRatingById', req);
    axios
      .get<GetRatesLectureIdRespDto>(`${API_URL}/rates/${req.lectureId}`)
      .then(({ data: { data } }) => {
        resolve({
          data,
        });
      })
      .catch((err) => reject(err));
  });

/** 获取点评列表 */
const getRatingList: (req: {
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 分页 - 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.getRatingList');
    axios
      .get<GetRatesRespDto>(`${API_URL}/rates`, {
        params: {
          last_id: req.lastId,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 发布点评 */
const saveRating: (req: {
  /** 课程 Id */
  lectureId: string;
  /** 难易程度 */
  difficulty: number;
  /** 给分好坏 */
  nice: number;
  /** 工作量 */
  workload: number;
  /** 综合推荐指数 */
  recommended: number;
  /** 评价内容 */
  content: string;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.saveRating', req);
    axios
      .post<PostRatesRespDto>(`${API_URL}/rates`, req as PostRatesReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 编辑点评 */
const editRating: (req: {
  /** Lecture Id */
  lectureId: string;
  /** 难易程度 */
  difficulty?: number;
  /** 给分好坏 */
  nice?: number;
  /** 工作量 */
  workload?: number;
  /** 综合推荐指数 */
  recommended?: number;
  /** 评价内容 */
  content?: string;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.editRating', req);
    axios
      .patch<PatchRatesLectureIdRespDto>(`${API_URL}/rates/${req.lectureId}`, req as PatchRatesLectureIdReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 删除点评 */
const deleteRating: (req: {
  /** Lecture Id */
  lectureId: string;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateClient.deleteRating', req);
    axios
      .delete<DeleteRatesLectureIdRespDto>(`${API_URL}/rates/${req.lectureId}`)
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

const rateClient = {
  /** 获取某用户的点评列表 */
  getRatingListByUser,
  /** 获取某门课的点评列表 */
  getRatingListByLecture,
  /** 根据 Lecture Id 获取点评 */
  getRatingByLectureId,
  /** 获取点评列表 */
  getRatingList,
  /** 发布点评 */
  saveRating,
  /** 编辑点评 */
  editRating,
  /** 删除点评 */
  deleteRating,
};

export default rateClient;
