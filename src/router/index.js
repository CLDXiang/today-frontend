import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/common/Login.vue';
import Register from '../components/common/Register.vue';
import Profile from '../components/profile/Profile.vue';
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
  { path: '/', component: Timetable },
  { path: '/select', component: Timetable },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },

  {
    path: '/rate/:code/:index',
    component: Rate,
    children: [
      { path: '', component: RateView },
      { path: 'submit', component: RateSubmitView },
    ],
  },

  { path: '/reply', component: Reply },
  { path: '/hole', component: Hole, meta: { requiresAuth: true } },
  { path: '/post/:id', component: PostView, props: true },
  { path: '/search', component: SearchView },
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
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
