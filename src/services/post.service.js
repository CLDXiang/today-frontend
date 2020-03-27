import axios from 'axios';
import store from '../store';
import { API_URL } from '../utils/config';
import log from '../utils/log';

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
      .post(
        `${API_URL}/secret/${postId}/reply`,
        { content },
        { headers: authHeader },
      )
      .then((resp) => {
        log.info(resp);
        resolve(resp.data);
      })
      .catch((error) => reject(error));
  });
}
