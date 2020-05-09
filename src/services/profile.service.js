import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import store from '../store';
import { API_URL } from '../utils/config';
import log from '../utils/log';
import rawLectures from '../assets/lectures.json';

dayjs.extend(relativeTime);

export function renderTime(time) {
  const formatted = dayjs(time)
    .locale('zh-cn')
    .fromNow();
  return formatted;
}

// Preprocess raw data exported from backend
const lectures = rawLectures
  .map((d) => {
    return {
      id: d.id,
      name: d.name,
      code: d.code,
      credit: d.credit,
      teacher: d.taught_by.replace(/@@/g, ', ').trim(), // 替换多位老师授课的'@@'
      idx: d.lecture_index,
    };
  })
  // drop empty teacher
  .filter((d) => {
    return d.teacher.length > 0;
  });

const id2lecture = {};
lectures.forEach((data) => {
  id2lecture[`${data.id}`] = data;
});

export { lectures };

export function getLectureById(id) {
  return id2lecture[`${id}`];
}

export async function getUserStar(userId = store.state.user.id) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/${userId}/star`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        const userStar = resp.data;
        store.commit('SET_USER_STAR', userStar);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function getUserRate(userId = store.state.user.id) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/rates/${userId}`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        const userRate = resp.data;
        store.commit('SET_USER_RATE', userRate);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function getFollower(userId = store.state.user.id) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/${userId}/follower`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        const follower = resp.data;
        store.commit('SET_FOLLOWER', follower);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function getFollowing(userId = store.state.user.id) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/${userId}/following`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        const following = resp.data;
        store.commit('SET_FOLLOWING', following);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function getHistory() {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/history/lecture`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        const history = resp.data;
        store.commit('SET_HISTORY', history);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}
