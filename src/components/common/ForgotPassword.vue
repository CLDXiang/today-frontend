<template>
  <div class="register-container">
    <div class="mark">
      <h2>找回密码</h2>
      <div class="email-bar">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :suffix="emailSuffix"
          label="邮箱"
          required
        />
      </div>

      <div class="email-bar">
        <v-text-field
          v-model="code"
          label="验证码"
          required
        />

        <v-divider class="email-divider" vertical />
        <v-btn
          class="email-btn"
          color="primary"
          depressed
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{ state === 'init' || state === 'requesting'? '获取验证码'
            : state === 'cooldown' ? `${cooldownCnt}s` : '重新发送' }}
        </v-btn>
      </div>
 
      <div>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text': 'password'"
          :rules="passwordRules"
          label="新的密码"
          required
          @click:append="showPassword = !showPassword"
        />
      </div>
      <div>
        <v-text-field
          v-model="password2"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text': 'password'"
          :rules="password2Rules"
          label="再次输入新密码"
          required
          @click:append="showPassword = !showPassword"
        />
      </div>
      <div>
        <v-btn color="primary" @click="modifyPassword">
          修改密码
        </v-btn>
      </div>
    </div>
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
@import '../../scss/utils.scss';
@import '../../scss/mark.scss';

.register-container {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.mark {
  display: flex;
  flex-direction: column;
  max-width: $main-width/2;
  width: 100%;
  @include mark;
}

.email-bar {
  display: flex;
  align-items: center;
  > .email-divider {
    margin: 1em 1em;
  }
}
</style>
