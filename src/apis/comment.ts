import { CardCommentItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockComments } from './mocks/comment';

// FIXME: mock
const getCommentList = async (req: {
  /** 用户 id */
  userId: string;
  /** 点评 ID */
  ratingId?: string;
  /** 分页 - 最后一个 comment 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit: number;
}): Promise<{
  data: CardCommentItem[];
}> => {
  log.info('commentClient.getCommentList', req);
  return { data: mockComments };
};

const commentClient = {
  getCommentList,
};

export default commentClient;
