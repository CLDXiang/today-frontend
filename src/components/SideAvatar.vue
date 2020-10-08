<template>
  <img
    v-if="userLoggedIn"
    class="avatar"
    :src="processAvatar(user.avatar)"
    alt="avatar"
  >
  <div v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import defaultAvatar from '@/assets/default_avatar.jpg';

// TODO: 点击弹出侧栏

export default defineComponent({
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userLoggedIn']),
  },
  methods: {
    processAvatar(originAvatar: string) {
      if (!originAvatar || originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: solid 2px $primary-color;
}
</style>
