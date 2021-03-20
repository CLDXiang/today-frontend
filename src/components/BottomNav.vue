<template>
  <div class="bottom-nav flex-initial flex-shrink-0">
    <span
      :class="{ 'text-primary': activePage === 'timetable' }"
      @click="handleClick('timetable')"
    >
      <f-icon
        name="timetable"
        size="20"
      />
      <span>课表</span>
    </span>

    <span
      :class="{ 'text-primary': activePage === 'rating' }"
      @click="handleClick('rating')"
    >
      <f-icon
        name="rating"
        size="20"
      />
      <span>评课</span>
    </span>

    <span
      :class="{ 'text-primary': activePage === 'status' }"
      @click="handleClick('status')"
    >
      <f-icon
        name="my"
        size="20"
      />
      <span>{{ userLoggedIn ? '我的' : '登录' }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import log from '@/utils/log';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

type ActivePageType = 'timetable' | 'rating' | 'notification' | 'status';

export default defineComponent({
  computed: {
    ...mapGetters(['userLoggedIn']),
    activePage() {
      const { path } = this.$route;
      if (/\/rating\/?.*$/.test(path)) {
        return 'rating';
      }
      if (/\/notification\/?.*$/.test(path)) {
        return 'notification';
      }
      if (
        /\/user\/?.*$/.test(path)
        || /\/login\/?.*$/.test(path)
        || /\/register\/?.*$/.test(path)
        || /\/forgot-password\/?.*$/.test(path)
        || /\/about\/?.*$/.test(path)
      ) {
        return 'status';
      }
      return 'timetable';
    },
  },
  methods: {
    handleClick(v: ActivePageType) {
      if (this.activePage === v) return;
      if (v === 'timetable') {
        this.$router.push({ name: 'Timetable' }).catch((e) => {
          log.error(e);
        });
      } else if (v === 'rating') {
        this.$router.push({ name: 'Rating' }).catch((e) => {
          log.error(e);
        });
      } else if (v === 'notification') {
        this.$router.push({ name: 'Notification' }).catch((e) => {
          log.error(e);
        });
      } else if (v === 'status') {
        this.$router.push({ name: this.userLoggedIn ? 'Me' : 'Login' }).catch((e) => {
          log.error(e);
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.bottom-nav {
  // background-color: #f8fefc;
  background-color: #fff;
  height: 64px;
  width: 100vw;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
              0 4px 5px 0 rgba(0,0,0,.14),
              0 1px 10px 0 rgba(0,0,0,.12);

  display: flex;
  justify-content: center;
  user-select: none;

  color: $gray2;
  font-size: 14px;

  > span {
    height: 100%;
    min-width: 64px;
    max-width: 168px;
    padding: 0 16px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    transition: all 0.3s cubic-bezier(.4,0,.2,1);
  }
}
</style>
