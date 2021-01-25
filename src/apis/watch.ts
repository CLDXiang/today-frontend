import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockWatches } from './mocks/watch';

// FIXME: mock
const getWatchList = async (req: {
  /** 用户 Id */
  userId: string;
  /** 分页 - 最后一个 user 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}): Promise<{
  msg?: string;
  data: CardCommonItem[];
}> => {
  log.info('watchClient.getWatchList', req);
  return {
    data: mockWatches,
  };
};

const watchClient = {
  getWatchList,
};

export default watchClient;
