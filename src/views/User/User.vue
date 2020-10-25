<template>
  <div class="content-box">
    <div class="profile-card">
      <div
        v-if="isCurrentUser()"
        class="btn-section"
      >
        <div
          class="control-btn"
          @click="$router.push('/user/edit')"
        >
          <f-icon
            class="text-light"
            name="edit-square"
          />
        </div>
        <div
          class="control-btn"
          @click="logout"
        >
          <f-icon
            class="text-light"
            name="door-open"
          />
        </div>
      </div>
      <div
        v-else
        class="blank-box"
      />
      <div class="info-box">
        <img
          class="avatar"
          :src="processAvatar(userProfile.avatar)"
          alt="avatar"
        >
        <div class="info-section">
          <div>
            <span class="user-name text-dark">
              {{ userProfile.nickname }}
            </span>
            <span
              v-if="!isCurrentUser()"
              class="follow-btn"
            >
              <span class="text-dark">
                ＋&nbsp;关注
              </span>
            </span>
          </div>
          <span class="bio text-light">
            {{ userProfile.bio || '这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名' }}
          </span>
        </div>
      </div>
      <div class="follow-box">
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.watchers }}
          </span>
          <span class="follow-text text-light">
            关注
          </span>
        </div>
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.watchees }}
          </span>
          <span class="follow-text text-light">
            粉丝
          </span>
        </div>
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.fans }}
          </span>
          <span class="follow-text text-light">
            被收藏数
          </span>
        </div>
      </div>
    </div>

    <div class="white-card">
      <div class="main-box">
        <f-tabs
          v-model="activeTab"
          size="small"
          :pages="pages"
        />
      </div>
    </div>

    <div class="bottom-action-bar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

import {
  profileClient,
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
  props: {
    // 访问的用户 ID
    userId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    // 访问的用户数据
    userProfile: {
      avatar: '',
      bio: '',
      name: '',
      nickname: '',
      fans: 0,
      watchers: 0,
      watchees: 0,
    },
    pages: {
      点评: { component: markRaw(RatingList), props: { ratings: [] } },
      回复: { component: markRaw(CommentList), props: { comments: [] } },
      课程: { component: markRaw(LectureList), props: { lectures: [] } },
      收藏: { component: markRaw(CommonList), props: { contents: [] } },
    } as Record<string, { component: unknown; props: Record<string, unknown> }>,
    activeTab: '点评',
  }),
  computed: {
    // 自己的用户数据
    ...mapState(['user']),
    ...mapGetters(['countHistory', 'userLoggedIn']),
  },
  created() {
    profileClient.getUserProfile({ userId: this.userId || this.user.id })
      .then((resp) => {
        this.userProfile = resp;
      })
      .catch(() => {
        // 返回到上一页面
        this.$router.go(-1);
      });
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
    if (this.isCurrentUser()) {
      watchClient.getWatchList({ username: this.user.name, limit: 20 }).then((resp) => {
        this.pages.关注.props.contents = resp.data;
      });
      historyClient.getHistoryList({ username: this.user.name, limit: 20 }).then((resp) => {
        this.pages.足迹.props.contents = resp.data;
      });
    }
  },
  mounted() {
    if (this.isCurrentUser()) {
      this.pages.关注 = { component: markRaw(CommonList), props: { contents: [] } };
      this.pages.足迹 = { component: markRaw(CommonList), props: { contents: [] } };
    }
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
        this.$router.replace({ name: 'Login', query: { redirect: '/user' } });
      }
    },
    isCurrentUser(): boolean {
      // 访问的用户 ID == 自己的用户 ID
      return this.userLoggedIn && (this.userId === this.user.id || this.userId === '');
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #e3f1f3;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  .text-dark {
    color: #4f4f4f;
  }

  .text-light {
    color: #828282;
  }

  > .profile-card {
    display: flex;
    padding: 15px 5%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    > .btn-section {
      display: flex;
      position: relative;
      flex-direction: row;
      align-self: flex-end;

      > .control-btn {
        display: flex;
        padding: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        transition-duration: 0.2s;
      }

      > .control-btn:hover {
        cursor: pointer;
        background-color: #ccf;
      }
    }

    > .blank-box {
      height: 40px;
    }

    > .info-box {
      display: flex;
      width: 100%;
      padding: 0 5%;
      flex-direction: row;

      > .avatar {
        width: 75px;
        height: 75px;
        border: 3px solid $primary-color;
        border-radius: 50px;
        background-color: #fff;
        box-shadow: 0px 4px 5px 2px rgba(130, 155, 170, 0.19);
      }

      > .info-section {
        display: flex;
        width: 80%;
        padding: 15px 25px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        > div:first-child {
          position: relative;
          width: 100%;

          > .user-name {
            float: left;
            display: block;
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          > .follow-btn {
            float: right;
            width: 60px;
            height: 24px;
            background-color: $primary-color;
            border-radius: 100px;
            transition-duration: 0.2s;

            > span {
              display: block;
              padding: 5px;
              font-weight: 400;
              font-size: 14px;
              line-height: 14px;
              text-align: center;
            }
          }

          > .follow-btn:hover {
            cursor: pointer;
            background-color: #ccf;
          }
        }

        > .bio {
          display: block;
          width: 100%;
          padding: 9px 0;
          font-weight: 400;
          font-size: 16px;
          line-height: 16px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    > .follow-box {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;

      > .follow-section {
        display: flex;
        padding: 5px 8%;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        > .follow-number {
          padding: 6px;
          font-weight: 700;
          font-size: 14px;
          line-height: 14px;
        }

        > .follow-text {
          width: 60px;
          font-weight: 400;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }

  > .white-card {
    display: flex;
    padding: 15px 0;
    background-color: #fff;
    box-shadow: 0px 4px 5px 2px rgba(130, 155, 170, 0.19);
    border-radius: 8px;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
}
</style>
