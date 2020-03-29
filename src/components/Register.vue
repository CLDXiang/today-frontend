<template>
  <v-container>
    <v-row justify="center">
      <h1>注册</h1>
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
          v-model="email"
          :rules="emailRules"
          label="E-mail"
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
      <v-btn class="ma-2" color="primary" @click="register">
        提交
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import { register } from '../services/auth.service';

export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
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
  methods: {
    showAlert(type, content) {
      this.alertType = type;
      this.alertContent = content;
      this.alertShown = true;
      setTimeout(() => {
        this.alertShown = false;
      }, 3000);
    },
    register() {
      register(this.name, this.email, this.password).then((resp) => {
        if (resp.data.result === 'success') {
          this.showAlert('success', '注册成功，跳转登录页面……');
          setTimeout(() => {
            this.$router.push('login');
          }, 1000);
        }
        if (resp.data.result === 'failed') {
          this.result = 'already_exist';
          this.showAlert(
            'warning',
            '注册失败，注册失败，该邮箱已经被使用，请直接登录或者更改注册邮箱',
          );
        }
      });
    },
  },
};
</script>
