import axios from 'axios';
import { API_URL } from '@/utils/config';
import store from '@/store';

const login: (req: {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}) => Promise<{
  // eslint-disable-next-line camelcase
  access_token: string;
  email: string;
  name: string;
}> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/login`, req)
      .then((resp) => {
        const { access_token: jwtToken, email, name } = resp.data;
        if (jwtToken) {
          store.commit('setJwtToken', jwtToken);
          store.commit('setUser', { name, email });
        } else {
          reject(new Error('jwtToken no contained in response'));
        }
        return resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const register: (req: {
  /** 用户名 */
  name: string;
  /** 验证码 */
  code: number;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email: string;
}) => Promise<{
  result: 'success' | 'failed';
}> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/register`, req)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const requestCodeRegister: (req: {
  email: string;
}) => Promise<never> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/register-mail`, req)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

const requestCodeForForgotPassword: (req: {
  email: string;
}) => Promise<never> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/password`, req)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

const modifyPassword: (req: {
  email: string;
  code: number;
  password: string;
}) => Promise<never> = (req) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/auth/password`, req)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });

const authClient = {
  /** 登录 */
  login,
  /** 注册 */
  register,
  /** 获取验证码（注册） */
  requestCodeRegister,
  /** 获取验证码（忘记密码） */
  requestCodeForForgotPassword,
  /** 修改密码 */
  modifyPassword,
};

export default authClient;
