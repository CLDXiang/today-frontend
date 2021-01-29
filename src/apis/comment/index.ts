import { CardCommentItem } from '@/components/listCard';
import API from '@/utils/axios';
import log from '@/utils/log';
import {
  PutCommentsIdReqDto,
  GetCommentsRespDto,
  PostCommentsReqDto,
  PostCommentsRespDto,
  PutCommentsIdRespDto,
  DeleteCommentsIdRespDto,
} from './dto';
import { transferCommentItemToCardCommentItem } from './utils';

/** 获取回复列表 */
const getCommentList = async (req: {
  /** 用户 id */
  userId?: string;
  /** 点评 ID */
  ratingId?: string;
  /** 分页 - 最后一个 comment 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit?: number;
}): Promise<{
  data: CardCommentItem[];
}> => {
  log.info('commentClient.getCommentList', req);
  const { data: { data } } = await API.get<GetCommentsRespDto>('comments', {
    params: {
      user_id: req.userId,
      rate_id: req.ratingId,
      last_id: req.lastId,
      limit: req.limit,
    },
  });
  return { data: data.map(transferCommentItemToCardCommentItem) };
};

/** 发表回复 */
const createComment = async (req: {
  /** 点评 ID */
  ratingId: string;
  /** 回复内容 */
  content: string;
}): Promise<{
  data: CardCommentItem[];
}> => {
  log.info('commentClient.createComment', req);
  const { data: { data } } = await API.post<PostCommentsRespDto>('comments', {
    content: req.content,
    id: req.ratingId,
  } as PostCommentsReqDto);
  return { data: data.map(transferCommentItemToCardCommentItem) };
};

/** 编辑回复 */
const editComment = async (req: {
  /** 回复 Id */
  commentId: string;
  /** 点评 ID */
  ratingId: string;
  /** 回复内容 */
  content: string;
}): Promise<{
  data: CardCommentItem;
}> => {
  log.info('commentClient.editComment', req);
  const { data: { data } } = await API.put<PutCommentsIdRespDto>(`comments/${req.commentId}`, {
    content: req.content,
    id: req.ratingId,
  } as PutCommentsIdReqDto);
  return { data: transferCommentItemToCardCommentItem(data) };
};

/** 删除回复 */
const deleteComment = async (req: {
  /** 回复 Id */
  commentId: string;
}): Promise<{
  data: CardCommentItem[];
}> => {
  log.info('commentClient.deleteComment', req);
  const { data: { data } } = await API.delete<DeleteCommentsIdRespDto>(`comments/${req.commentId}`);
  return { data: data.map(transferCommentItemToCardCommentItem) };
};

const commentClient = {
  /** 获取回复列表 */
  getCommentList,
  /** 发表回复 */
  createComment,
  /** 编辑回复 */
  editComment,
  /** 删除回复 */
  deleteComment,
};

export default commentClient;
