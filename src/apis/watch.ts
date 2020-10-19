import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockWatches } from './mocks/watch';

interface GetWatchListReq {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 user 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetWatchListResp {
  msg: string;
  data: CardCommonItem[];
}

// FIXME: mock
const getWatchList: (req: GetWatchListReq) => Promise<GetWatchListResp> = (
  req,
) =>
  new Promise<GetWatchListResp>((resolve) => {
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
