import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Timetable = () => import(/* webpackChunkName: "timetable" */ '@/views/Timetable/Timetable.vue');
const Rating = () => import(/* webpackChunkName: "rating" */ '@/views/Rating/Rating.vue');
const Notification = () => import(/* webpackChunkName: "notification" */ '@/views/Notification/Notification.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About/About.vue');
const User = () => import(/* webpackChunkName: "user" */ '@/views/User/User.vue');

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
  {
    path: '/rating/lecture/:lid/edit-rating',
    name: 'RatingForm',
    component: () => import(/* webpackChunkName: "rating" */ '@/views/Rating/RatingForm.vue'),
    props: (route) => ({ lectureId: route.params.lid }),
  },
  { path: '/notification', name: 'Notification', component: Notification },
  { path: '/user', name: 'Me', component: User },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: (route) => ({ userId: route.params.id }),
  },
  {
    path: '/user/edit',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user" */ '@/views/User/UserEdit.vue'),
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
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  { path: '/*', component: Timetable },
];

/** 堆叠页面路径正则，会显示 BottomNav */
export const HeapPagePathReges = [
  /\/$/,
  /\/timetable$/,
  /\/rating$/,
  /\/notification$/,
  /\/user$/,
  /\/login$/,
  /\/forgot-password$/,
  /\/register$/,
  /\/about$/,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
