<template>
  <div class="head-bar">
    <img
      v-if="userLoggedIn"
      class="avatar"
      :src="processAvatar(user.avatar)"
      alt="avatar"
    >
    <div v-else />
    <div class="semester">
      2020年秋季学期
    </div>
    <div
      class="action-group"
      @click="handleClickCloud"
    >
      <icon-cloud />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import defaultAvatar from '../../../assets/default_avatar.jpg';
import { IconCloud } from '../../../components/icons';

export default {
  components: {
    IconCloud,
  },
  data() {
    return {
      /** 同步冷却 */
      cooldownCnt: 0,
    };
  },
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
    handleClickCloud() {
      if (this.cooldownCnt > 0) {
        this.$message.warn(`请等待${this.cooldownCnt}秒再进行下一次云同步~`);
        return;
      }
      const cooldown = () => {
        setTimeout(() => {
          this.cooldownCnt -= 1;
          if (this.cooldownCnt > 0) {
            cooldown();
          }
        }, 1000);
      };

      this.cooldownCnt = 60;
      cooldown();
      this.$emit('click-cloud');
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
    border: solid 2px $primary-color;
  }

  > .action-group {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}
</style>
