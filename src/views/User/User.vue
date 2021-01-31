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
            name="pencil-square"
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
              {{ userProfile.nickname || userProfile.name }}
            </span>
            <!-- TODO: 实现关注功能 -->
            <span
              v-if="!isCurrentUser()"
              class="follow-btn"
            >
              <span class="text-dark"> ＋&nbsp;关注 </span>
            </span>
          </div>
          <span class="bio text-light">
            {{
              userProfile.bio ||
                '这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名这是我的个性签名'
            }}
          </span>
        </div>
      </div>
      <div class="follow-box">
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.watchers || 0 }}
          </span>
          <span class="follow-text text-light"> 关注 </span>
        </div>
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.watchees || 0 }}
          </span>
          <span class="follow-text text-light"> 粉丝 </span>
        </div>
        <div class="follow-section">
          <span class="follow-number text-dark">
            {{ userProfile.fans || 0 }}
          </span>
          <span class="follow-text text-light"> 被收藏数 </span>
        </div>
      </div>
    </div>

    <div class="white-card">
      <div class="main-box">
        <f-tabs v-model="activeTab">
          <f-tab-pane tab="点评">
            <rating-list :ratings="ratingList" />
          </f-tab-pane>
          <f-tab-pane tab="回复">
            <comment-list :comments="commentList" />
          </f-tab-pane>
          <f-tab-pane tab="课程">
            <lecture-list :lectures="lectureList" />
          </f-tab-pane>
          <f-tab-pane tab="收藏">
            <common-list :contents="starList" />
          </f-tab-pane>
          <f-tab-pane
            v-if="isCurrentUser"
            tab="关注"
          >
            <common-list :contents="watchList" />
          </f-tab-pane>
          <f-tab-pane
            v-if="isCurrentUser"
            tab="足迹"
          >
            <common-list :contents="historyList" />
          </f-tab-pane>
        </f-tabs>
      </div>
    </div>

    <div class="bottom-action-bar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapState, mapMutations } from 'vuex';

import {
  userClient,
  rateClient,
  commentClient,
  // lectureClient,
  starClient,
  watchClient,
  historyClient,
} from '@/apis';

import { useProcessAvatar } from '@/composables';
import {
  CardRatingItem,
  CardCommentItem,
  CardLectureItem,
  CardCommonItem,
} from '@/components/listCard';
import {
  RatingList, CommentList, LectureList, CommonList,
} from './components';

export default defineComponent({
  components: {
    RatingList,
    CommentList,
    LectureList,
    CommonList,
  },
  props: {
    // 访问的用户 ID
    userId: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
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
    activeTab: '点评',
    /** 点评列表 */
    ratingList: [] as CardRatingItem[],
    /** 回复列表 */
    commentList: [] as CardCommentItem[],
    /** 课程列表 */
    lectureList: [] as CardLectureItem[],
    /** 收藏列表 */
    starList: [] as CardCommonItem[],
    /** 关注列表 */
    watchList: [] as CardCommonItem[],
    /** 足迹列表 */
    historyList: [] as CardCommonItem[],
  }),
  computed: {
    // 自己的用户数据
    ...mapState(['user']),
    ...mapGetters(['userLoggedIn']),
  },
  created() {
    userClient
      .getUserInfo({ userId: this.userId || this.user.id })
      .then((resp) => {
        this.userProfile = resp;
      })
      .catch(() => {
        // 返回到上一页面
        this.$router.go(-1);
      });
    rateClient.getRatingListByUser({ userId: this.user.id }).then((resp) => {
      this.ratingList = resp.data;
    });
    commentClient.getCommentList({ userId: this.user.id }).then((resp) => {
      this.commentList = resp.data;
    });
    // FIXME: 等待 Selects API完成后进行替换
    // lectureClient.getSelectList({ userId: this.user.id, limit: 20 }).then((resp) => {
    //   this.lectureList = resp.data;
    // });
    starClient.getStarList({ userId: this.user.id, limit: 20 }).then((resp) => {
      this.starList = resp.data;
    });
    if (this.isCurrentUser()) {
      watchClient.getWatchList({ userId: this.user.id, limit: 20 }).then((resp) => {
        this.watchList = resp.data;
      });
      historyClient.getHistoryList({ userId: this.user.id, limit: 20 }).then((resp) => {
        this.historyList = resp.data;
      });
    }
  },
  methods: {
    ...mapMutations({ vuexLogout: 'logout' }),
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
  overflow-y: auto;

  .text-dark {
    color: $gray2;
  }

  .text-light {
    color: $gray3;
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

<style lang="scss">
.content-box > .white-card > .main-box > .f-tabs {
  .f-tabs__header {
    height: 29px;
    padding: 13px 15px;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
  }

  .f-tabs__tab {
    padding: 2px 8px 3px 8px;
    color: #aaadb3;
    border: 1px solid #e0e0e0;
    border-radius: 100px;

    &.f-tabs__tab--active {
      color: #fff;
    }
  }

  .list-card {
    margin-bottom: 8px;
  }
}
</style>
