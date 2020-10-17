import { CardRatingItem } from '@/components/listCard';
import log from '@/utils/log';
import dayjs from 'dayjs';

interface GetRatingListReq {
  /** 用户名 */
  username: string;
  /** 分页 - 最后一个 rating 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetRatingListResp {
  msg: string;
  data: CardRatingItem[];
}

const mockRatings: CardRatingItem[] = [
  {
    id: '233',
    type: 'rating',
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
    type: 'rating',
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
const getRatingList: (req: GetRatingListReq) => Promise<GetRatingListResp> = (
  req,
) =>
  new Promise<GetRatingListResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockRatings,
    });
  });

const ratingClient = {
  getRatingList,
};

export default ratingClient;
