import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '../store';
// import log from '@/utils/log';

export const getSelectedCourses = async (semester) => new Promise((resolve, reject) => {
  const authHeader = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  axios
    .get(`${API_URL}/course/select`, {
      params: { semester },
      headers: authHeader,
    })
    .then((resp) => {
      // log.info(resp);
      resolve(resp.data);
    })
    .catch((err) => reject(err));
});

export const replaceSelectedCourses = async (semester, selectedCoursesIDs) => new Promise((resolve, reject) => {
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
    .then((resp) => {
      // log.info(resp);
      resolve(resp.data);
    })
    .catch((err) => reject(err));
});

export const addSelectedCourse = async (courseId) => new Promise((resolve, reject) => {
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
    .then((resp) => {
      // log.info(resp);
      resolve(resp.data);
    })
    .catch((err) => reject(err));
});

export const removeSelectedCourse = async (courseId) => new Promise((resolve, reject) => {
  const authHeader = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  axios
    .delete(`${API_URL}/course/${courseId}/select`, {
      headers: authHeader,
    })
    .then((resp) => {
      // log.info(resp);
      resolve(resp.data);
    })
    .catch((err) => reject(err));
});
