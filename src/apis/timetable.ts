import API from '@/utils/axios';

const getSelectedCourses: (semester: string) => Promise<number[]> = (semester) =>
  new Promise((resolve, reject) => {
    API
      .get('course/select', {
        params: { semester },
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const replaceSelectedCourses: (semester: string, selectedCoursesIDs: number[]) => Promise<null> = (
  semester,
  selectedCoursesIDs,
) =>
  new Promise((resolve, reject) => {
    API
      .post(
        'course/select',
        {
          semester,
          selectedCoursesIDs,
        },
      )
      .then(() => {
        resolve(null);
      })
      .catch((err) => reject(err));
  });

const addSelectedCourse: (courseId: number) => Promise<null> = (courseId) =>
  new Promise((resolve, reject) => {
    API
      .post(
        `course/${courseId}/select`,
        {},
      )
      .then(() => {
        resolve(null);
      })
      .catch((err) => reject(err));
  });

const removeSelectedCourse: (courseId: number) => Promise<null> = (courseId) =>
  new Promise((resolve, reject) => {
    API
      .delete(`course/${courseId}/select`)
      .then(() => {
        resolve(null);
      })
      .catch((err) => reject(err));
  });

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
