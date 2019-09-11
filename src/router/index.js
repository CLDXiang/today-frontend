import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from '../components/HelloWorld.vue';
import Courses from '../components/Courses.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/hello', component: Hello },
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
