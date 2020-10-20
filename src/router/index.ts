import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Timetable = () => import(/* webpackChunkName: "timetable" */ '@/views/Timetable/Timetable.vue');
const Rating = () => import(/* webpackChunkName: "rating" */ '@/views/Rating/Rating.vue');
const Notification = () => import(/* webpackChunkName: "notification" */ '@/views/Notification/Notification.vue');
const Me = () => import(/* webpackChunkName: "me" */ '@/views/Me/Me.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/timetable' },
  { path: '/timetable', name: 'Timetable', component: Timetable },
  { path: '/rating', name: 'Rating', component: Rating },
  {
    path: '/rating/search',
    name: 'RatingSearch',
    component: () => import(/* webpackChunkName: "rating" */ '@/views/Rating/RatingSearch.vue'),
    props: (route) => ({ q: route.query.q }),
  },
  {
    path: '/rating/lecture/:id',
    name: 'RatingLectureDetail',
    component: () => import(/* webpackChunkName: "rating" */ '@/views/Rating/LectureDetail.vue'),
    props: (route) => ({ lectureId: route.params.id }),
  },
  { path: '/notification', name: 'Notification', component: Notification },
  { path: '/me', name: 'Me', component: Me },
  {
    path: '/me/edit',
    name: 'MeEdit',
    component: () => import(/* webpackChunkName: "me" */ '@/views/Me/MeEdit.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "user-state" */ '@/views/UserStatus/Register.vue'),
  },
  { path: '/*', component: Timetable },
];

/** 堆叠页面路径正则，会显示 BottomNav */
export const HeapPagePathReges = [
  /\/$/,
  /\/timetable$/,
  /\/rating$/,
  /\/notification$/,
  /\/me$/,
  /\/login$/,
  /\/forgot-password$/,
  /\/register$/,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
