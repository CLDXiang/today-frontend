<template>
  <div class="content-box">
    <div class="title">
      忘记密码
    </div>
    <div class="input-box">
      <f-input
        v-model="email"
        label="学邮"
        autofocus
        clearable
        outlined
        required
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
        <a-button
          type="primary"
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{
            state === 'init' || state === 'requesting'
              ? '发送验证码'
              : state === 'cooldown'
                ? `${cooldownCnt}s`
                : '重新发送'
          }}
        </a-button>
      </div>
      <f-input
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="新的密码"
        clearable
        outlined
        required
        :rules="[(v) => !!v || '密码不能为空']"
        @click:append="showPassword = !showPassword"
      />
      <f-input
        v-model="password2"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="再次输入新密码"
        clearable
        outlined
        required
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
        @click="modifyPassword"
      >
        修改密码
      </a-button>
    </div>
    <a-button
      style="margin-top: 12px"
      type="link"
      @click="$router.push('/login')"
    >
      返回登录页
    </a-button>
  </div>
</template>

<script lang="ts">
import { authClient } from '@/apis';
import log from '@/utils/log';
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    email: '',
    emailSuffix: '@fudan.edu.cn',
    emailRules: [(v: string) => !!v || '邮箱不能为空', (v: string) => /^\d{11}$/.test(v) || '请输入11位学号'],
    code: '',

    showPassword: false,

    password: '',
    passwordRules: [(v: string) => !!v || '密码不能为空'],
    password2: '',

    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  computed: {
    realEmail(): string {
      return this.email.trim() + this.emailSuffix;
    },
  },
  methods: {
    modifyPassword() {
      if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
        this.$message.warn('请输入11位学号邮箱');
        return;
      }
      if (!/^\d{6}$/.test(this.code)) {
        this.$message.warn('请输入六位数字的验证码');
        return;
      }
      if (this.password !== this.password2) {
        this.$message.warn('两次输入的密码不相等');
        return;
      }
      if (this.password === '') {
        this.$message.warn('密码不能为空');
        return;
      }
      authClient
        .modifyPassword({
          email: this.realEmail,
          code: parseInt(this.code, 10),
          password: this.password,
        })
        .then(() => {
          this.$message.success('修改成功');
          setTimeout(() => this.$router.push('/login'), 500);
        })
        .catch((e) => {
          const code = e.response.status;
          if (code === 409) this.$message.error('验证码错误');
          else if (code === 404) this.$message.error('邮箱不存在');
          else if (code === 400) this.$message.error('格式不正确');
        });
    },
    requestCode() {
      if (this.state === 'init' || this.state === 'resend') {
        if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
          this.$message.warn('请输入11位学号邮箱');
          return;
        }

        this.state = 'requesting';

        authClient.requestCodeForForgotPassword({ email: this.realEmail })
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
            log.error('send code failed', e);
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.info('cooldown-ing or requesting');
      } else {
        log.info('Unexpected state');
      }
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

      > .ant-btn {
        margin-top: 4px;
        width: 92px;
      }
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
