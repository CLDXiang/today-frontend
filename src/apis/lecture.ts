import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';

interface GetSelectListReq {
  /** 用户名 */
  username: string;
  /** 当前学期，没有时返回所有学期 */
  semester?: string;
  /** 分页 - 最后一个 lecture 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}

interface GetSelectListResp {
  msg: string;
  data: CardLectureItem[];
}

const mockSelects: CardLectureItem[] = [
  {
    id: 'COMP233333.3',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 85,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
  {
    id: 'COMP233333.4',
    name: '思修',
    teachers: ['老师1', '老师2'],
    score: 85,
    reactionCount: 5,
    ratingCount: 100,
    likeCount: 20,
  },
];

// FIXME: mock
const getSelectList: (req: GetSelectListReq) => Promise<GetSelectListResp> = (
  req,
) =>
  new Promise<GetSelectListResp>((resolve) => {
    log.info('rpcClient.search', req);
    resolve({
      msg: 'ok',
      data: mockSelects,
    });
  });

const lectureClient = {
  getSelectList,
};

export default lectureClient;
