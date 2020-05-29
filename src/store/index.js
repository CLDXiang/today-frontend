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
      bio: '',
      avatar: '',
      nickName: '',
      email: '',
    },
    profile: {
      userStar: [],
      userRate: [],
      follower: [],
      following: [],
      history: [],
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
    lectures: [],
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
    SET_USER_PROFILE(state, profile) {
      state.user.avatar = profile.avatar;
      state.user.bio = profile.bio;
      state.user.nickName = profile.nickName;
    },
    SET_BAR_TITLE(state, barTitle) {
      state.app.barTitle = barTitle;
    },
    SET_USER_STAR(state, userStar) {
      state.profile.userStar = userStar;
    },
    SET_USER_RATE(state, userRate) {
      state.profile.userRate = userRate;
    },
    SET_FOLLOWING(state, following) {
      state.profile.following = following;
    },
    SET_FOLLOWER(state, follower) {
      state.profile.follower = follower;
    },
    SET_HISTORY(state, history) {
      state.profile.history = history;
    },
    SET_LECTURES(state, lectures) {
      state.lectures = lectures;
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
    countUserStar: (state) => Object.keys(state.profile.userStar).length,
    countUserRate: (state) => Object.keys(state.profile.userRate).length,
    countFollower: (state) => Object.keys(state.profile.follower).length,
    countFollowing: (state) => Object.keys(state.profile.following).length,
    countHistory: (state) => Object.keys(state.profile.history).length,
    code2lecture: (state) => {
      const code2lecture = {};
      state.lectures.forEach((data) => {
        code2lecture[`${data.code}.${data.idx}`] = data;
      });
      return code2lecture;
    },
    id2lecture: (state) => {
      const id2lecture = {};
      state.lectures.forEach((data) => {
        id2lecture[`${data.id}`] = data;
      });
      return id2lecture;
    },
  },
  plugins: [
    createPersistedState({
      reducer(state) {
        return {
          user: state.user,
          profile: state.profile,
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
