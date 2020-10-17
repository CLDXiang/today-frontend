<template>
  <div class="content-box">
    <div class="banner-box">
      <span @click="logout">
        <!-- TODO: src/components/common/FIcon.vue: "logout" icon not implemented,
          temporarily using "back" icon instead -->
        <f-icon name="back" />
      </span>
    </div>
    <img
      class="avatar"
      :src="processAvatar(user.avatar)"
      alt="avatar"
    >

    <div class="white-box">
      <div class="info-box">
        <div class="info-box__header">
          <span class="user-name">
            {{ user.name }}
          </span>
          <span @click="$router.push('/me/edit')">
            <f-icon name="edit-square" />
          </span>
        </div>
        <div class="info-box__content">
          <div class="bio">
            {{ user.bio || '这是我的个性签名' }}
          </div>
          <div class="info">
            {{ '信息展示区' }}
          </div>
        </div>
      </div>

      <div class="main-box">
        <f-tabs
          v-model="activeTab"
          size="small"
          :pages="pages"
        />
      </div>

      <div class="bottom-action-bar" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw, DefineComponent } from 'vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

import {
  ratingClient,
  commentClient,
  lectureClient,
  starClient,
  watchClient,
  historyClient,
} from '@/apis';

import {
  RatingList,
  CommentList,
  LectureList,
  CommonList,
} from './components';

import defaultAvatar from '../../assets/default_avatar.jpg';

export default defineComponent({
  data: () => ({
    pages: {
      点评: { component: markRaw(RatingList), props: { ratings: [] } },
      回复: { component: markRaw(CommentList), props: { comments: [] } },
      课程: { component: markRaw(LectureList), props: { lectures: [] } },
      收藏: { component: markRaw(CommonList), props: { contents: [] } },
      关注: { component: markRaw(CommonList), props: { contents: [] } },
      足迹: { component: markRaw(CommonList), props: { contents: [] } },
    } as Record<string, { component: DefineComponent; props: Record<string, unknown> }>,
    activeTab: '点评',
  }),
  computed: {
    ...mapState(['user', 'profile']),
    ...mapGetters(['countHistory', 'userLoggedIn']),
  },
  created() {
    ratingClient.getRatingList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.点评.props.ratings = resp.data;
    });
    commentClient.getCommentList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.回复.props.comments = resp.data;
    });
    lectureClient.getSelectList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.课程.props.lectures = resp.data;
    });
    starClient.getStarList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.收藏.props.contents = resp.data;
    });
    watchClient.getWatchList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.关注.props.contents = resp.data;
    });
    historyClient.getHistoryList({ username: this.user.name, limit: 20 }).then((resp) => {
      this.pages.足迹.props.contents = resp.data;
    });
  },
  methods: {
    ...mapMutations({ vuexLogout: 'logout' }),
    processAvatar(originAvatar: string): string {
      if (!originAvatar || originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
    logout(): void {
      if (this.userLoggedIn) {
        this.vuexLogout();
        this.$router.replace({ name: 'Timetable' });
      } else {
        this.vuexLogout();
        this.$router.replace({ name: 'Login', query: { redirect: '/me' } });
      }
    },
    isCurrentUser(): boolean {
      return this.$route.name === 'Me';
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $primary-color;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  > .banner-box {
    display: flex;
    padding: 20px 8%;
    height: 96px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

  > .avatar {
    position: absolute;
    top: 48px;
    left: 8%;
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    border: 2px solid #fff;
    border-radius: 32px;
    background-color: #fff;
  }

  > .white-box {
    display: flex;
    padding: 20px 0;
    background-color: #fff;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    > .info-box {
      display: flex;
      padding: 10px 8%;
      width: 100%;
      flex-direction: column;

      > .info-box__header {
        display: flex;
        padding: 6px 0;
        justify-content: space-between;
        align-items: center;

        > .user-name {
          color: #000;
          font-weight: bold;
          font-size: 20px;
          line-height: 20px;
        }

        > span {
          display: flex;
        }
      }

      > .info-box__content {
        display: flex;
        padding: 6px 0;
        flex-direction: column;

        > .bio {
          color: #aaa;
          font-size: 12px;
          line-height: 12px;
          align-self: flex-start;
        }

        > .info {
          margin-top: 12px;
          padding: 42px;
          width: 100%;
          height: 100px;
          border: 1px dashed #c4c4c4;
          background: #fff;
          color: #1486ff;
          text-align: center;
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
