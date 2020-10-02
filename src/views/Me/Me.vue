<template>
  <div class="content-box">
    <div class="dark-box">
      <img
        class="avatar"
        :src="processAvatar(user.avatar)"
        alt="avatar"
      >
      <div class="nickName">
        {{ user.name }}
      </div>
    </div>
    <div class="white-card">
      <div class="info-box">
        <div class="info-box__header">
          <span>个人信息</span>
          <span @click="$router.push('/me/edit')">
            <f-icon name="edit-square" />
          </span>
        </div>
        <div class="info-list">
          <div>昵称：{{ user.nickName || '点编辑按钮取个昵称吧~  ↗ ' }}</div>
          <div>个性签名：{{ user.bio || '这个人还没有个性签名诶' }}</div>
        </div>
      </div>
      <div class="btn-box">
        <a-button
          block
          type="primary"
          size="large"
          shape="round"
          @click="logout"
        >
          退出登录
        </a-button>
      </div>

      <div class="bottom-action-bar" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FIcon from '@/components/common/FIcon.vue';
import defaultAvatar from '../../assets/default_avatar.jpg';

export default {
  data: () => ({
    aaa: 1,
  }),
  computed: {
    ...mapState(['user', 'profile']),
    ...mapGetters(['countHistory', 'userLoggedIn']),
  },
  methods: {
    processAvatar(originAvatar) {
      if (!originAvatar || originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
    logout() {
      if (this.userLoggedIn) {
        this.$store.commit('LOGOUT');
        this.$router.replace({ name: 'Timetable' });
      } else {
        this.$store.commit('LOGOUT');
        this.$router.replace({ name: 'Login', query: { redirect: '/me' } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: $primary-color;

  > .dark-box {
    height: 160px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .avatar {
      background-color: #fff;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #fff;
      box-sizing: border-box;
    }

    > .nickName {
      margin-top: 8px;
      font-size: 20px;
      line-height: 20px;
      color: #fff;
      font-weight: bold;
    }
  }

  > .white-card {
    box-shadow: 0px -4px 5px 5px rgba(141, 141, 141, 0.3);
    border-radius: 8px;
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    padding: 30px;

    > .info-box {
      display: flex;
      flex-direction: column;

      width: 100%;
      max-width: 375px;
      align-self: center;

      > .info-box__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > span:first-child {
          font-size: 24px;
          line-height: 24px;
          color: #4f4f4f;
          font-weight: bold;
        }

        > span:last-child > i {
          font-size: 36px;
          color: #6a7079;
        }
      }

      > .info-list {
        margin: 40px 8px;

        > div {
          padding: 14px 0;
          line-height: 24px;
          color: #828282;
          font-size: 18px;
          border-bottom: solid 1px #bdbdbd;
          display: flex;
          align-items: center;
        }
      }
    }

    .btn-box {
      width: 100%;
      max-width: 375px;
      align-self: center;
    }
  }
}
</style>
