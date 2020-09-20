import axios from 'axios';
import log from '../utils/log';
import $store from '../store';

import { API_URL } from '../utils/config';

/**
 ******************************
 * @methods
 ******************************
 */

export function isAccessTokenExpired() {
  const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 1;
  const nowTime = Math.floor(new Date().getTime() / 1000);

  return accessTokenExpDate <= nowTime;
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function getAccessToken() {
  return $store.state.user.token;
  // return localStorage.getItem('accessToken');
}

/**
 ******************************
 * @API
 ******************************
 */

export function login(usernameOrEmail, password) {
  return new Promise((resolve, reject) => {
    const data = {
      username: usernameOrEmail,
      password,
    };
    log.info('login payload: ', data);
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((resp) => {
        log.info('login resp', resp);
        const jwtToken = resp.data.access_token;
        const { email, name } = resp.data;
        if (jwtToken) {
          $store.commit('SET_JWT_TOKEN', jwtToken);
          $store.commit('SET_USER', name, email);
        } else {
          reject(new Error('jwtToken no contained in response'));
        }
        return resolve(resp);
      })
      .catch((error) => reject(error));
  });
}

export function register(name, email, code, password) {
  return new Promise((resolve, reject) => {
    const payload = {
      name,
      code: parseInt(code, 10),
      password,
      email,
    };
    log.info('register payload: ', payload);
    axios
      .post(`${API_URL}/auth/register`, payload)
      .then((resp) => {
        log.info('register resp', resp);
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });
}

export function requestCode(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/register-mail`, { email })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function requestCodeForForgotPassword(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/password`, { email })
      .then((resp) => {
        log.info('forgot password request code resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function modifyPassword(email, code, password) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/auth/password`, { email, code, password })
      .then((resp) => {
        log.info('modify password resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}
