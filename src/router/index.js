import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

const Timetable = () =>
  import(/* webpackChunkName: "timetable" */ '@/views/Timetable/Timetable.vue');
const Rating = () => import(/* webpackChunkName: "rating" */ '@/views/Rating/Rating.vue');
const Notification = () =>
  import(/* webpackChunkName: "notification" */ '@/views/Notification/Notification.vue');
const Me = () => import(/* webpackChunkName: "me" */ '@/views/Me/Me.vue');

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Timetable', component: Timetable },
  { path: '/timetable', name: 'Timetable', component: Timetable },
  { path: '/rating', name: 'Rating', component: Rating },
  { path: '/notification', name: 'Notification', component: Notification },
  { path: '/me', name: 'Me', component: Me },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () =>
      import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/Register.vue'),
  },
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
