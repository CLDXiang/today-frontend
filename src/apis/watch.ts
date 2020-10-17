import { CardLectureItem, CardUserItem } from '@/components/listCard';
import log from '@/utils/log';

type CardWatchItem = CardLectureItem | CardUserItem;

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
  data: CardWatchItem[];
}

const mockWatches: CardWatchItem[] = [
  {
    email: 'abc@def.xyz',
    name: 'xiao_ming',
    nickname: '小明',
    avatar: 'https://xxx.jpg',
    bio: '个性签名个性签名个性签名个性签名个性签名',
  },
];

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
