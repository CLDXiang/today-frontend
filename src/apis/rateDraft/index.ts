import log from '@/utils/log';
import API from '@/utils/axios';
import { RateForm } from '@/views/Rating/types';
import {
  PostRateDraftsReqDto,
  GetRateDraftsLectureIdRespDto,
  PatchRateDraftsLectureIdReqDto,
} from './dto';

/** 保存草稿 */
const saveDraft = async (req: {
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
}): Promise<null> => {
  log.info('rateDraftClient.saveDraft', req);
  await API.post<null>('rate_drafts', req as PostRateDraftsReqDto);
  return null;
};

/** 获取保存的草稿 */
const getDraft = async (lectureId: string): Promise<{
  data: RateForm
}> => {
  log.info('rateDraftClient.getDraft', { lectureId });
  const { data } = await API.get<GetRateDraftsLectureIdRespDto>(`rate_drafts/${lectureId}`);
  return data;
};

/** 编辑草稿 */
const editDraft = async (req: {
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
}): Promise<null> => {
  log.info('rateDraftClient.editDraft', req);
  await API.patch<null>(`rate_drafts/${req.lectureId}`, req as PatchRateDraftsLectureIdReqDto);
  return null;
};

/** 清空草稿 */
const deleteDraft = async (lectureId: string): Promise<null> => {
  log.info('rateDraftClient.deleteDraft', { lectureId });
  await API.delete<null>(`rate_drafts/${lectureId}`);
  return null;
};

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
