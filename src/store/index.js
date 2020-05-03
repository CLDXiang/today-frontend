import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import log from '../utils/log';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      jwt_token: '',
      id: '',
      name: '',
      email: '',
    },
    profile: {
      countStar: '',
      countUserRate: '',
      countFollower: '',
      countFollowing: '',
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

    isGlobalMessageVisible: false,
    globalMessageColor: 'info',
    globalMessageTimeout: 2500,
    globalMessageText: '',
    globalMessageTimer: -1,
    // globalMessageIcon: '',

    selectedCoursesIds: {},
    // 仅缓存用户打开 Timetable 会加载的第一个页面的内容
    selectedCoursesByDay: [{}, {}, {}, {}, {}, {}, {}],
  },
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.user.jwt_token = token;
      const payload = decodeURIComponent(escape(window.atob(token.split('.')[1])));
      state.user.id = JSON.parse(payload).sub;
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

    setSelectedCourses(state, payload) {
      state.selectedCoursesByDay = payload.selectedCoursesByDay;
      state.selectedCoursesIds[payload.semester] = [...payload.selectedCoursesIds];
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
          selectedCoursesIds: state.selectedCoursesIds,
          selectedCoursesByDay: state.selectedCoursesByDay,
        };
      },
    }),
  ],
});

export default store;
