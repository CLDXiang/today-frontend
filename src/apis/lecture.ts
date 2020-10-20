import { CardLectureItem } from '@/components/listCard';
import log from '@/utils/log';
import { mockSelects } from './mocks/lecture';

// FIXME: mock
const getSelectList: (req: {
  /** 用户名 */
  username: string;
  /** 当前学期，没有时返回所有学期 */
  semester?: string;
  /** 分页 - 最后一个 lecture 的 id */
  last_id?: string;
  /** 拉取条数 */
  limit: number;
}) => Promise<{
  msg: string;
  data: CardLectureItem[];
}> = (
  req,
) =>
  new Promise((resolve) => {
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
