<template>
  <div class="content-box">
    <div class="title-box">
      <span class="back-btn" @click="$router.push('/me')"><icon-back /></span>
      <span class="title">修改个人信息</span>
    </div>
    <div class="avatar-box">
      <img class="avatar" :src="processAvatar(user.avatar)" alt="avatar">
      <v-file-input id="upload" accept="image/png, image/jpeg, image/jpg, image/bmp" style="display: none" @change="handleAvatarUploaded" />
      <v-btn
        color="primary"
        rounded
        depressed
        :disabled="isAvatarUploading"
        :loading="isAvatarUploading"
        @click="handleClickModifyAvatar"
      >
        修改头像
      </v-btn>
    </div>
    <div class="info-box">
      <div>
        <v-text-field
          v-model="nickName"
          :rules="[(v) => v.length <= 10 || '昵称最长 10 个字哦']"
          :counter="10"
          dense
          label="昵称"
          outlined
        />
      </div>
      <div>
        <v-text-field
          v-model="bio"
          :rules="[(v) => v.length <= 50 || '个性签名最长 50 个字哦']"
          :counter="50"
          dense
          label="个性签名"
          outlined
        />
      </div>
      <div>
        <v-btn
          block
          color="primary"
          rounded
          depressed
          :disabled="!isInfoModified || isInfoModifying"
          :loading="isInfoModifying"
          @click="handleClickModifyInfo"
        >
          保存修改
        </v-btn>
      </div>
    </div>
    <div class="email-box">
      <div>
        <v-text-field
          dense
          label="邮箱"
          clearable
          outlined
          disabled
          suffix="@fudan.edu.cn"
        />
      </div>
      <div class="email-validate-box">
        <v-text-field
          dense
          label="验证码"
          outlined
          disabled
        />
        <v-btn
          color="primary"
          rounded
          disabled
        >
          发送验证码
        </v-btn>
      </div>
      <div>
        <v-btn
          block
          color="primary"
          rounded
          depressed
          disabled
        >
          更换邮箱（开发中）
        </v-btn>
      </div>
    </div>
    <div class="pw-box">
      <div>
        <v-text-field
          label="旧密码"
          dense
          clearable
          outlined
          disabled
        />
      </div>
      <div>
        <v-text-field
          label="新密码"
          dense
          clearable
          outlined
          disabled
        />
      </div>
      <div>
        <v-text-field
          label="确认新密码"
          dense
          clearable
          outlined
          disabled
        />
      </div>
      <v-btn
        block
        color="primary"
        rounded
        depressed
        to="/forgot-password"
      >
        修改密码（开发中，点击前往忘记密码）
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { IconBack } from '../../components/icons';
import { editProfile, uploadAvatar } from '../../services/profile.service';
import defaultAvatar from '../../assets/default_avatar.jpg';
import log from '../../utils/log';

export default {
  components: {
    IconBack,
  },
  data: () => ({
    isAvatarUploading: false,
    isInfoModifying: false,
    nickName: '',
    bio: '',
  }),
  computed: {
    ...mapState(['user']),
    isInfoModified() {
      return this.bio !== (this.user.bio || '') || this.nickName !== (this.user.nickName || '');
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.bio = this.user.bio || '';
      this.nickName = this.user.nickName || '';
    },
    handleClickModifyAvatar() {
      this.$el.querySelector('#upload').click();
    },
    handleAvatarUploaded(f) {
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
      uploadAvatar(data)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
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
      if (this.nickName.length > 10) {
        this.$message.warn('昵称最长 10 个字哦！');
        return;
      }
      if (this.bio.length > 50) {
        this.$message.warn('个性签名最长 50 个字哦');
        return;
      }
      this.isInfoModifying = true;
      const data = { nickName: this.nickName, bio: this.bio };
      editProfile(data)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
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
    processAvatar(originAvatar) {
      if (!originAvatar || originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
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

    > .v-btn {
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

      > .v-input {
        max-width: 226px;
        margin-right: 12px;
      }

      > .v-btn {
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
