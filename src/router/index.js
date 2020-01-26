import Vue from 'vue';
import VueRouter from 'vue-router';
import Courses from '../components/Courses.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Courses },
  { path: '/select', component: Courses },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '*', component: Courses },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
