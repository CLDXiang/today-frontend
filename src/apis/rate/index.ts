import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import API from '@/utils/axios';
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
}> = async (req) => {
  log.info('rateClient.getRatingListByUser', req);
  try {
    const { data: { data } } = await API.get<GetRatesRespDto>('rates', {
      params: {
        user_id: req.userId,
        last_id: req.lastId,
        limit: req.limit,
      },
    });
    return { data: data.map(transferRateItemToCardRatingItem) };
  } catch (err) {
    return err;
  }
};

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
}> = async (req) => {
  log.info('rateClient.getRatingListByLecture', req);
  try {
    const { data: { data } } = await API.get<GetRatesRespDto>('rates', {
      params: {
        lecture_id: req.lectureId,
        last_id: req.lastId,
        limit: req.limit,
      },
    });
    return { data: data.map(transferRateItemToCardRatingItem) };
  } catch (err) {
    return err;
  }
};

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
}> = async (req) => {
  log.info('rateClient.getRatingById', req);
  const { data: { data } } = await API.get<GetRatesLectureIdRespDto>(`rates/${req.lectureId}`);
  return { data };
};

/** 获取点评列表 */
const getRatingList: (req: {
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 分页 - 拉取条数 */
  limit?: number;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = async (req) => {
  log.info('rateClient.getRatingList');
  const { data: { data } } = await API.get<GetRatesRespDto>('rates', {
    params: {
      last_id: req.lastId,
      limit: req.limit,
    },
  });
  return { data: data.map(transferRateItemToCardRatingItem) };
};

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
}> = async (req) => {
  log.info('rateClient.saveRating', req);
  await API.post<PostRatesRespDto>('rates', req as PostRatesReqDto);
  return {};
};

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
}> = async (req) => {
  log.info('rateClient.editRating', req);
  await API.patch<PatchRatesLectureIdRespDto>(`rates/${req.lectureId}`, req as PatchRatesLectureIdReqDto);
  return {};
};

/** 删除点评 */
const deleteRating: (req: {
  /** Lecture Id */
  lectureId: string;
}) => Promise<{
  msg?: string;
  data: CardRatingItem[];
}> = async (req) => {
  log.info('rateClient.deleteRating', req);
  const { data: { data } } = await API.delete<DeleteRatesLectureIdRespDto>(`rates/${req.lectureId}`);
  return { data: data.map(transferRateItemToCardRatingItem) };
};

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
