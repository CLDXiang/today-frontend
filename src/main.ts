import { createApp } from 'vue';
import {
  message,
  Button,
  Modal,
  Drawer,
  Badge,
} from 'ant-design-vue';

import App from './App.vue';
import './registerServiceWorker';
// TODO: 有空测试下不同引入方式的 bundle size
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router);

// AntD
app.use(Button).use(Modal).use(Drawer).use(Badge);
app.config.globalProperties.$message = message;

app.mount('#app');
