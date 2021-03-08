<template>
  <div class="content-box h-full w-full overflow-y-auto max-w-14xl">
    <div class="title-box">
      <span
        class="back-btn"
        @click="$router.push('/user')"
      >
        <f-icon
          name="back"
          :width="14"
          :height="24"
        />
      </span>
      <span class="title">修改个人信息</span>
    </div>
    <div class="avatar-box">
      <img
        class="avatar"
        :src="processAvatar(user.avatar)"
        alt="avatar"
      >
      <input
        id="upload"
        style="display: none"
        accept="image/png, image/jpeg, image/jpg, image/bmp"
        type="file"
        @change="
          (e) =>
            handleAvatarUploaded(
              (e.target.files && e.target.files.length && e.target.files[0]) || null,
            )
        "
      >
      <a-button
        type="primary"
        shape="round"
        :disabled="isAvatarUploading"
        :loading="isAvatarUploading"
        @click="handleClickModifyAvatar"
      >
        修改头像
      </a-button>
    </div>
    <div class="info-box">
      <div>
        <f-input
          v-model="nickname"
          :rules="[(v) => v.length <= 10 || '昵称最长 10 个字哦']"
          :counter="10"
          dense
          label="昵称"
          outlined
        />
      </div>
      <div>
        <f-input
          v-model="bio"
          :rules="[(v) => v.length <= 50 || '个性签名最长 50 个字哦']"
          :counter="50"
          dense
          label="个性签名"
          outlined
        />
      </div>
      <div>
        <a-button
          block
          type="primary"
          shape="round"
          :disabled="!isInfoModified || isInfoModifying"
          :loading="isInfoModifying"
          @click="handleClickModifyInfo"
        >
          保存修改
        </a-button>
      </div>
    </div>
    <div class="email-box">
      <div>
        <f-input
          dense
          label="邮箱"
          clearable
          outlined
          disabled
          suffix="@fudan.edu.cn"
        />
      </div>
      <div class="email-validate-box">
        <f-input
          dense
          label="验证码"
          outlined
          disabled
        />
        <a-button
          type="primary"
          shape="round"
          disabled
        >
          发送验证码
        </a-button>
      </div>
      <div>
        <a-button
          block
          type="primary"
          shape="round"
          disabled
        >
          更换邮箱（开发中）
        </a-button>
      </div>
    </div>
    <div class="pw-box">
      <div>
        <f-input
          v-model="oldPassword"
          type="password"
          label="旧密码"
          dense
          clearable
          outlined
        />
      </div>
      <div>
        <f-input
          v-model="newPassword"
          type="password"
          label="新密码"
          dense
          clearable
          outlined
        />
      </div>
      <div>
        <f-input
          v-model="confirmPassword"
          type="password"
          label="确认新密码"
          dense
          clearable
          outlined
        />
      </div>
      <a-button
        block
        type="primary"
        shape="round"
        @click="handleClickChangePassword"
      >
        修改密码
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';
import { authClient, userClient } from '@/apis';
import log from '@/utils/log';
import { defineComponent } from 'vue';
import { useProcessAvatar } from '@/composables';

export default defineComponent({
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
  data: () => ({
    isAvatarUploading: false,
    isInfoModifying: false,
    nickname: '',
    bio: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }),
  computed: {
    ...mapState(['user']),
    isInfoModified(): boolean {
      return this.bio !== (this.user.bio || '') || this.nickname !== (this.user.nickname || '');
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapMutations(['setUserProfile']),
    fetchData() {
      this.bio = this.user.bio || '';
      this.nickname = this.user.nickname || '';
    },
    handleClickModifyAvatar() {
      this.$el.querySelector('#upload').click();
    },
    handleAvatarUploaded(f: File) {
      if (!f) {
        this.$message.warn('文件上传失败');
        return;
      }
      if (f.size > 200000) {
        this.$message.warn('请使用不超过 200KB 的图片');
        return;
      }
      this.isAvatarUploading = true;
      const data = new FormData();
      data.append('file', f);
      userClient.uploadAvatar({ userAvatar: data })
        .then((resp) => {
          this.setUserProfile(resp);
          this.$message.success('修改头像成功！');
        })
        .catch((err) => {
          this.$message.error('修改头像失败');
          log.error(err);
        })
        .finally(() => {
          this.isAvatarUploading = false;
        });
    },
    handleClickModifyInfo() {
      if (this.nickname.length > 10) {
        this.$message.warn('昵称最长 10 个字哦！');
        return;
      }
      if (this.bio.length > 50) {
        this.$message.warn('个性签名最长 50 个字哦');
        return;
      }
      this.isInfoModifying = true;
      userClient.editUserInfo({ nickname: this.nickname, bio: this.bio })
        .then((resp) => {
          this.setUserProfile(resp);
          this.$message.success('修改成功！');
        })
        .catch((err) => {
          this.$message.error('修改失败！');
          log.error(err);
        })
        .finally(() => {
          this.isInfoModifying = false;
        });
    },
    handleClickChangePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.$message.warn('两次输入的新密码不一致哦！');
        return;
      }
      if (this.oldPassword === this.newPassword) {
        this.$message.warn('新密码和旧密码一样哦！');
        return;
      }
      if (this.newPassword === '') {
        this.$message.warn('新密码不能为空哦！');
        return;
      }
      if (this.newPassword.length < 6) {
        this.$message.warn('密码长度至少为 6 个字符哦！');
        return;
      }
      if (this.newPassword.length > 32) {
        this.$message.warn('密码长度最多为 32 个字符哦！');
        return;
      }
      authClient.changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword })
        .then(() => {
          this.$message.success('修改成功！');
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        });
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
  align-items: stretch;

  > .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    margin: 8px 0 18px 0;

    > .back-btn {
      position: absolute;
      left: 20px;
    }

    > .title {
      color: #333;
      font-size: 24px;
    }
  }

  > .avatar-box {
    width: 100%;
    max-width: 375px;
    align-self: center;
    display: flex;
    align-items: flex-end;
    margin-bottom: 18px;

    > .avatar {
      background-color: #fff;
      width: 64px;
      height: 64px;
      border-radius: 32px;
      margin-right: 20px;
    }

    > .ant-btn {
      flex: 1;
    }
  }

  > .info-box {
    width: 100%;
    max-width: 375px;
    align-self: center;
    margin-bottom: 18px;
  }

  > .email-box {
    width: 100%;
    max-width: 375px;
    align-self: center;
    margin-bottom: 18px;
    > .email-validate-box {
      display: flex;

      > .f-input {
        max-width: 226px;
        margin-right: 12px;
      }

      > .ant-btn {
        margin-top: 2px;
        width: 92px;
      }
    }
  }

  > .pw-box {
    width: 100%;
    max-width: 375px;
    align-self: center;
  }
}
</style>
