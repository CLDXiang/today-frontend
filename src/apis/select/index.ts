import API from '@/utils/axios';
import log from '@/utils/log';
import { CardLessonItem } from '@/components/listCard/types';
import {
  GetSelectsIdOnlyRespDto,
  PutSelectsReqDto,
  PostSelectsReqDto,
  DeleteSelectsReqDto,
  GetSelectsRespDto,
} from './dto';
import { transferLessonItemToCardLessonItem } from './utils';

/** 获取用户所选课程 Id 列表 */
const getSelectedLessonIds = async (
  /** 学期 */
  semester: string,
): Promise<number[]> => {
  log.info('selectClient.getSelectedLessonIds', { semester });
  const { data: { data } } = await API.get<GetSelectsIdOnlyRespDto>('selects', {
    params: {
      semester,
      id_only: 1,
    },
  });
  return data.map((id) => parseInt(id, 10));
};

/** 获取用户所选课程信息列表 */
const getSelectedLessons = async (req: {
  /** 用户 Id，不填使用当前用户 Id */
  userId?: string;
  /** 学期，若不提供则返回全部 */
  semester?: string;
  /** 拉取条数 */
  limit: number;
  /** 分页 - 最后一个 lesson 的 id */
  lastId?: string;
}): Promise<{ data: CardLessonItem[] }> => {
  log.info('selectClient.getSelectedLessons', req);
  const {
    userId, semester, limit, lastId,
  } = req;
  const { data: { data } } = await API.get<GetSelectsRespDto>('selects', {
    params: {
      user_id: userId,
      semester,
      limit,
      last_id: lastId,
    },
  });
  return { data: data.map(transferLessonItemToCardLessonItem) };
};

/** 替换用户所选课程 */
const replaceSelectedLessons = async (
  /** 所选课程 Id 列表 */
  selectedLessonIds: number[],
  /** 学期 */
  semester: string,
): Promise<null> => {
  log.info('selectClient.replaceSelectedLessons', { semester, selectedLessonIds });
  await API.put('selects', {
    id: selectedLessonIds.map((lessonId) => lessonId.toString()),
    semester,
  } as PutSelectsReqDto);
  return null;
};

/** 添加一门选上的课程 */
const addSelectedLesson = async (
  /** 要添加的课程 Id */
  lessonId: number,
  /** 学期 */
  semester: string,
): Promise<null> => {
  log.info('selectClient.addSelectedLesson', { semester, lessonId });
  await API.post('selects', {
    id: lessonId.toString(),
    semester,
  } as PostSelectsReqDto);
  return null;
};

/** 删除一门选上的课程 */
const removeSelectedLesson = async (
  /** 要删除的课程 Id */
  lessonId: number,
  /** 学期 */
  semester: string,
): Promise<null> => {
  log.info('selectClient.removeSelectedCourse', { semester, lessonId });
  await API.delete('selects', {
    data: {
      id: lessonId.toString(),
      semester,
    } as DeleteSelectsReqDto,
  });
  return null;
};

const selectClient = {
  /** 同步用户所选课程 Id 列表 */
  getSelectedLessonIds,
  /** 获取用户所选课程信息列表 */
  getSelectedLessons,
  /** 替换用户所选课程 */
  replaceSelectedLessons,
  /** 添加一门选上的课程 */
  addSelectedLesson,
  /** 删除一门选上的课程 */
  removeSelectedLesson,
};

export default selectClient;
