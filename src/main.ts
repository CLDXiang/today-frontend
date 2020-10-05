import { createApp } from 'vue';
import {
  message,
  Button,
  Modal,
  Drawer,
  Badge,
  Dropdown,
  Slider,
} from 'ant-design-vue';
import { Message } from 'ant-design-vue/types/message.d';
import { FIcon, FInput, FSelect } from '@/components/common';

import App from './App.vue';
import './registerServiceWorker';
// TODO: 有空测试下不同引入方式的 bundle size
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router);

// AntD 组件
app
  .use(Button)
  .use(Modal)
  .use(Drawer)
  .use(Badge)
  .use(Dropdown)
  .use(Slider);
app.config.globalProperties.$message = message;
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: Message;
  }
}

// 自定义全局组件
app
  .component('FIcon', FIcon)
  .component('FInput', FInput)
  .component('FSelect', FSelect);

app.mount('#app');
