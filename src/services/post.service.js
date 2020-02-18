import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config.js';
import log from '../utils/log.js';

export async function getDiscussion() {
  return new Promise((resolve, reject) => {
    let authHeader = { Authorization: `Bearer ${store.state.user.jwt_token}` };
    axios
      .get(`${API_URL}/post/discussion`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        resolve(resp);
      })
      .catch((error) => reject(error));
  });
}

export async function createDiscussion(content) {
  return new Promise((resolve, reject) => {
    let authHeader = { Authorization: `Bearer ${store.state.user.jwt_token}` };
    axios
      .post(`${API_URL}/post/discussion`, { content }, { headers: authHeader })
      .then((resp) => {
        log.info(resp);
        resolve(resp);
      })
      .catch((error) => reject(error));
  });
}
