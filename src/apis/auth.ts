import axios from 'axios';
// import log from '@/utils/log';
import { API_URL } from '@/utils/config';
import store from '@/store';

export function login(usernameOrEmail: string, password: string) {
  return new Promise((resolve, reject) => {
    const data = {
      username: usernameOrEmail,
      password,
    };
    // log.info('login payload: ', data);
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((resp) => {
        // log.info('login resp', resp);
        const jwtToken = resp.data.access_token;
        const { email, name } = resp.data;
        if (jwtToken) {
          store.commit('setJwtToken', jwtToken);
          store.commit('setUser', { name, email });
        } else {
          reject(new Error('jwtToken no contained in response'));
        }
        return resolve(resp);
      })
      .catch((error) => reject(error));
  });
}

export function register(name: string, email: string, code: string, password: string) {
  return new Promise((resolve, reject) => {
    const payload = {
      name,
      code: parseInt(code, 10),
      password,
      email,
    };
    // log.info('register payload: ', payload);
    axios
      .post(`${API_URL}/auth/register`, payload)
      .then((resp) => {
        // log.info('register resp', resp);
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });
}

export function requestCode(email: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/register-mail`, { email })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function requestCodeForForgotPassword(email: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/password`, { email })
      .then((resp) => {
        // log.info('forgot password request code resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}

export function modifyPassword(email: string, code: string, password: string) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/auth/password`, { email, code, password })
      .then((resp) => {
        // log.info('modify password resp', resp);
        resolve(resp);
      })
      .catch((err) => reject(err));
  });
}
