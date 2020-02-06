<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <h1>登录</h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="昵称" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="password" type="password" :rules="passwordRules" label="密码" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-flex>
          <v-btn @click="login">走你</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="$router.push('/register')">注册一个</v-btn>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import log from '../utils/log.js';
import { login, tryHello } from '../services/auth.service';
export default {
  data: () => ({
    valid: false,
    name: 'john',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    password: 'changeme',
    passwordRules: [
      (v) => !!v || 'password is required',
      //   (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    login() {
      login(this.name, this.password).then((resp) => {
        log.info(resp);
        tryHello();
      });
    },
  },
};
</script>