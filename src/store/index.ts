import { createStore } from 'vuex';
import { localStorage, sessionStorage } from '@/utils/storage';
import { Sections } from '@/views/Timetable/types';

import { BreakpointType } from './types';

/** 需要持久化保存的 state */
const persistedState = {
  localStorage: ['user', 'profile', 'selectedCoursesIds', 'selectedSectionsByDay'],
  sessionStorage: [],
};

const store = createStore({
  state: {
    breakpoint: 'xs' as BreakpointType,
    /** 视窗大小，即 window.innerHeight */
    innerHeight: 667,
    user: {
      // eslint-disable-next-line camelcase
      jwt_token: '',
      id: '',
      email: '',
      name: '',
      nickname: '',
      avatar: '',
      bio: '',
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

    selectedCoursesIds: {} as { [key: string]: number[] },
    // 仅缓存用户打开 Timetable 会加载的第一个页面的内容
    selectedSectionsByDay: [{}, {}, {}, {}, {}, {}, {}] as Sections[],
    hoveredCourseId: -1,

    // storage 中保存的 state
    ...localStorage.getVuexStates(),
    ...sessionStorage.getVuexStates(),
  },
  mutations: {
    setJwtToken(state, token) {
      // eslint-disable-next-line camelcase
      state.user.jwt_token = token;
      const payload = decodeURIComponent(escape(window.atob(token.split('.')[1])));
      state.user.id = JSON.parse(payload).sub.toString();
      // log.info('set jwt_token', token);
    },
    setUser(state, payload: { name: string; email: string }) {
      state.user.name = payload.name;
      state.user.email = payload.email;
    },
    logout(state) {
      // log.info('logout');
      // eslint-disable-next-line camelcase
      state.user.jwt_token = '';
      state.user.name = '未登录';
      state.user.email = '';
      state.hasFetchedSelectedCourses = false;
    },
    setUserProfile(state, profile) {
      state.user.avatar = profile.avatar;
      state.user.bio = profile.bio;
      state.user.nickname = profile.nickname;
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

    setSelectedCourses(
      state,
      payload: {
        semester: string;
        selectedCoursesIds: number[];
        selectedSectionsByDay: Sections[];
      },
    ) {
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
    /** 设置断点 */
    setBreakpoint(state, newBreakpoint: BreakpointType) {
      state.breakpoint = newBreakpoint;
    },
    /** 设置 innerHeight */
    setInnerHeight(state, newInnerHeight: number) {
      state.innerHeight = newInnerHeight;
    },
  },
  getters: {
    userLoggedIn: (state) => state.user.jwt_token !== '',
  },
});

// 监听需要持久化保存的 state，在变化时存入 storage
persistedState.localStorage.forEach((stateKey) => {
  store.watch(
    (state) => state[stateKey],
    (newValue) => {
      localStorage.setVuexState(stateKey, newValue);
    },
    {
      deep: true,
    },
  );
});
persistedState.sessionStorage.forEach((stateKey) => {
  store.watch(
    (state) => state[stateKey],
    (newValue) => {
      localStorage.setVuexState(stateKey, newValue);
    },
    {
      deep: true,
    },
  );
});

export default store;
