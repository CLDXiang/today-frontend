import store from '../store/index';

const info = (text, duration = 2500) => {
  store.commit('sendGlobalMessage', { text, color: 'info', timeout: duration });
};

const success = (text, duration = 2500) => {
  store.commit('sendGlobalMessage', { text, color: 'success', timeout: duration });
};

const warning = (text, duration = 2500) => {
  store.commit('sendGlobalMessage', { text, color: 'orange', timeout: duration });
};

// alias of warning
const warn = (text, duration = 2500) => {
  store.commit('sendGlobalMessage', { text, color: 'orange', timeout: duration });
};

const error = (text, duration = 2500) => {
  store.commit('sendGlobalMessage', { text, color: 'error', timeout: duration });
};

const loading = (text, duration = 0) => {
  store.commit('sendGlobalMessage', { text, color: '#fff', timeout: duration });
};

const loaded = () => {
  store.commit('hideGlobalMessage');
};

const message = {
  info,
  success,
  warning,
  warn,
  error,
  loading,
  loaded,
};

export default message;
