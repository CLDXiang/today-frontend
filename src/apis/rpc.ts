import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockLectures } from './mocks/rpc';

interface SearchReq {
  /** 搜索字串 */
  q: string;
  /** 分页 - 最后一条 ID */
  last_id?: string;
  /** 分页 - 项数 */
  limit: number;
}

interface SearchResp {
  msg: string;
  data: CardLectureItem[];
}

// FIXME: mock
const search: (req: SearchReq) => Promise<SearchResp> = (req) =>
  new Promise<SearchResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockLectures,
    });
  });

const rpcClient = {
  search,
};

export default rpcClient;
