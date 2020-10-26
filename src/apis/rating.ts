import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockRatings } from './mocks/rating';

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
/** 获取某用户对某门课的点评 */
const getRating: (req: {
  /** 用户 Id */
  userId: string;
  /** 课程 Id */
  lectureId: string;
}) => Promise<{
  msg: string;
  data: CardRatingItem | undefined;
}> = (
  req,
) =>
  new Promise((resolve) => {
    log.info('ratingClient.getRating', req);
    resolve({
      msg: 'ok',
      data: mockRatings[0],
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
  getRating,
  getRatingList,
};

export default ratingClient;
