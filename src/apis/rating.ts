import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockRatings } from './mocks/rating';

// FIXME: mock
const getRatingList: (req: {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 rating 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardRatingItem[];
}> = (
  req,
) =>
  new Promise((resolve) => {
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
