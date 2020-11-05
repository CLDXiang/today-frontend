import { CardCommentItem } from '@/components/listCard';
import { API_URL } from '@/utils/config';
import log from '@/utils/log';
import axios from 'axios';
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
const getCommentList: (req: {
  /** 用户 id */
  userId?: string;
  /** 点评 ID */
  ratingId?: string;
  /** 分页 - 最后一个 comment 的 id */
  lastId?: string;
  /** 拉取条数 */
  limit?: number;
}) => Promise<{
  data: CardCommentItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('commentClient.getCommentList', req);
    axios
      .get<GetCommentsRespDto>(`${API_URL}/comments`, {
        params: {
          user_id: req.userId || undefined,
          rate_id: req.ratingId || undefined,
          last_id: req.lastId,
          limit: req.limit,
        },
      })
      .then(({ data: { data } }) => {
        const res = data.map(transferCommentItemToCardCommentItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 发表回复 */
const createComment: (req: {
  /** 点评 ID */
  ratingId: string;
  /** 回复内容 */
  content: string;
}) => Promise<{
  data: CardCommentItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('commentClient.createComment', req);
    axios
      .post<PostCommentsRespDto>(`${API_URL}/comments`, {
        content: req.content,
        id: req.ratingId,
      } as PostCommentsReqDto)
      .then(({ data: { data } }) => {
        const res = data.map(transferCommentItemToCardCommentItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 编辑回复 */
const editComment: (req: {
  /** 回复 Id */
  commentId: string;
  /** 点评 ID */
  ratingId: string;
  /** 回复内容 */
  content: string;
}) => Promise<{
  data: CardCommentItem;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('commentClient.editComment', req);
    axios
      .put<PutCommentsIdRespDto>(`${API_URL}/comments/${req.commentId}`, {
        content: req.content,
        id: req.ratingId,
      } as PutCommentsIdReqDto)
      .then(({ data: { data } }) => {
        const res = transferCommentItemToCardCommentItem(data);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

/** 删除回复 */
const deleteComment: (req: {
  /** 回复 Id */
  commentId: string;
}) => Promise<{
  data: CardCommentItem[];
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('commentClient.deleteComment', req);
    axios
      .delete<DeleteCommentsIdRespDto>(`${API_URL}/comments/${req.commentId}`)
      .then(({ data: { data } }) => {
        const res = data.map(transferCommentItemToCardCommentItem);
        resolve({
          data: res,
        });
      })
      .catch((err) => reject(err));
  });

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
