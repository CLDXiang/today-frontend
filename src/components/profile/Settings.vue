<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col 
        cols="12"
        sm="8"
        md="6"
        lg="4"
        class="text-center"
      >
        <v-avatar size="150" @click="uploadAvatar">
          <img :src="avatar" alt="avatar">
        </v-avatar>
        <input type="file" accept="image/*" class="hiddenInput" @change="handleFile">
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="nickName"
          label="昵称"
          hint="整个bling的名字~"
          placeholder=""
          clearable
          outlined
          rounded
          counter="30"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-textarea
          v-model="bio"
          label="个性签名"
          hint="介绍一波自己"
          outlined
          rounded
          no-resize
          auto-grow
          counter="128"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="my-2">
        <v-btn large color="primary">保存更改</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    nickName: '',
    bio: '',
  }),
  created() {
    this.$store.commit('SET_BAR_TITLE', '用户设置');
    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.avatar = this.$store.state.user.avatar;
      this.bio = this.$store.state.user.bio;
      this.nickName = this.$store.state.user.nickName;
    },
    uploadAvatar() {
      this.$el.querySelector('.hiddenInput').click();
    },
    // 将头像显示
    handleFile(e) {
      const $target = e.target || e.srcElement;
      const file = $target.files[0];
      const reader = new FileReader();
      reader.onload = (data) => {
        const res = data.target || data.srcElement;
        this.avatar = res.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.hiddenInput {
  display: none;
}
</style>