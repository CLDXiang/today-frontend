import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config.js';
import log from '../utils/log.js';

export async function getPost(category) {
  return new Promise((resolve, reject) => {
    let authHeader = { Authorization: `Bearer ${store.state.user.jwt_token}` };
    axios
      .get(`${API_URL}/post/${category}`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function createPost(category, title, content) {
  return new Promise((resolve, reject) => {
    let authHeader = { Authorization: `Bearer ${store.state.user.jwt_token}` };
    axios
      .post(`${API_URL}/post/${category}`, { title, content }, { headers: authHeader })
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}
