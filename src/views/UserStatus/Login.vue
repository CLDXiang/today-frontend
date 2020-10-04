<template>
  <div class="content-box">
    <div class="title">
      登录
    </div>
    <div class="input-box">
      <f-input
        v-model="name"
        label="用户名"
        autofocus
        clearable
        outlined
        required
        hint="与学校系统无关，请使用本站注册的账号~"
        :rules="[(v) => !!v || '用户名不能为空']"
      />
      <f-input
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="密码"
        clearable
        outlined
        required
        hint="https 加密传输，后台不会存储明文密码"
        :rules="[(v) => !!v || '密码不能为空']"
        @click:append="showPassword = !showPassword"
      />
    </div>
    <div class="button-box">
      <a-button
        block
        type="primary"
        size="large"
        shape="round"
        @click="login"
      >
        登录
      </a-button>
      <a-button
        block
        type="primary"
        size="large"
        shape="round"
        ghost
        @click="$router.push('/register')"
      >
        注册
      </a-button>
    </div>
    <a-button
      style="margin-top: 12px"
      type="link"
      @click="$router.push('/forgot-password')"
    >
      忘记密码？
    </a-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { login } from '@/apis/auth';
import { getUserProfile } from '@/apis/profile';
import log from '@/utils/log';
import { defineComponent } from 'vue';

export default defineComponent({
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
          this.$store.commit('setUserProfile', profile);
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
          this.getProfile(); // 用户登录向后端请求profile的内容，并装入Vuex
          if (this.$router.currentRoute?.query?.redirect) {
            this.$router.push(this.$router.currentRoute.query.redirect);
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
});
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

  .f-input {
    margin-bottom: 8px;
  }

  > .title {
    color: #333;
    font-size: 24px;
    padding: 4px 0 32px 0;
  }

  > .input-box {
    .f-input {
      width: 80vw;
      max-width: 340px;
    }
  }

  > .button-box {
    width: 80vw;
    max-width: 340px;

    > .ant-btn {
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
