import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

const Login = () => import(/* webpackChunkName: "user-state" */ '../components/common/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "user-state" */ '../components/common/Register.vue');
const ForgotPassword = () =>
  import(/* webpackChunkName: "user-state" */ '../components/common/ForgotPassword.vue');

// TODO: reduce bundle size of profile
const Profile = () => import(/* webpackChunkName: "profile" */ '../components/profile/Profile.vue');
const UserProfile = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/UserProfile.vue');
const OthersProfile = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/OthersProfile.vue');
const Star = () => import(/* webpackChunkName: "profile" */ '../components/profile/Star.vue');
const UserRate = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/UserRate.vue');
const Follower = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/Follower.vue');
const Following = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/Following.vue');
const History = () => import(/* webpackChunkName: "profile" */ '../components/profile/History.vue');
const Notification = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/Notification.vue');
const Settings = () =>
  import(/* webpackChunkName: "profile" */ '../components/profile/Settings.vue');

const Hole = () => import(/* webpackChunkName: "secret" */ '../components/secret/Hole.vue');
const PostView = () => import(/* webpackChunkName: "secret" */ '../components/secret/PostView.vue');

// TODO: reduce bundle size of rate
const ExploreView = () =>
  import(/* webpackChunkName: "rate" */ '../components/rate/ExploreView.vue');
const LectureView = () =>
  import(/* webpackChunkName: "rate" */ '../components/rate/LectureView.vue');
const RateView = () => import(/* webpackChunkName: "rate" */ '../components/rate/RateView.vue');

const Timetable = () =>
  import(/* webpackChunkName: "timetable" */ '../components/timetable/Timetable.vue');

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Timetable', component: Timetable },
  { path: '/select', component: Timetable },
  { path: '/login', name: 'Login', component: Login },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
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
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
      {
        path: 'notice',
        name: 'Notification',
        component: Notification,
      },
    ],
  },

  // rate start
  {
    path: '/explore',
    component: ExploreView,
  },
  {
    path: '/lecture/:code/:idx',
    component: LectureView,
  },
  {
    path: '/lecture/:code/:idx/rate',
    component: RateView,
  },
  // rate end
  { path: '/user/:id', component: OthersProfile, props: true },
  { path: '/hole', name: 'Hole', component: Hole, meta: { requiresAuth: true } },
  { path: '/post/:id', component: PostView, props: true },
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
