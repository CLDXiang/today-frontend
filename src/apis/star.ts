import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockStars } from './mocks/star';

interface GetStarListReq {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 star 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetStarListResp {
  msg: string;
  data: CardCommonItem[];
}

// FIXME: mock
const getStarList: (req: GetStarListReq) => Promise<GetStarListResp> = (req) =>
  new Promise<GetStarListResp>((resolve) => {
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
