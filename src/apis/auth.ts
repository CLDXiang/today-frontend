import API from '@/utils/axios';
import store from '@/store';
import log from '@/utils/log';

const login = async (req: {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}): Promise<{
  // eslint-disable-next-line camelcase
  access_token: string;
  email: string;
  name: string;
}> => {
  log.info('authClient.login', req);
  const { data } = await API.post('auth/login', req);
  const { access_token: jwtToken, email, name } = data;
  if (jwtToken) {
    store.commit('setJwtToken', jwtToken);
    store.commit('setUser', { name, email });
  } else {
    throw new Error('jwtToken no contained in response');
  }
  return data;
};

const register = async (req: {
  /** 用户名 */
  name: string;
  /** 验证码 */
  code: number;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email: string;
}): Promise<{
  result: 'success' | 'failed';
}> => {
  log.info('authClient.register', req);
  const { data } = await API.post('auth/register', req);
  return data;
};

const requestCodeRegister = async (req: {
  email: string;
}): Promise<null> => {
  log.info('authClient.requestCodeRegister', req);
  await API.post<null>('auth/register-mail', req);
  return null;
};

const requestCodeForForgotPassword = async (req: {
  email: string;
}): Promise<null> => {
  log.info('authClient.requestCodeForForgotPassword', req);
  await API.post<null>('auth/password', req);
  return null;
};

const modifyPassword = async (req: {
  email: string;
  code: number;
  password: string;
}): Promise<null> => {
  log.info('authClient.modifyPassword', req);
  await API.put<null>('auth/password', req);
  return null;
};

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
