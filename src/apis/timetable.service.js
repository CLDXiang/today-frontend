import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config';
// import log from '../utils/log';

export const getSelectedCourses = async (semester) => {
  return new Promise((resolve, reject) => {
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
};

export const replaceSelectedCourses = async (semester, selectedCoursesIDs) => {
  return new Promise((resolve, reject) => {
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
};

export const addSelectedCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
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
};

export const removeSelectedCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
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
};
