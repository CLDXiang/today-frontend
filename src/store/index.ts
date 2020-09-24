import { createStore } from 'vuex';

export default createStore({
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
      notifications: [],
      trends: [],
      userStar: [],
      userRate: [],
      follower: [],
      following: [],
      history: [],
    },
    detailPageCourse: {},
    secret: {
      posts: [],
      postsMapping: [],
    },
    lectures: [],
    /** 是否自动云同步过 */
    hasFetchedSelectedCourses: false,
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
    selectedSectionsByDay: [{}, {}, {}, {}, {}, {}, {}],
    hoveredCourseId: -1,
  },
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.user.jwt_token = token;
      const payload = decodeURIComponent(escape(window.atob(token.split('.')[1])));
      state.user.id = JSON.parse(payload).sub;
      // log.info('set jwt_token', token);
    },
    SET_USER(state, name, email) {
      state.user.name = name;
      state.user.email = email;
    },
    LOGOUT(state) {
      // log.info('LOGOUT');
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
    SET_HISTORY(state, history) {
      state.profile.history = history;
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
      // -1 表示不自动关闭
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
      state.selectedSectionsByDay = payload.selectedSectionsByDay;
      state.selectedCoursesIds[payload.semester] = [...payload.selectedCoursesIds];
    },
    setHoveredCourseId(state, courseId) {
      state.hoveredCourseId = courseId;
    },
    resetHoveredCourseId(state) {
      state.hoveredCourseId = -1;
    },
    setHasFetchedSelectedCourses(state) {
      state.hasFetchedSelectedCourses = true;
    },
  },
  getters: {
    userLoggedIn: (state) => state.user.jwt_token !== '',
    countNotification: (state) => Object.keys(state.profile.notifications).length,
    countTrend: (state) => Object.keys(state.profile.trends).length,
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
  // FIXME: localStorage
  // plugins: [
  //   createPersistedState({
  //     reducer(state) {
  //       return {
  //         user: state.user,
  //         profile: state.profile,
  //         editor: state.editor,
  //         secret: state.secret,
  //         selectedCoursesIds: state.selectedCoursesIds,
  //         selectedSectionsByDay: state.selectedSectionsByDay,
  //       };
  //     },
  //   }),
  // ],
});
