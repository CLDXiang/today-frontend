import API from '@/utils/axios';
import log from '@/utils/log';
import {
  GetSelectsRespDto, PutSelectsReqDto, PostSelectsReqDto, DeleteSelectsReqDto,
} from './dto';

/** 同步用户所选课程 Id 列表 */
const getSelectedLessonIds = async (
  /** 学期，不填返回所有学期 */
  semester?: string,
): Promise<number[]> => {
  log.info('selectClient.getSelectedLessonIds', { semester });
  const { data: { data } } = await API.get<GetSelectsRespDto>('selects', {
    params: {
      semester,
    },
  });
  return data.map((lessonItem) => parseInt(lessonItem.id, 10));
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
  /** 替换用户所选课程 */
  replaceSelectedLessons,
  /** 添加一门选上的课程 */
  addSelectedLesson,
  /** 删除一门选上的课程 */
  removeSelectedLesson,
};

export default selectClient;
