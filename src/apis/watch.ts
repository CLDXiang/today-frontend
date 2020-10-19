import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockWatches } from './mocks/watch';

// FIXME: mock
const getWatchList: (req: {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 user 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardCommonItem[];
}> = (
  req,
) =>
  new Promise((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockWatches,
    });
  });

const watchClient = {
  getWatchList,
};

export default watchClient;
