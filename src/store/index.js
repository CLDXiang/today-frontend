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
    secret: {
      posts: [],
      postsMapping: [],
    },
    isDetailPageCourseDeleted: false,
    isDetailDialogVisible: false,
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
    updateSecretPosts(state, posts) {
      const postsMapping = {};
      for (let i = 0; i < posts.length; i += 1) {
        postsMapping[posts[i].id] = posts[i];
      }
      state.secret.posts = posts;
      state.secret.postsMapping = postsMapping;
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
          secret: state.secret,
        };
      },
    }),
  ],
});

export default store;
