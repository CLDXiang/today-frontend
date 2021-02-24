import axios from 'axios';
import { message } from 'ant-design-vue';
import store from '@/store';
import router from '@/router';
import logger from './log';

/** 后端 API 接口 */
const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// axios 拦截器
API.interceptors.request.use((req) => {
  // 设置请求头 JWT
  const newReq = { ...req };
  if (store.state.user.jwtToken) {
    newReq.headers.Authorization = `Bearer ${store.state.user.jwtToken}`;
  }
  return newReq;
}, (err) => Promise.reject(err));

API.interceptors.response.use((resp) => resp, (err) => {
  if (err.response.status === 401 && store.getters.userLoggedIn) {
    // 处理登录态失效
    message.error('登录已失效，请重新登录');
    store.commit('logout');
    router.push('/login');
  } else if (err.response.status === 401 && router.currentRoute.value.name !== 'Login') {
    // 处理其他未登录导致的问题
    message.error('需要登录才能看到这里噢！');
    store.commit('logout');
    router.push('/login');
  } else if (err.response.status >= 400 && err.response.status < 500) {
    // 后端错误消息
    if (err.response?.data?.message || err.response?.data?.msg) {
      logger.error(err.response?.data);
      message.error(err.response?.data?.message || err.response?.data?.msg);
    }
  }
  return Promise.reject(err);
});

export default API;
