import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';

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

const mockLectures: CardLectureItem[] = [
  {
    id: '0',
    type: 'lecture',
    name: '创意设计前沿',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '1',
    type: 'lecture',
    name: '操作系统',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '2',
    type: 'lecture',
    name: '编译原理',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '3',
    type: 'lecture',
    name: '计算机体系结构',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '4',
    type: 'lecture',
    name: '创意设计前沿',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '5',
    type: 'lecture',
    name: '操作系统',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '6',
    type: 'lecture',
    name: '编译原理',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '7',
    type: 'lecture',
    name: '计算机体系结构',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '8',
    type: 'lecture',
    name: '创意设计前沿',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '9',
    type: 'lecture',
    name: '操作系统',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '10',
    type: 'lecture',
    name: '编译原理',
    teachers: ['教师0', '教师1'],
    score: 4.4,
    reactionCount: 123,
    ratingCount: 22,
    likeCount: 1,
  },
  {
    id: '11',
    type: 'lecture',
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
