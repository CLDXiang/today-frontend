import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import axios from 'axios';
import { API_URL } from '@/utils/config';
import { dayjsFormatOrUndefined } from '@/utils/dayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Rate } from '@/views/Rating/types';
import {
  GetRatesRespDto,
  GetRatesIdRespDto,
  PostRatesRespDto,
  PostRatesReqDto,
  PatchRatesIdReqDto,
  PatchRatesIdRespDto,
  DeleteRatesIdRespDto,
} from './dto';
import { transferRateItemToCardRatingItem } from './utils';

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
    log.info('ratingClient.getRatingListByUser', req);
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
    log.info('ratingClient.getRatingListByLecture', req);
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

/** 根据 Id 获取点评 */
const getRatingById: (req: {
  /** 点评 Id */
  ratingId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 分页 - 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: Rate;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.getRatingById', req);
    axios
      .get<GetRatesIdRespDto>(`${API_URL}/rates/${req.ratingId}`)
      .then(({ data: { data } }) => {
        const res = {
          ...data,
          updatedAt: dayjs(data.updatedAt),
          draft: data.draft
            ? {
              ...data.draft,
              updatedAt: dayjs(data.draft.updatedAt),
            }
            : undefined,
        };
        resolve({
          data: res,
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
    log.info('ratingClient.getRatingList');
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
const createRating: (req: {
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
  /** 更新时间 */
  updatedAt: Dayjs;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.createRating', req);
    axios
      .post<PostRatesRespDto>(`${API_URL}/rates`, {
        ...req,
        updatedAt: dayjsFormatOrUndefined(req.updatedAt),
      } as PostRatesReqDto)
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 存草稿 */
const createDraft: (req: {
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
  /** 更新时间 */
  updatedAt: Dayjs;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.createDraft', req);
    axios
      .post<PostRatesRespDto>(`${API_URL}/rates`, {
        lectureId: req.lectureId,
        draft: {
          ...req,
          updatedAt: dayjsFormatOrUndefined(req.updatedAt),
        },
      } as PostRatesReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 编辑点评 */
const editRating: (req: {
  /** 点评 Id */
  ratingId: string;
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
  /** 更新时间 */
  updatedAt: Dayjs;
}) => Promise<{
  msg?: string;
  data: CardRatingItem;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.editRating', req);
    axios
      .patch<PatchRatesIdRespDto>(`${API_URL}/rates/${req.ratingId}`, {
        ...req,
        updatedAt: dayjsFormatOrUndefined(req.updatedAt),
      } as PatchRatesIdReqDto)
      .then(({ data: { data } }) => {
        const res = transferRateItemToCardRatingItem(data);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 编辑草稿 */
const editDraft: (req: {
  /** 点评 Id */
  ratingId: string;
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
  /** 更新时间 */
  updatedAt: Dayjs;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.editDraft', req);
    axios
      .patch<PatchRatesIdRespDto>(`${API_URL}/rates/${req.ratingId}`, {
        draft: {
          ...req,
          updatedAt: dayjsFormatOrUndefined(req.updatedAt),
        },
      } as PatchRatesIdReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 删除点评 */
const deleteRating: (req: {
  /** 点评 Id */
  ratingId: string;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('ratingClient.deleteRating', req);
    axios
      .delete<DeleteRatesIdRespDto>(`${API_URL}/rates/${req.ratingId}`)
      .then(({ data: { data } }) => {
        const res = data.map(transferRateItemToCardRatingItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

const ratingClient = {
  getRatingListByUser,
  getRatingListByLecture,
  getRatingById,
  getRatingList,
  createRating,
  createDraft,
  editRating,
  editDraft,
  deleteRating,
};

export default ratingClient;
