<template>
  <v-container>
    <v-row justify="center">
      <h1>登录</h1>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="昵称"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="password"
          type="password"
          :rules="passwordRules"
          label="密码"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-alert :type="alertType" v-if="alertShown" :dismissible="true">{{
          alertContent
        }}</v-alert>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn @click="$router.push('/register')" color="primary" class="ma-2"
        >注册</v-btn
      >
      <v-btn @click="login" color="primary" class="ma-2">登录</v-btn>
    </v-row>
  </v-container>
</template>
<script>
import log from '../utils/log';
import { login, tryHello } from '../services/auth.service';

export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'password is required',
      //   (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    alertType: 'success',
    alertShown: false,
    alertContent: '',
  }),
  created() {
    log.info(this.$router.currentRoute);
  },
  methods: {
    showAlert(type, content) {
      this.alertType = type;
      this.alertContent = content;
      this.alertShown = true;
      setTimeout(() => {
        this.alertShown = false;
      }, 3000);
    },
    login() {
      log.info(this.$router.url);
      login(this.name, this.password)
        .then((resp) => {
          log.info(resp);
          tryHello();
          this.showAlert('success', '登录成功');
          const { redirect } = this.$router.currentRoute.query;
          log.info('redirecting', redirect);
          if (redirect) {
            log.info('redirected!');
            this.$router.push(redirect);
          }
        })
        .catch((e) => {
          log.info(e);
          this.showAlert('warning', '登录失败');
        });
    },
  },
};
</script>
