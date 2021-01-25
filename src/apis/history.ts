import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockHistories } from './mocks/history';

// FIXME: mock
const getHistoryList = async (req: {
  /** 用户 Id */
  userId: string;
  /** 足迹类型 - user / lecture */
  type?: string;
  /** 分页 - 最后一个 history 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}): Promise<{
  msg?: string;
  data: CardCommonItem[];
}> => {
  log.info('historyClient.getHistoryList', req);
  return { data: mockHistories };
};

const historyClient = {
  getHistoryList,
};

export default historyClient;
