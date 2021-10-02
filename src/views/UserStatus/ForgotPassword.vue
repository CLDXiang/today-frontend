<template>
  <div class="content-box h-full w-full overflow-y-auto max-w-14xl">
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
        <f-button
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
        </f-button>
      </div>
      <f-input
        v-model="password"
        type="password"
        label="新的密码"
        clearable
        outlined
        required
        :rules="[(v) => !!v || '密码不能为空']"
      />
      <f-input
        v-model="password2"
        type="password"
        label="再次输入新密码"
        clearable
        outlined
        required
        :rules="[(v) => !!v || '密码不能为空']"
      />
    </div>
    <div class="button-box">
      <f-button
        class="w-full"
        type="primary"
        size="large"
        shape="circle"
        @click="resetPassword"
      >
        重置密码
      </f-button>
    </div>
    <f-button
      style="margin-top: 12px"
      type="link"
      @click="$router.push('/login')"
    >
      返回登录页
    </f-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authClient } from '@/apis';
import log from '@/utils/log';

export default defineComponent({
  data: () => ({
    email: '',
    emailSuffix: '@fudan.edu.cn',
    emailRules: [(v: string) => !!v || '邮箱不能为空', (v: string) => /^\d{11}$/.test(v) || '请输入11位学号'],
    code: '',

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
    resetPassword() {
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
      if (this.password.length < 6) {
        this.$message.warn('密码长度至少为 6 个字符哦');
        return;
      }
      if (this.password.length > 32) {
        this.$message.warn('密码长度最多为 32 个字符哦');
        return;
      }
      authClient
        .resetPassword({
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
