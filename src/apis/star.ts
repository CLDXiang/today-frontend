import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockStars } from './mocks/star';

// FIXME: mock
const getStarList: (req: {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 star 的 id */
  last_id?: string;
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
      data: mockStars,
    });
  });

const starClient = {
  getStarList,
};

export default starClient;
