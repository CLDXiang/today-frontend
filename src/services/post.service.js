import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config';
import log from '../utils/log';

async function authorizedGet(endpoint) {
  const authHeader = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((res, rej) => {
    axios
      .get(`${API_URL}${endpoint}`, { headers: authHeader })
      .then((resp) => {
        res(resp.data);
      })
      .catch((err) => rej(err));
  });
}

async function authorizedPost(endpoint, payload) {
  const authHeader = {
    Authorization: `Bearer ${store.state.user.jwt_token}`,
  };
  return new Promise((res, rej) => {
    axios
      .post(`${API_URL}${endpoint}`, payload, { headers: authHeader })
      .then((resp) => {
        res(resp.data);
      })
      .catch((err) => rej(err));
  });
}

export async function getSecretEarlier(offsetId) {
  // const posts = [];
  // for (let i = 0; i < 10; i += 1) {
  //   const id = offsetId - 1 - i;
  //   if (id < -1000) {
  //     break;
  //   }
  //   posts.push({ id, content: `auto ${id}`, user_id: 1 });
  // }
  // return posts;
  return authorizedGet(`/secret/${offsetId}/earlier`);
}

export async function getSecretLater(offsetId) {
  return authorizedGet(`/secret/${offsetId}/later`);
}

// getSecret gets the recent secret posts
export async function getSecret() {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/secret`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function getSecretById(id) {
  log.info('getSecretById', id);
  return new Promise((res, rej) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/secret/${id}`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        res(resp.data);
      })
      .catch((error) => rej(error));
  });
}

export async function getSecretReply(id) {
  log.info('getSecretReply', id);
  return new Promise((res, rej) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .get(`${API_URL}/secret/${id}/reply`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
        res(resp.data);
      })
      .catch((error) => rej(error));
  });
}

export async function createSecret(title, content) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/secret`, { title, content }, { headers: authHeader })
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}

export async function createSecretReply(postId, content) {
  return new Promise((resolve, reject) => {
    const authHeader = {
      Authorization: `Bearer ${store.state.user.jwt_token}`,
    };
    axios
      .post(`${API_URL}/secret/${postId}/reply`, { content }, { headers: authHeader })
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}
