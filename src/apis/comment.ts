import { CardCommentItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockComments } from './mocks/comment';

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
