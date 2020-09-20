<template>
  <div class="content-box">
    <div class="title">
      找回密码
    </div>
    <div class="input-box">
      <v-text-field
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
        <v-text-field
          v-model="code"
          label="验证码"
          outlined
          required
        />
        <v-btn
          color="primary"
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{ state === 'init' || state === 'requesting'? '发送验证码'
            : state === 'cooldown' ? `${cooldownCnt}s` : '重新发送' }}
        </v-btn>
      </div>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="新的密码"
        clearable
        outlined
        required
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
        @click:append="showPassword = !showPassword"
      />
      <v-text-field
        v-model="password2"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="再次输入新密码"
        clearable
        outlined
        required
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
        @click="modifyPassword"
      >
        修改密码
      </v-btn>
    </div>
    <v-btn style="margin-top: 12px" text color="primary" to="/login">
      返回登录页
    </v-btn>
  </div>
</template>
<script>
import { requestCodeForForgotPassword, modifyPassword } from '../../services/auth.service';
import log from '../../utils/log';

export default {
  data: () => ({
    email: '',
    emailSuffix: '@fudan.edu.cn',
    emailRules: [(v) => !!v || '邮箱不能为空', (v) => /^\d{11}$/.test(v) || '请输入11位学号'],
    code: '',

    showPassword: false,

    password: '',
    passwordRules: [(v) => !!v || '密码不能为空'],
    password2: '',

    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  computed: {
    password2Rules() {
      return [(v) => v === this.password || '密码不一致'];
    },
    realEmail() {
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
      modifyPassword(this.realEmail, parseInt(this.code, 10), this.password)
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

        requestCodeForForgotPassword(this.realEmail)
          .then(() => {
            this.state = 'cooldown';
            const vm = this;
            vm.cooldownCnt = 5; // FIXME
            this.$message.success('验证码发送成功');
            setTimeout(function countdown() {
              vm.cooldownCnt -= 1;
              if (vm.cooldownCnt === 0) vm.state = 'resend';
              else if (vm.state === 'cooldown') setTimeout(countdown, 1000);
            }, 1000);
          })
          .catch((e) => {
            this.state = 'init';
            log.info('send code failed', e);
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.info('cooldown-ing or requesting');
      } else {
        log.info('Unexpected state');
      }
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
    > .v-input {
      width: 80vw;
      max-width: 340px;
    }

    > .email-validate-box {
      display: flex;

      > .v-input {
        max-width: 226px;
        margin-right: 12px;
      }

      > .v-btn {
        margin-top: 10px;
        width: 92px;
      }
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
