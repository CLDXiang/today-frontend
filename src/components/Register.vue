<template>
  <v-form v-model="valid">
    <v-container>
        <v-row>
            <h1>注册</h1>
        </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="昵称"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="4">
          <v-text-field v-model="password" :rules="passwordRules" label="密码" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-btn @click="register">提交</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { register } from '../services/register.service';
export default {
  data: () => ({
    valid: false,
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
  }),
  methods: {
      register() {
        register(this.name, this.email, this.password).then((response, data) => {
          alert(data);
        });
      }
  }
};
</script>