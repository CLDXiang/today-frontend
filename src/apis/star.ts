import {
  CardCommonItem,
} from '@/components/listCard';
import log from '@/utils/log';
import { mockStars } from './mocks/star';

// FIXME: mock
const getStarList: (req: {
  /** 用户 Id */
  userId: string;
  /** 分页 - 最后一个 star 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg?: string;
  data: CardCommonItem[];
}> = async (req) => {
  log.info('starClient.getStarList', req);
  return {
    data: mockStars,
  };
};

const starClient = {
  getStarList,
};

export default starClient;
