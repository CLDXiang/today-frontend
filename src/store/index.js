import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import log from '../utils/log';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      jwt_token: '',
      name: '',
      email: '',
    },
    editor: {
      draft: {
        content: '',
        title: '',
      },
    },
    app: {
      barTitle: 'Fudan Today',
    },
    detailPageCourse: {},
    detailDialogVisible: false,
  },
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.user.jwt_token = token;
      log.info('set jwt_token', token);
    },
    SET_USER(state, name, email) {
      state.user.name = name;
      state.user.email = email;
    },
    LOGOUT(state) {
      log.info('LOGOUT');
      state.user.jwt_token = '';
      state.user.name = '未登录';
      state.user.email = '';
    },
    showDetailDialog(state, course) {
      state.detailPageCourse = course;
      state.detailDialogVisible = true;
    },
    hideDetailPage(state) {
      state.detailDialogVisible = false;
    },
  },
  getters: {
    userLoggedIn: (state) => state.user.jwt_token !== '',
  },
  plugins: [
    createPersistedState({
      reducer(state) {
        return {
          user: state.user,
          editor: state.editor,
        };
      },
    }),
  ],
});

export default store;
