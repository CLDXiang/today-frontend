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
    isDetailPageCourseDeleted: false,
    isDetailDialogVisible: false,

    isGlobalMessageVisible: false,
    globalMessageColor: 'info',
    globalMessageTimeout: 2500,
    globalMessageText: '',
    globalMessageTimer: -1,
    // globalMessageIcon: '',
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
    showDetailDialog(state) {
      state.isDetailDialogVisible = true;
    },
    hideDetailDialog(state) {
      state.isDetailDialogVisible = false;
    },
    changeDetailPageContent(state, course) {
      state.detailPageCourse = course;
      state.isDetailPageCourseDeleted = false;
    },
    onDeleteDetailPageCourse(state) {
      state.isDetailPageCourseDeleted = true;
    },
    onRestoreDetailPageCourse(state) {
      state.isDetailPageCourseDeleted = false;
    },

    sendGlobalMessage(state, action) {
      state.globalMessageText = action.text || '';
      state.globalMessageColor = action.color || 'info';
      // 0 表示不自动关闭
      state.globalMessageTimeout = action.timeout || 2500;
      state.isGlobalMessageVisible = true;
      state.globalMessageTimer += 1;
    },
    hideGlobalMessage(state) {
      state.isGlobalMessageVisible = false;
    },
    clearGlobalMessageTimer(state) {
      state.globalMessageTimer = -1;
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
