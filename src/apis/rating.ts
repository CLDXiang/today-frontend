import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockRatings, mockRate } from './mocks/rating';
import { Rate } from './types';

// FIXME: mock
/** 获取某用户的点评列表 */
const getRatingListByUser: (req: {
  /** 用户 Id */
  userId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit?: number;
}) => Promise<{
  msg: string;
  data: CardRatingItem[];
}> = (
  req,
) =>
  new Promise((resolve) => {
    log.info('ratingClient.getRatingListByUser', req);
    resolve({
      msg: 'ok',
      data: mockRatings,
    });
  });

// FIXME: mock
/** 获取某门课的点评列表 */
const getRatingListByLecture: (req: {
  /** 课程 Id */
  lectureId: string;
  /** 分页 - 最后一个 rating 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit?: number;
}) => Promise<{
  msg: string;
  data: CardRatingItem[];
}> = (
  req,
) =>
  new Promise((resolve) => {
    log.info('ratingClient.getRatingListByLecture', req);
    resolve({
      msg: 'ok',
      data: mockRatings,
    });
  });

// FIXME: mock
/** 根据 Id 获取点评 */
const getRatingById: (req: {
  /** 点评 Id */
  ratingId: string;
}) => Promise<{
  msg?: string;
  data: Rate;
}> = (
  req,
) =>
  new Promise((resolve) => {
    log.info('ratingClient.getRatingById', req);
    resolve({
      msg: 'ok',
      data: mockRate,
    });
  });

// FIXME: mock
/** 获取点评列表 */
const getRatingList: () => Promise<{
  msg: string;
  data: CardRatingItem[];
}> = () =>
  new Promise((resolve) => {
    log.info('ratingClient.getRatingList');
    resolve({
      msg: 'ok',
      data: mockRatings,
    });
  });

const ratingClient = {
  getRatingListByUser,
  getRatingListByLecture,
  getRatingById,
  getRatingList,
};

export default ratingClient;
