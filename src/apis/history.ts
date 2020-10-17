import { CardCommonItem } from '@/components/listCard';
import log from '@/utils/log';
import dayjs from 'dayjs';

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
  data: CardCommonItem[];
}

// FIXME: how to handle HistoryItems?
const mockStars: CardCommonItem[] = [
  {
    id: '233',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: 'https://xxx.jpg',
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    lecture: {
      id: 'COMP233333.3',
      name: '思修',
      teachers: ['老师1', '老师2'],
    },
    commentCount: 323,
    starCount: 213,
    starred: true,
    reaction: {
      count: 123,
      emoji: {
        smile: [
          { id: '235', nickname: '小红' },
          { id: '236', nickname: '小白' },
        ],
      },
    },
  },
  {
    id: '234',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: 'https://xxx.jpg',
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    lecture: {
      id: 'COMP233333.3',
      name: '思修',
      teachers: ['老师1', '老师2'],
    },
    commentCount: 323,
    starCount: 213,
    starred: true,
    reaction: {
      count: 123,
      emoji: {
        smile: [
          { id: '235', nickname: '小红' },
          { id: '236', nickname: '小白' },
        ],
      },
    },
  },
];

// FIXME: mock
const getHistoryList: (req: GetHistoryListReq) => Promise<GetHistoryListResp> = (
  req,
) =>
  new Promise<GetHistoryListResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockStars,
    });
  });

const historyClient = {
  getHistoryList,
};

export default historyClient;
