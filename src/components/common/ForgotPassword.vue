<template>
  <div class="register-container">
    <div class="mark">
      <h2>找回密码</h2>
      <div class="email-bar">
        <v-text-field
          v-if="state === 'init'"
          v-model="email"
          :rules="emailRules"
          label="邮箱"
          required
        />
        <v-text-field
          v-else
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
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    code: '',

    showPassword: false,

    password: '',
    passwordRules: [(v) => !!v || 'password is required'],
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
  },
  methods: {
    modifyPassword() {
      modifyPassword(this.email, parseInt(this.code, 10), this.password)
        .then(() => {
          this.$message.success('修改成功');
        })
        .catch((e) => log.info(e));
    },
    requestCode() {
      if (this.state === 'init') {
        this.state = 'requesting';

        requestCodeForForgotPassword(this.email)
          .then(() => {
            this.state = 'cooldown';
            const vm = this;
            vm.cooldownCnt = 5; // FIXME
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
      } else if (this.state === 'resend') {
        this.state = 'init';
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
