<template>
  <div
    class="p-7 flex flex-col justify-start items-stretch h-full w-full overflow-y-auto max-w-14xl"
  >
    <div class="flex justify-center items-center h-6 mt-2 mb-4 mx-0">
      <span
        class="absolute left-5"
        @click="$router.push('/user')"
      >
        <f-icon
          name="back"
          :width="14"
          :height="24"
        />
      </span>
      <span class="text-gray-800 text-xl">修改个人信息</span>
    </div>
    <div class="w-full max-w-sm self-center flex items-end mb-4">
      <img
        class="bg-gray-100 w-16 h-16 rounded-full mr-5"
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
      <f-button
        class="flex-1"
        type="primary"
        shape="circle"
        :disabled="isAvatarUploading"
        :loading="isAvatarUploading"
        @click="handleClickModifyAvatar"
      >
        修改头像
      </f-button>
    </div>
    <div class="w-full max-w-sm self-center mb-4">
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
        <f-button
          class="w-full"
          type="primary"
          shape="circle"
          :disabled="!isInfoModified || isInfoModifying"
          :loading="isInfoModifying"
          @click="handleClickModifyInfo"
        >
          保存修改
        </f-button>
      </div>
    </div>
    <div class="w-full max-w-sm self-center mb-4">
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
      <div class="flex">
        <f-input
          dense
          label="验证码"
          outlined
          disabled
        />
        <f-button
          class="mt-0.5 w-24 ml-3"
          type="primary"
          shape="circle"
          disabled
        >
          发送验证码
        </f-button>
      </div>
      <div>
        <f-button
          class="w-full"
          type="primary"
          shape="circle"
          disabled
        >
          更换邮箱（开发中）
        </f-button>
      </div>
    </div>
    <div class="w-full max-w-sm self-center">
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
      <f-button
        class="w-full"
        type="primary"
        shape="circle"
        @click="handleClickChangePassword"
      >
        修改密码
      </f-button>
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
