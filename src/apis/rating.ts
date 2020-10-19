import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockRatings } from './mocks/rating';

interface GetRatingListReq {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 rating 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetRatingListResp {
  msg: string;
  data: CardRatingItem[];
}

// FIXME: mock
const getRatingList: (req: GetRatingListReq) => Promise<GetRatingListResp> = (
  req,
) =>
  new Promise<GetRatingListResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockRatings,
    });
  });

const ratingClient = {
  getRatingList,
};

export default ratingClient;
