<template>
  <div class="content-box">
    <div class="title">
      登录
    </div>
    <div class="input-box">
      <v-text-field
        v-model="name"
        label="用户名"
        autofocus
        clearable
        outlined
        required
        hint="与学校系统无关，请使用本站注册的账号~"
        :rules="[
          (v) => !!v || '用户名不能为空',
        ]"
      />
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="密码"
        clearable
        outlined
        required
        hint="https 加密传输，后台不会存储明文密码"
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
        @click:append="showPassword = !showPassword"
      />
    </div>
    <div class="button-box">
      <v-btn
        block
        color="primary"
        large
        rounded
        depressed
        @click="login"
      >
        登录
      </v-btn>
      <v-btn
        block
        color="primary"
        large
        rounded
        depressed
        outlined
        to="/register"
      >
        注册
      </v-btn>
    </div>
    <v-btn
      style="margin-top: 12px"
      text
      color="primary"
      to="/forgot-password"
    >
      忘记密码？
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { login } from '@/apis/auth.service';
import { getUserProfile } from '@/apis/profile.service';
import log from '@/utils/log';

export default {
  data: () => ({
    name: '',
    password: '',
    showPassword: false,
  }),
  computed: {
    ...mapGetters(['userLoggedIn']),
  },
  mounted() {
    // 若用户已登录，跳转至个人首页
    if (this.userLoggedIn) {
      this.$router.push('/me');
    }
  },
  methods: {
    getProfile() {
      getUserProfile()
        .then((profile) => {
          this.$store.commit('SET_USER_PROFILE', profile);
        })
        .catch((err) => {
          log.error(err);
        });
    },
    login() {
      if (!this.name) {
        this.$message.warn('用户名不能为空');
        return;
      }
      if (!this.password) {
        this.$message.warn('密码不能为空');
        return;
      }
      login(this.name, this.password)
        .then(() => {
          this.$message.success('登录成功');
          const { redirect } = this.$router.currentRoute.query;
          this.getProfile(); // 用户登录向后端请求profile的内容，并装入Vuex
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push('/timetable');
          }
        })
        .catch((e) => {
          log.error(e);
          this.$message.warn('登录失败');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > .title {
    color: #333;
    font-size: 24px;
    padding: 4px 0 32px 0;
  }

  > .input-box {
    .v-input {
      width: 80vw;
      max-width: 340px;
    }
  }

  > .button-box {
    width: 80vw;
    max-width: 340px;

    > .v-btn {
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
