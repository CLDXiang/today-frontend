import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockHistories } from './mocks/history';

// FIXME: mock
const getHistoryList: (req: {
  /** 用户 Id */
  userId: string;
  /** 足迹类型 - user / lecture */
  type?: string;
  /** 分页 - 最后一个 history 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardCommonItem[];
}> = (req) =>
  new Promise((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockHistories,
    });
  });

const historyClient = {
  getHistoryList,
};

export default historyClient;
