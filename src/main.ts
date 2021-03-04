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
import {
  FIcon, FInput, FSelect, FTabs, FTabPane, FPopover, FSkeleton,
} from '@/components/common';

import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

import App from './App.vue';
import './registerServiceWorker';
// TODO: 有空测试下不同引入方式的 bundle size
import router from './router';
import store from './store';

/*
  FIXME: 移除 AntD 和 SCSS 后升级最新的 tailwindcss postcss autoprefixer
  https://tailwindcss.com/docs/installation#post-css-7-compatibility-build
 */
import './index.css';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale('zh-cn');

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
  .component('FPopover', FPopover)
  .component('FIcon', FIcon)
  .component('FInput', FInput)
  .component('FSelect', FSelect)
  .component('FSkeleton', FSkeleton)
  .component('FTabs', FTabs)
  .component('FTabPane', FTabPane);

app.mount('#app');
