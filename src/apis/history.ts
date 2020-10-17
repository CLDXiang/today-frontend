import { CardLectureItem, CardUserItem } from '@/components/listCard';
import log from '@/utils/log';

type CardHistoryItem = CardLectureItem | CardUserItem;

interface GetHistoryListReq {
  /** 用户名 */
  username: string;
  /** 足迹类型 - user / lecture */
  type?: string;
  /** 分页 - 最后一个 history 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetHistoryListResp {
  msg: string;
  data: CardHistoryItem[];
}

const mockHistories: CardHistoryItem[] = [
  {
    email: 'abc@def.xyz',
    name: 'xiao_ming',
    nickname: '小明',
    avatar: 'https://xxx.jpg',
    bio: '个性签名个性签名个性签名个性签名个性签名',
  },
];

// FIXME: mock
const getHistoryList: (req: GetHistoryListReq) => Promise<GetHistoryListResp> = (req) =>
  new Promise<GetHistoryListResp>((resolve) => {
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
