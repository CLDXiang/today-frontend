<template>
  <div class="content-box h-full w-full overflow-y-auto max-w-14xl">
    <div class="title">
      登录
    </div>
    <div class="input-box">
      <f-input
        v-model="nameOrMail"
        label="用户名或邮箱"
        autofocus
        clearable
        outlined
        required
        hint="与学校系统无关，请使用本站注册的账号~"
        :rules="[(v) => !!v || '用户名不能为空']"
      />
      <f-input
        v-model="password"
        type="password"
        label="密码"
        clearable
        outlined
        required
        hint="https 加密传输，后台不会存储明文密码"
        :rules="[(v) => !!v || '密码不能为空']"
        @keydown="handleKeyDown"
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

<script lang="ts">
import { mapGetters, mapMutations } from 'vuex';
import { authClient, userClient } from '@/apis';
import log from '@/utils/log';
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    nameOrMail: '',
    password: '',
  }),
  computed: {
    ...mapGetters(['userLoggedIn']),
  },
  mounted() {
    // 若用户已登录，跳转至个人首页
    if (this.userLoggedIn) {
      this.$router.push('/user');
    }
  },
  methods: {
    ...mapMutations(['setUserProfile']),
    getProfile() {
      userClient.getUserInfo({})
        .then((profile) => {
          this.setUserProfile(profile);
        })
        .catch((err) => {
          log.error(err);
        });
    },
    login() {
      if (!this.nameOrMail) {
        this.$message.warn('用户名或邮箱不能为空', 1.5);
        return;
      }
      if (!this.password) {
        this.$message.warn('密码不能为空', 1.5);
        return;
      }
      authClient.login({ nameOrMail: this.nameOrMail, password: this.password })
        .then(() => {
          this.$message.success('登录成功', 1);
          this.getProfile(); // 用户登录向后端请求profile的内容，并装入Vuex
          this.$router.push('/timetable');
        })
        .catch((e) => {
          log.error(e);
        });
    },
    handleKeyDown(e: KeyboardEvent) {
      // 监听回车键
      if (e.key === 'Enter') {
        this.login();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
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
