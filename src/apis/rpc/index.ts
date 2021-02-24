import { CardLectureItem } from '@/components/listCard';
import API from '@/utils/axios';
import log from '@/utils/log';
import { transferLectureItemToCardLectureItem } from '../lecture/utils';
import { GetSearchRespDto } from './dto';

/** 模糊搜索课程 */
const search = async (req: {
  /** 搜索字串 */
  q: string;
  /** 分页 - 最后一条 ID */
  lastId?: string;
  /** 分页 - 项数 */
  limit: number;
}): Promise<{
  data: CardLectureItem[];
}> => {
  log.info('rpcClient.search', req);
  const { q, lastId, limit } = req;
  const { data: { data } } = await API.get<GetSearchRespDto>('search', {
    params: {
      q,
      last_id: lastId,
      limit,
    },
  });
  return { data: data.map(transferLectureItemToCardLectureItem) };
};

const rpcClient = {
  search,
};

export default rpcClient;
