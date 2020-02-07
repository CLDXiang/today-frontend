import axios from 'axios';
import Http from './http.init';
import { ResponseWrapper, ErrorWrapper } from './util';
import log from '../utils/log.js';
import $store from '../store';
import $router from '../router';

import { API_URL } from '../.env';

/**
 ******************************
 * @API
 ******************************
 */

export function login(username, password) {
  return new Promise((resolve, reject) => {
    const data = {
      username: username,
      password,
    };
    log.info('login payload: ', data);
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((response) => {
        log.info('login response', response);
        let jwt_token = response.data.access_token;
        let email = response.data.email;
        if (jwt_token) {
          $store.commit('SET_JWT_TOKEN', jwt_token);
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

export function tryHello() {
  return new Promise((resolve, reject) => {
    let authHeader = { Authorization: `Bearer ${$store.state.user.jwt_token}` };
    log.info({ authHeader });
    axios
      .get(`${API_URL}`, {
        headers: authHeader,
      })
      .then((resp) => {
        log.info(resp);
      })
      .catch((error) => reject(error));
  });
}

export function makeLogout() {
  return new Promise((resolve, reject) => {
    new Http({ auth: true })
      .post(`auth/signout`)
      .then((response) => {
        _resetAuthData();
        $router.push({ name: 'index' });
        return resolve(new ResponseWrapper(response, response.data));
      })
      .catch((error) => reject(new ErrorWrapper(error)));
  });
}

export function refreshTokens() {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/refresh-tokens`, {
        refreshToken: getRefreshToken(),
      })
      .then((response) => {
        _setAuthData(response);
        return resolve(new ResponseWrapper(response, response.data));
      })
      .catch((error) => {
        if (error.response.data.badRefreshToken) {
          log.info('http.init.js >> badRefreshToken: true');
          _resetAuthData();
          $router.push({ name: 'index' });
          return reject(new ErrorWrapper(error));
        }
        if (error.response.data.refreshTokenExpiredError) {
          log.info('http.init.js >> refreshTokenExpiredError');
          _resetAuthData();
          $router.push({ name: 'index' });
          return reject(new ErrorWrapper(error));
        }
      });
  });
}

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

function _resetAuthData() {
  // reset userData in store
  $store.commit('user/SET_CURRENT_USER', {});
  $store.commit('auth/SET_ATOKEN_EXP_DATE', null);
  // reset tokens in localStorage
  localStorage.setItem('refreshToken', '');
  localStorage.setItem('accessToken', '');
}

function _setAuthData(response) {
  // localStorage.setItem('refreshToken', response.data.refreshToken);
  // localStorage.setItem('accessToken', response.data.accessToken);
  // $store.commit('auth/SET_ATOKEN_EXP_DATE', response.data.expires_in);
  $store.commit('SET_JWT', response.data.access_token);
}
