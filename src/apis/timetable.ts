import API from '@/utils/axios';
import log from '@/utils/log';

const getSelectedCourses = async (semester: string): Promise<number[]> => {
  log.info('timetableClient.getSelectedCourses', { semester });
  const { data } = await API.get('course/select', {
    params: { semester },
  });
  return data;
};

const replaceSelectedCourses = async (
  semester: string,
  selectedCoursesIDs: number[],
): Promise<null> => {
  log.info('timetableClient.replaceSelectedCourses', { semester, selectedCoursesIDs });
  await API.post('course/select', {
    semester,
    selectedCoursesIDs,
  });
  return null;
};

const addSelectedCourse = async (courseId: number): Promise<null> => {
  log.info('timetableClient.addSelectedCourse', { courseId });
  await API.post(`course/${courseId}/select`);
  return null;
};

const removeSelectedCourse = async (courseId: number): Promise<null> => {
  log.info('timetableClient.removeSelectedCourse', { courseId });
  await API.delete(`course/${courseId}/select`);
  return null;
};

const timetableClient = {
  /** 获取云端已选课程列表 */
  getSelectedCourses,
  /** 替换云端已选课程列表 */
  replaceSelectedCourses,
  /** 增加已选课程 */
  addSelectedCourse,
  /** 删除已选课程 */
  removeSelectedCourse,
};

export default timetableClient;
