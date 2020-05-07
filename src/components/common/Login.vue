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
        />
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
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-alert v-if="alertShown" :type="alertType" :dismissible="true">
          {{ alertContent }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn color="primary" class="ma-2" @click="$router.push('/register')">
        注册
      </v-btn>
      <v-btn color="primary" class="ma-2" @click="login">
        登录
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import log from '../../utils/log';
import { login } from '../../services/auth.service';
import {
  getUserStar,
  getUserRate,
  getFollowing,
  getFollower,
  getHistory,
} from '../../services/post.service';

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
    getProfile() {
      getUserStar()
        .then((userStar) => {
          log.info(userStar);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserRate()
        .then((userRate) => {
          log.info(userRate);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollowing()
        .then((following) => {
          log.info(following);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollower()
        .then((follower) => {
          log.info(follower);
        })
        .catch((err) => {
          log.info(err);
        });
      getHistory()
        .then((follower) => {
          log.info(follower);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    login() {
      log.info(this.$router.url);
      login(this.name, this.password)
        .then((resp) => {
          log.info(resp);
          this.showAlert('success', '登录成功');
          const { redirect } = this.$router.currentRoute.query;
          log.info('redirecting', redirect);
          this.$options.methods.getProfile();
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
