import log from '@/utils/log';
import API from '@/utils/axios';
import { RateForm } from '@/views/Rating/types';
import {
  PostRateDraftsRespDto,
  PostRateDraftsReqDto,
  GetRateDraftsLectureIdRespDto,
  PatchRateDraftsLectureIdReqDto,
  PatchRateDraftsLectureIdRespDto,
  DeleteRateDraftsLectureIdRespDto,
} from './dto';

/** 保存草稿 */
const saveDraft: (req: {
  /** 课程 Id */
  lectureId: string;
  /** 难易程度 */
  difficulty?: number;
  /** 给分好坏 */
  nice?: number;
  /** 工作量 */
  workload?: number;
  /** 综合推荐指数 */
  recommended?: number;
  /** 评价内容 */
  content?: string;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateDraftClient.saveDraft', req);
    API
      .post<PostRateDraftsRespDto>('rate_drafts', req as PostRateDraftsReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 获取保存的草稿 */
const getDraft: (lectureId: string) => Promise<{
  msg?: string;
  data: RateForm
}> = (lectureId) =>
  new Promise((resolve, reject) => {
    log.info('rateDraftClient.getDraft', { lectureId });
    API
      .get<GetRateDraftsLectureIdRespDto>(`rate_drafts/${lectureId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });

/** 编辑草稿 */
const editDraft: (req: {
  /** 课程 Id */
  lectureId: string;
  /** 难易程度 */
  difficulty?: number;
  /** 给分好坏 */
  nice?: number;
  /** 工作量 */
  workload?: number;
  /** 综合推荐指数 */
  recommended?: number;
  /** 评价内容 */
  content?: string;
}) => Promise<{
  msg?: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    log.info('rateDraftClient.editDraft', req);
    API
      .patch<PatchRateDraftsLectureIdRespDto>(`rate_drafts/${req.lectureId}`, req as PatchRateDraftsLectureIdReqDto)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 清空草稿 */
const deleteDraft: (lectureId: string) => Promise<{
  msg?: string;
}> = (lectureId) =>
  new Promise((resolve, reject) => {
    log.info('rateDraftClient.deleteDraft', { lectureId });
    API
      .delete<DeleteRateDraftsLectureIdRespDto>(`rate_drafts/${lectureId}`)
      .then(() => {
        resolve({});
      })
      .catch((err) => reject(err));
  });

/** 评课草稿 API */
const rateDraftClient = {
  /** 保存评课表单草稿 */
  saveDraft,
  /** 获取保存的草稿 */
  getDraft,
  /** 编辑草稿 */
  editDraft,
  /** 清空草稿 */
  deleteDraft,
};

export default rateDraftClient;
