import { CardCommentItem } from '@/components/listCard';
import log from '@/utils/log';
import dayjs from 'dayjs';

interface GetCommentListReq {
  /** 用户名 */
  username: string;
  /** 点评 ID */
  rate_id?: string;
  /** 分页 - 最后一个 comment 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetCommentListResp {
  msg: string;
  data: CardCommentItem[];
}

const mockComments: CardCommentItem[] = [
  {
    id: '1',
    type: 'comment',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: 'https://xxx.jpg',
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    rateID: '233',
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
    id: '2',
    type: 'comment',
    creator: {
      id: '234',
      nickname: '小明',
      avatar: 'https://xxx.jpg',
    },
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    content: '点评内容点评内容点评内容点评内容点评内容',
    rateID: '233',
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
const getCommentList: (req: GetCommentListReq) => Promise<GetCommentListResp> = (
  req,
) =>
  new Promise<GetCommentListResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockComments,
    });
  });

const commentClient = {
  getCommentList,
};

export default commentClient;
