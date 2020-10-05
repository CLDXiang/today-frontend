import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '../store';

const getSelectedCourses: (semester: string) => Promise<number[]> = (semester) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/course/select`, {
        params: { semester },
        headers: authHeader,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const replaceSelectedCourses: (semester: string, selectedCoursesIDs: number[]) => Promise<never> = (
  semester,
  selectedCoursesIDs,
) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(
        `${API_URL}/course/select`,
        {
          semester,
          selectedCoursesIDs,
        },
        {
          headers: authHeader,
        },
      )
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

const addSelectedCourse: (courseId: number) => Promise<never> = (courseId) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(
        `${API_URL}/course/${courseId}/select`,
        {},
        {
          headers: authHeader,
        },
      )
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

const removeSelectedCourse: (courseId: number) => Promise<never> = (courseId) =>
  new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .delete(`${API_URL}/course/${courseId}/select`, {
        headers: authHeader,
      })
      .then(() => {
        resolve();
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
