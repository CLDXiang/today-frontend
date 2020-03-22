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

export function login(username, password) {
  return new Promise((resolve, reject) => {
    const data = {
      username,
      password,
    };
    log.info('login payload: ', data);
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((response) => {
        log.info('login response', response);
        const jwtToken = response.data.access_token;
        const { email } = response.data;
        if (jwtToken) {
          $store.commit('SET_JWT_TOKEN', jwtToken);
          $store.commit('SET_USER', username, email);
          response.sucess = true;
        } else {
          response.sucess = false;
        }
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
}

export function register(name, email, password) {
  return new Promise((resolve, reject) => {
    const payload = {
      name,
      email,
      password,
    };
    log.info('register payload: ', payload);
    axios
      .post(`${API_URL}/auth/register`, payload)
      .then((resp) => {
        log.info('register response', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}
