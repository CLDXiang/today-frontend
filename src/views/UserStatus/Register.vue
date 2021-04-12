<template>
  <div class="content-box h-full w-full overflow-y-auto max-w-14xl">
    <div class="title">
      注册
    </div>
    <div class="input-box">
      <f-input
        v-model="email"
        label="学邮"
        autofocus
        clearable
        outlined
        required
        hint="仅用于验证"
        suffix="@fudan.edu.cn"
        :rules="[(v) => !!v || '学邮不能为空', (v) => /^\d{11}$/.test(v) || '请输入11位学号']"
      />
      <div class="email-validate-box">
        <f-input
          v-model="code"
          label="验证码"
          hint="若有未使用的码，可直接填写"
          outlined
          required
        />
        <f-button
          type="primary"
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{ state === 'init' || state === 'requesting'? '发送验证码'
            : state === 'cooldown' ? `${cooldownCnt}s` : '重新发送' }}
        </f-button>
      </div>
      <div>
        <f-input
          v-model="name"
          :rules="[
            (v) => !!v || '用户名不能为空',
            (v) => v.length <= 10 || '用户名不能长于 10 个字符',
            (v) => /^[0-9A-Za-z]+$/.test(v) || '用户名只由字母和数字组成'
          ]"
          :counter="10"
          label="用户名"
          outlined
          required
        />
      </div>
      <f-input
        v-model="password"
        type="password"
        label="密码"
        clearable
        outlined
        required
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
      />
      <f-input
        v-model="confirmPassword"
        type="password"
        label="确认密码"
        clearable
        outlined
        required
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
      />
    </div>
    <div class="button-box">
      <f-button
        class="w-full mt-4"
        type="primary"
        size="large"
        shape="circle"
        @click="register"
      >
        注 册
      </f-button>
    </div>
    <f-button
      class="mt-3"
      type="link"
      @click="$router.push('/login')"
    >
      已有账号？前往登录
    </f-button>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { authClient } from '@/apis';
import log from '@/utils/log';
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    name: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  computed: {
    ...mapGetters(['userLoggedIn']),
    realEmail(): string {
      return `${this.email}@fudan.edu.cn`;
    },
  },
  mounted() {
    // 若用户已登录，跳转至个人首页
    if (this.userLoggedIn) {
      this.$router.push('/user');
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.$message.warn('两次输入密码不一致');
        return;
      }
      if (this.name === '') {
        this.$message.warn('名称不能为空哦');
        return;
      }
      if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
        this.$message.warn('请输入11位学号邮箱');
        return;
      }
      if (!/^\d{6}$/.test(this.code)) {
        this.$message.warn('请输入6位验证码');
        return;
      }
      if (this.password === '') {
        this.$message.warn('密码不能为空哦');
        return;
      }
      if (this.password.length < 6) {
        this.$message.warn('密码长度至少为 6 个字符哦');
        return;
      }
      if (this.password.length > 32) {
        this.$message.warn('密码长度最多为 32 个字符哦');
        return;
      }
      authClient.register({
        name: this.name,
        email: this.realEmail,
        code: parseInt(this.code, 10),
        password: this.password,
      })
        .then(() => {
          this.$message.success('注册成功');
          setTimeout(() => {
            this.$router.push({ name: 'Login' });
          }, 500);
        });
    },
    requestCode() {
      if (this.state === 'init' || this.state === 'resend') {
        if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
          this.$message.warn('请输入11位学号邮箱');
          return;
        }
        this.state = 'requesting';
        authClient.requestCodeRegister({ email: this.realEmail })
          .then(() => {
            this.state = 'cooldown';
            this.cooldownCnt = 60;
            this.$message.success('验证码发送成功');
            const countdown = () => {
              this.cooldownCnt -= 1;
              if (this.cooldownCnt <= 0) this.state = 'resend';
              else if (this.state === 'cooldown') setTimeout(countdown, 1000);
            };
            setTimeout(() => countdown(), 1000);
          })
          .catch((e) => {
            this.state = 'init';
            const code = e.response.status;
            if (code === 400) this.$message.error(e.response.data.message);
            else if (code === 409) this.$message.error('该邮箱已被注册');
            else log.error('Error: unexpected code');
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.error('Warning: cooldown-ing or requesting');
      } else {
        log.error('Error: Unexpected state');
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
    > .f-input {
      width: 80vw;
      max-width: 340px;
    }

    > .email-validate-box {
      display: flex;

      > .f-input {
        max-width: 226px;
        margin-right: 12px;
      }
    }
  }

  > .button-box {
    width: 80vw;
    max-width: 340px;
  }
}
</style>
