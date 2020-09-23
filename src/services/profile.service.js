import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config';
// import log from '../utils/log';

export async function getUserProfile(userId = store.state.user.id) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/user/profile`, {
        params: { userId },
        headers: authHeader,
      })
      .then((resp) => {
        // log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function editProfile(UpdateUserDto) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/user/profile`, UpdateUserDto, { headers: authHeader })
      .then((resp) => {
        // log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function uploadAvatar(userAvatar) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/user/profile/avatar`, userAvatar, { headers: authHeader })
      .then((resp) => {
        // log.info(resp);
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
        // log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}
