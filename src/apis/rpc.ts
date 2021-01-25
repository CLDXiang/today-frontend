import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockLectures } from './mocks/rpc';

// FIXME: mock
const search: (req: {
  /** 搜索字串 */
  q: string;
  /** 分页 - 最后一条 ID */
  lastId?: string;
  /** 分页 - 项数 */
  limit: number;
}) => Promise<{
  msg?: string;
  data: CardLectureItem[];
}> = async (req) => {
  log.info('rpcClient.search', req);
  return { data: mockLectures };
};

const rpcClient = {
  search,
};

export default rpcClient;
