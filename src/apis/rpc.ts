import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';

interface SearchReq {
  /** 搜索字串 */
  q: string;
}

interface SearchResp {
  msg: string;
  data: CardLectureItem[];
}

const mockLectures: CardLectureItem[] = [
  {
    id: '0',
    name: '创意设计前沿',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '1',
    name: '操作系统',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '2',
    name: '编译原理',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '3',
    name: '计算机体系结构',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
];

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
