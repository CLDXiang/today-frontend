import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/common/Login.vue';
import Register from '../components/common/Register.vue';
import Profile from '../components/profile/Profile.vue';
import UserProfile from '../components/profile/UserProfile.vue';
import Star from '../components/profile/Star.vue';
import UserRate from '../components/profile/UserRate.vue';
import Follower from '../components/profile/Follower.vue';
import Following from '../components/profile/Following.vue';
import History from '../components/profile/History.vue';
import Hole from '../components/secret/Hole.vue';

import Rate from '../components/rate/Rate.vue';
import RateView from '../components/rate/RateView.vue';
import RateSubmitView from '../components/rate/RateSubmitView.vue';

import Reply from '../components/rate/Reply.vue';
import PostView from '../components/secret/PostView.vue';
import Timetable from '../components/timetable/Timetable.vue';

import SearchView from '../components/rate/SearchView.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Timetable', component: Timetable },
  { path: '/select', component: Timetable },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: UserProfile,
      },
      {
        path: 'star',
        name: 'StarCourse',
        component: Star,
      },
      {
        path: 'rate',
        name: 'UserRate',
        component: UserRate,
      },
      {
        path: 'follower',
        name: 'Follower',
        component: Follower,
      },
      {
        path: 'following',
        name: 'Following',
        component: Following,
      },
      {
        path: 'history',
        name: 'History',
        component: History,
      },
    ],
  },
  {
    path: '/rate/:code/:index',
    name: 'Rate',
    component: Rate,
    children: [
      { path: '', component: RateView },
      { path: 'submit', component: RateSubmitView },
    ],
  },
  { path: '/reply', name: 'Reply', component: Reply },
  { path: '/hole', name: 'Hole', component: Hole, meta: { requiresAuth: true } },
  { path: '/post/:id', component: PostView, props: true },
  { path: '/search', name: 'Search', component: SearchView },
  { path: '*', component: Timetable },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.userLoggedIn) {
      next();
    } else {
      // https://router.vuejs.org/guide/essentials/passing-props.html
      next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
