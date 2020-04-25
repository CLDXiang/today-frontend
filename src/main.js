import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import message from './utils/message';
import './scss/mark.scss';
import './scss/responsive.scss';
import './scss/button.scss';
import './scss/dialog.scss';
import 'material-design-icons/iconfont/material-icons.css';
// import log from './utils/log';
// import * as config from './utils/config';

// log.info(config);

Vue.prototype.$message = message;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
