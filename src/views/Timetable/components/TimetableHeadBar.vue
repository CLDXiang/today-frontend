<template>
  <div class="head-bar">
    <img v-if="userLoggedIn" class="avatar" :src="processAvatar(user.avatar)" alt="avatar">
    <div v-else />
    <div class="semester">
      2020年春季学期
    </div>
    <div />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import defaultAvatar from '../../../assets/default_avatar.jpg';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    ...mapGetters(['userLoggedIn']),
  },
  methods: {
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
.head-bar {
  width: 100%;

  padding: 0 12px;
  margin-bottom: 12px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;

  > .semester {
    font-size: 18px;
  }

  > .avatar {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    border: solid 2px #60bdca;
  }
}
</style>