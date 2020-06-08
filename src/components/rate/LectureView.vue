<template>
  <div>
    <div class="skeleton-loader-container">
      <transition name="fade" mode="out-in" @before-enter="scrollToTop">
        <!-- main's skeleton loader -->
        <div v-if="loadingLecture" key="1" class="container--skeleton">
          <main class="mark">
            <h3 class="skeleton-loader">
              ac
            </h3>
            <div>
              <div class="skeleton-loader" style="max-width: 40em; margin-bottom: 1em;">
                wa
              </div> 
              <div class="skeleton-loader" style="max-width: 40em; margin-bottom: 1em;">
                wa
              </div> 
              <div class="skeleton-loader" style="max-width: 40em; margin-bottom: 1em;">
                wa
              </div> 
              <div class="skeleton-loader" style="max-width: 35em; margin-bottom: 1em;">
                wa
              </div> 
            </div>
          </main>

          <nav class="nav-container">
            <div class="mark nav-container-inner">
              <h4 class="skeleton-loader">
                wa
              </h4>
              <div>
                <div class="skeleton-loader" style="max-width: 5em; margin-bottom: 1em;">
                  wa
                </div> 
                <div class="skeleton-loader" style="max-width: 5em; margin-bottom: 1em;">
                  wa
                </div> 
                <div class="skeleton-loader" style="max-width: 5em; margin-bottom: 1em;">
                  wa
                </div> 
              </div>
            </div>
          </nav>
        </div>

        <!-- main -->
        <div v-else key="2" class="container">
          <main id="lecture-main" class="mark">
            <h3>{{ lecture.name }}</h3>
            <div class="rating-bar">
              <rate-picker :value="Math.round(score)" readonly />
              <span class="rating-score">{{ score }}</span>
              <div class="rating-fav">
                <span class="rating-fav-cnt">{{ favorCount }}</span>
                <svg-switch variant="heart" :value="favored" @input="syncFavor($event)" />
              </div>
            </div>

            <p>
              本门课程是「{{ lecture.depart }}」的课程，授课老师为「{{ lecture.teacher }}」，学分数为「{{ lecture.credit }}」
            </p>

            <div class="post-button portrait-only">
              <v-btn color="primary" @click="routeToRate">
                撰写点评
              </v-btn>
            </div>

            <div class="status-container">
              <div class="status-item">
                <div class="status-item__level">
                  {{ difficultyName }}
                </div>
                <div class="status-item__title">
                  难易程度
                </div>
              </div>

              <div class="status-item">
                <div class="status-item__level">
                  {{ gradingName }}
                </div>
                <div class="status-item__title">
                  给分好坏
                </div>
              </div>

              <div class="status-item">
                <div class="status-item__level">
                  {{ workloadName }}
                </div>
                <div class="status-item__title">
                  工作量大小
                </div>
              </div>

              <div class="landscape-only status-action">
                <v-btn color="primary" @click="routeToRate">
                  撰写点评
                </v-btn>
              </div>
            </div>


            <h4 class="comment-title">
              点评<span class="comment-count">{{ rateCount }}</span>
              <v-select
                v-model="sort"
                solo
                dense
                style="max-width: 10rem;"
                class="comment-sort"
                :items="sortChoices"
                :disabled="loadingRates"
              />
            </h4>


            <div ref="rateList" class="rate-list">
              <div
                v-for="rate in rates"
                :key="rate.id"
                class="rate-item"
              >
                <div class="rate-title">
                  <div class="rate-title-span">
                    <img
                      class="rate-title-avatar"
                      :src="rate.avatar"
                      @click="$router.push(`/user/${rate.userId}`)"
                      @mouseenter="getUserInfo(rate)"
                    >

                    <div class="rate-title-info">
                      <div class="rate-title-info__author">
                        {{ rate.userName }}
                      </div>
                      <div class="rate-title-info__time">
                        {{ rate.time }}
                      </div>
                    </div>

                    <div class="landscape-only rate-title-popup">
                      <template v-if="rate.userInfo.valid">
                        <p class="rate-title-user-intro">
                          {{ rate.userInfo.intro }}
                        </p>
                        <div class="rate-title-user-info">
                          <div>点评</div><div>回复</div><div>关注者</div>
                        </div>
                        <div class="rate-title-user-info">
                          <div>{{ rate.userInfo.nrates }}</div>
                          <div>{{ rate.userInfo.nreplies }}</div>
                          <div>{{ rate.userInfo.nfollowers }}</div>
                        </div>
                        <svg-switch class="rate-title-user-btn" variant="heart" :value="rate.userInfo.followed" @input="toggleFollow(rate, $event)" />
                      </template>

                      <template v-else>
                        <div class="rate-title-user-loader skeleton-loader-white" />
                      </template>
                    </div>
                  </div>

                  <div class="rate-title-reply">
                    <div v-if="rate.replyCnt > 0" class="rate-title-reply__cnt">
                      {{ rate.replyCnt }}人回复
                    </div>
                    <svg-switch
                      class="rate-title-reply__icon"
                      variant="edit" 
                      :value="rate.openReplies"
                      @input="handleOpenReplies(rate, $event)"
                    />
                  </div>
                </div>

                <div class="rate-content">
                  <p>{{ rate.content }}</p>
                </div>

                <my-picker
                  v-if="!rate.openReplies"
                  class="rate-action"
                  :items="rate.reactions"
                  :target="`rates ${rate.id}`"
                />

                <div
                  v-if="rate.openReplies"
                  class="rate-input"
                >
                  <v-textarea
                    v-model="rate.input"
                    rows="5"
                    class="rate-input__input"
                  />
                  <v-btn color="primary" class="rate-input__btn" @click="postReply('reply', rate)">
                    发表回复
                  </v-btn>
                </div>

                <div v-if="rate.openReplies && rate.replies" class="rate-reply">
                  <div v-for="reply in rate.replies" :key="reply.id" class="rate-reply__item">
                    <div class="rate-title">
                      <div class="rate-title-span">
                        <img
                          class="rate-title-avatar"
                          :src="reply.avatar"
                          @click="$router.push(`/user/${reply.userId}`)"
                          @mouseenter="getUserInfo(reply)"
                        >

                        <div class="rate-title-info">
                          <div class="rate-title-info__author">
                            {{ reply.userName }}
                          </div>
                          <div class="rate-title-info__time">
                            {{ reply.time }}
                          </div>
                        </div>

                        <div class="landscape-only rate-title-popup">
                          <template v-if="reply.userInfo.valid">
                            <p class="rate-title-user-intro">
                              {{ reply.userInfo.intro }}
                            </p>
                            <div class="rate-title-user-info">
                              <div>点评</div><div>回复</div><div>关注者</div>
                            </div>
                            <div class="rate-title-user-info">
                              <div>{{ reply.userInfo.nrates }}</div>
                              <div>{{ reply.userInfo.nreplies }}</div>
                              <div>{{ reply.userInfo.nfollowers }}</div>
                            </div>
                            <svg-switch class="rate-title-user-btn" variant="heart" :value="reply.userInfo.followed" @input="toggleFollow(reply, $event)" />
                          </template>

                          <template v-else>
                            <div class="rate-title-user-loader skeleton-loader-white" />
                          </template>
                        </div>
                      </div>
                    </div>

                    <div class="rate-content">
                      <p style="margin-bottom: 0;">
                        {{ reply.content }}
                      </p>
                    </div>

                    <!-- TODO support react to reply 
                    <!my-picker class="rate-action"
                      :target="`reply ${reply.id}`"
                    />
                    -->
                  </div>
                </div>
              </div>
            </div>
          </main>

          <nav class="nav-container">
            <div class="mark nav-container-inner">
              <h4 class="nav-section__title">
                其他老师
              </h4>
              <p class="nav-section__subtitle">
                其他老师的「{{ lecture.name }}」
              </p>
              <div class="list">
                <div v-for="p in relatedProfessors" :key="p.route">
                  <router-link class="link" :to="p.route">
                    {{ p.teacher }}
                  </router-link>
                </div>
              </div>

              <h4 class="nav-section__title">
                其他课程
              </h4>
              <p class="nav-section__subtitle">
                「{{ lecture.teacher }}」老师的其他课程
              </p>
              <div class="list">
                <div v-for="c in relatedLectures" :key="c.route">
                  <router-link class="link" :to="c.route">
                    {{ c.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import log from '../../utils/log';

import MyPicker from './EmojiPicker.vue';
import SvgSwitch from './SvgSwitch.vue';
import RatePicker from './RatePicker.vue';

import {
  getLectureRateInfo,
  getReplies,
  getRateIds,
  getRateBatch,
  getUserInfo,
  postFollow,
  deleteFollow,
  postReply,
} from '../../services/rate';

import {
  getFollowing,
  getUserStar,
  // getUserReply
} from '../../services/profile.service';

import { postReaction, deleteReaction } from '../../services/react';

import { initLecture, lectures, getLectureByCodeAndIdx } from '../../services/lecture';

export default {
  components: {
    SvgSwitch,
    MyPicker,
    RatePicker,
  },
  data() {
    return {
      // For UI control
      loadingLecture: true,
      loadingRates: false,
      sort: 'default',
      sortChoices: [
        { text: '默认排序', value: 'default' },
        { text: '按赞同数排序', value: 'upvote' },
        { text: '按回复数排序', value: 'reply' },
      ],

      lecture: {},

      favorCount: 3,
      favored: '',

      rateCount: '99+',
      rateIds: [],
      rateValidTil: -1,
      rateBatchSize: 1, // scroll down and load rates in batch
      rateOrder: 'default', // by time

      difficultyName: '噩梦',
      gradingName: '善良',
      workloadName: '巨多',
      score: 3.2,

      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      relatedProfessors: [{ teacher: 'foo', route: '/lecture/x/1' }],
      relatedLectures: [{ name: 'foo', route: '/lecture/x/2' }],

      rates: [
        {
          id: 1, // rate id
          userName: '小明',
          userId: 1,
          avatar: 'https://img.icons8.com/offices/80/000000/user.png',
          time: '一天前',

          userInfo: {
            intro:
              'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            nrates: 1234,
            nreplies: 12,
            nfollowers: 12,
            followed: false,
          },

          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          replyCnt: 2,
          input: '',
          openReplies: false,
          replies: [
            {
              id: 1,
              userId: 1,
              userName: 'Tom',
              time: '一个月前',
              avatar: 'https://img.icons8.com/offices/80/000000/user.png',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
              id: 2,
              userId: 1,
              userName: 'Tom',
              time: '一个月前',
              avatar: 'https://img.icons8.com/offices/80/000000/user.png',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
          ],
        },
        {
          id: 2, // rate id
          userId: 1,
          userName: '小明',
          userInfo: false,
          avatar: 'https://img.icons8.com/offices/80/000000/user.png',
          time: '一天前',
          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          input: '',
          openReplies: false,
        },
      ],
    };
  },

  watch: {
    $route() {
      // won't fetch data when routing out of this page
      if (this.$route.params.code !== undefined && !this.$route.path.endsWith('rate')) {
        this.refresh();
      }
    },
    sort(val) {
      this.switchRateOrder(val);
    },
  },

  async created() {
    await initLecture();
    this.refresh();
  },
  mounted() {
    this.throttledHandleScroll = throttle(this.handleScroll, 300);
    window.addEventListener('scroll', this.throttledHandleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0 });
    },
    handleScroll() {
      const minDistance = 200;
      if (this.$refs.rateList) {
        const toWindowBottom =
          this.$refs.rateList.getBoundingClientRect().bottom - window.innerHeight;
        if (!this.loadingRates && toWindowBottom < minDistance) {
          this.loadNextRateBatch();
        }
      }
    },
    routeToRate() {
      this.$router.push(`${this.$route.path}/rate`);
    },
    requireLogin() {
      this.$message.warn('请您先登录');
      this.$router.push(`/login?redirect=${this.$route.path}`);
    },
    requireNetwork() {
      this.$message.error('无法连接网络');
    },

    refresh() {
      log.info('refresh');
      this.loadingLecture = true;

      this.lecture = getLectureByCodeAndIdx(this.$route.params.code, this.$route.params.idx);

      this.relatedProfessors = lectures
        .filter((data) => {
          return data.name === this.lecture.name && data.id !== this.lecture.id;
        })
        .map((data) => {
          return { teacher: data.teacher, route: `/lecture/${data.code}/${data.idx}` };
        });

      this.relatedLectures = lectures
        .filter((data) => {
          return (
            data.teacher.split(', ').includes(this.lecture.teacher) && data.id !== this.lecture.id
          );
        })
        .map((data) => {
          return { name: data.name, route: `/lecture/${data.code}/${data.idx}` };
        });

      getLectureRateInfo(this.lecture.id)
        .then((resp) => {
          this.favorCount = resp.favorCount;
          this.favored = resp.favored;
          this.rateCount = resp.rateCount;
          this.difficultyName = resp.difficultyName;
          this.gradingName = resp.gradingName;
          this.workloadName = resp.workloadName;
          this.score = resp.score;

          this.loadingLecture = false;
        })
        .catch((e) => {
          log.info(e);

          // setTimeout(() => {
          this.loadingLecture = false;
          // }, 1000);
        });

      this.switchRateOrder();
    },

    // Rates
    switchRateOrder(order) {
      log.info('switch rate order', order);
      this.loadingRates = true;
      this.rates = [];
      getRateIds(this.lecture.id, order)
        .then((resp) => {
          this.rateIds = resp.rateIds;
          this.rateValidTil = 0;
          this.loadingRates = false;
          this.loadNextRateBatch();
        })
        .catch((e) => {
          log.info(e);
          this.loadingRates = false;
        });
    },
    loadNextRateBatch() {
      // load rates in batch when scroll down
      if (this.loadingRates) return;
      this.loadingRates = true;
      const nextIdsAndDeleted = this.rateIds.slice(
        this.rateValidTil,
        this.rateValidTil + this.rateBatchSize,
      );
      const nextIds = nextIdsAndDeleted.map((d) => d.id);
      if (nextIds.length === 0) {
        this.loadingRates = false;
        return;
      }
      log.info(nextIds);
      const id2deleted = new Map(nextIdsAndDeleted.map((d) => [d.id, d.deleted]));

      getRateBatch(nextIds)
        .then((resp) => {
          resp.forEach((data) => {
            this.rates.push({
              id: data.id,
              deleted: id2deleted.get(data.id),
              userName: data.userName,
              userId: data.userId,
              avatar: data.avatar,
              time: data.time,
              content: data.content,
              replyCnt: data.replyCnt,
              replyIds: data.replyIds,
              reactions: data.reactions,
              input: '',
              openReplies: false,
              replies: [],
              userInfo: { valid: false, followed: false },
            });
            this.rateValidTil += 1;
          });
          this.loadingRates = false;
          this.throttledHandleScroll();
        })
        .catch((e) => {
          log.info(e);
          this.loadingRates = false;
        });
    },

    getUserInfo(thread) {
      const u = thread.userInfo;
      if (!u.valid) {
        getUserInfo(thread.userId)
          .then((resp) => {
            log.info(resp);
            u.valid = true;
            u.intro = resp.intro;
            u.nrates = resp.nrates;
            u.nfollowers = resp.nfollowers;
            u.nreplies = resp.nreplies;
            u.followed = resp.followed;
          })
          .catch((e) => {
            log.info(e);
          });
      }
    },

    // Follow
    updateFollow() {
      getFollowing(this.$store.state.user.id)
        .then((myFollowing) => {
          this.$store.commit('SET_FOLLOWING', myFollowing);
          log.info('my follower', myFollowing);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    toggleFollow(rthread, follow) {
      if (this.$store.state.user.jwt_token === '') {
        this.requireLogin();
        return;
      }

      const thread = rthread;
      thread.userInfo.followed = follow;
      log.info(follow);
      if (follow) {
        postFollow(thread.userId)
          .then((resp) => {
            log.info(resp);
            this.updateFollow();
          })
          .catch((e) => log.info(e));
      } else {
        deleteFollow(thread.userId)
          .then((resp) => {
            log.info(resp);
            this.updateFollow();
          })
          .catch((e) => log.info(e));
      }
    },

    // Reply
    updateReply() {
      // FIXME
      log.info('TODO: update reply in vuex');
      /*
      getUserReply(this.$store.state.user.id)
        .then((data) => {
          this.$store.commit('SET_USER_REPLY', data);
          log.info('my star', data);
        })
        .catch((err) => {
          log.info(err);
        });
      */
    },
    postReply(type, ritem) {
      const item = ritem;
      const { id } = item;
      const content = item.input;
      if (this.$store.state.user.jwt_token === '') {
        this.requireLogin();
      } else if (content === '') {
        this.$message.warn('请您输入非空白字符哦');
      } else {
        item.input = '';
        postReply(type, id, content)
          .then((data) => {
            log.info(data);
            item.replies.push({
              id: data.id,
              userName: data.userName,
              userId: data.userId,
              content: data.content,
              time: data.time,
              avatar: data.avatar,
              reactions: [],
              userInfo: { valid: false, followed: false },
            });
            this.updateReply();
          })
          .catch((e) => {
            log.info(e);
            // this.requireNetwork();
          });
      }
    },
    handleOpenReplies(rrate, open) {
      const rate = rrate;
      rate.openReplies = open;
      if (open && rate.replies.length === 0) {
        log.info('open');
        if (rate.replyCnt > 0) {
          const id2deleted = new Map(rate.replyIds.map((d) => [d.id, d.deleted]));
          getReplies(rate.replyIds.map((d) => d.id))
            .then((d) => {
              d.forEach((data) => {
                rate.replies.push({
                  id: data.id,
                  deleted: id2deleted.get(data.id),
                  userName: data.userName,
                  userId: data.userId,
                  avatar: data.avatar,
                  time: data.time,
                  content: data.content,
                  reactions: data.reactions,
                  userInfo: { valid: false, followed: false },
                  // replyCnt: data.replyCnt,
                  // replyIds: data.replyIds,
                  // input: "",
                  // openReplies: false,
                });
              });
            })
            .catch((e) => log.info(e));
        }
      }
    },

    // Favor/Star
    updateStar() {
      getUserStar(this.$store.state.user.id)
        .then((data) => {
          this.$store.commit('SET_USER_STAR', data);
          log.info('my star', data);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    syncFavor(checked) {
      this.favored = checked;
      if (checked) {
        this.favorCount += 1;
        postReaction(`lecture ${this.lecture.id}`, 'favor')
          .then(() => {
            this.updateStar();
          })
          .catch((e) => {
            if (e.response.status === 401) this.requireLogin();
            // this.favorCount -= 1;
            // this.favored = false;
          });
      } else {
        this.favorCount -= 1;
        deleteReaction(`lecture ${this.lecture.id}`, 'favor')
          .then(() => {
            this.updateStar();
          })
          .catch((e) => {
            if (e.response.status === 401) this.requireLogin();
            // this.favorCount += 1;
            // this.favored = true;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/utils.scss';
@import '../../scss/mark.scss';

.mark {
  @include mark;
}
.list {
  > div {
    margin-bottom: 0.6em;
  }
}

.portrait-only {
  @include landscape {
    display: none !important;
  }
}
.landscape-only {
  @include portrait {
    display: none !important;
  }
}

// Animation
.fade-leave-active {
  transition: opacity 0.2s 0.2s;
}
.fade-enter-active {
  transition: opacity 0.2s 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes loader {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.skeleton-loader {
  @include skeleton-loader(loader);
  @include no-select;
  color: rgba(0, 0, 0, 0) !important;
}
.skeleton-loader-white {
  @include skeleton-loader(loader, true);
  @include no-select;
}
h3.skeleton-loader,
h4.skeleton-loader {
  max-width: 5em;
}

.container,
.container--skeleton {
  display: flex;
  flex-direction: row;
  padding: 3rem 2rem;

  > main {
    margin-right: 2rem;
    max-width: 61.8%;
    width: 100%;
    flex-shrink: 0;
  }

  @include portrait() {
    flex-direction: column;
    padding: 1rem 0;
    > main {
      margin-right: 0;
      max-width: 100vw;
    }
  }
}
.container--skeleton {
  min-height: calc(100vh - 3rem);
  @include portrait {
    min-height: auto;
  }
}

.nav-container {
  flex-grow: 1;
  padding-left: 0 !important;
  padding-right: 0 !important;
  @include portrait {
    padding: 1rem;
  }
}
.nav-section__title {
  margin-bottom: 0.13em !important;
}
.nav-section__subtitle {
  opacity: 0.6;
}

.rating-bar {
  display: flex;
  align-items: flex-end;
  > .rating-score {
    margin-left: 0.3em;
  }
  > .rating-fav {
    margin-left: auto;
    display: flex;
    align-items: center;
    > .rating-fav-cnt {
      margin-right: $small-spacing;
      opacity: $active-opacity;
    }
  }
}

.post-button {
  display: flex;
  > * {
    margin-left: auto;
  }
}

.comment-title {
  display: flex;
  > button {
    font-size: 0.8rem;
  }
}
.comment-count {
  font-size: 0.6em;
  margin-left: 1rem;
}
.comment-sort {
  margin-left: auto;
  font-size: 0.9rem !important;
  align-self: center;
}

// Rate List
.rate-list {
  > .rate-item > .rate-reply > .rate-reply__item {
    margin-top: 1rem;
  }

  @include portrait {
    margin: 0 0 1rem 0 !important;
    > .rate-item {
      > .rate-title,
      > .rate-content,
      > .rate-action,
      > .rate-input {
        margin-left: 1rem;
        margin-right: 1rem;
      }
      > .rate-action {
        width: auto;
      }
      > .rate-reply {
        $shift: -1.3em;
        margin-top: $shift;
        background: rgba(0, 0, 0, 0.03);
        padding: 0 1rem 1rem 1rem;
      }
    }
  }
}
.rate-item {
  margin-bottom: 2rem;
}
.rate-title {
  $spacing: 1rem;
  $img-size: 3rem;

  display: flex;
  > .rate-title-span {
    height: $img-size;
    display: flex;
    position: relative;

    z-index: 0;
    transition: z-index 0s 0.7s;

    &:hover {
      z-index: 1;
      transition: z-index 0s 0.3s;
    }

    & > .rate-title-avatar:hover ~ .rate-title-popup,
    & > .rate-title-popup:hover {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.5s,
        transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s, visibility 0s 0s;
    }

    & > .rate-title-popup {
      box-shadow: 0px 0px 1em -0.5em rgba(0, 0, 0, $divider-opacity);
      visibility: hidden;
      opacity: 0;
      transform: translateX(1em);
      transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.3s,
        transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s, visibility 0s 1.3s;
    }

    > .rate-title-avatar {
      // https://css-tricks.com/almanac/properties/o/object-fit/
      object-fit: cover;
      cursor: pointer;
      width: $img-size;
      height: $img-size;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.08);
      margin-right: $spacing;
    }

    > .rate-title-info {
      > .rate-title-info__author,
      > .rate-title-info__time {
        height: $img-size/2;
        display: flex;
        align-items: flex-end;
        opacity: $active-opacity;
        font-size: 0.9em;
      }
    }

    > .rate-title-popup {
      position: absolute;
      left: $img-size + $spacing;
      width: 17em;
      top: 0;
      border: 1px solid rgba(0, 0, 0, $divider-opacity);
      border-radius: 0 1em 1em 1em;
      background: white;
      display: flex;
      flex-direction: column;

      > .rate-title-user-loader {
        height: 3em;
        border-radius: inherit;
      }

      > .rate-title-user-intro {
        opacity: $active-opacity;
        margin: 0 0 $spacing 0;
        padding: $spacing;
        border-bottom: 1px solid rgba(0, 0, 0, $divider-opacity);
      }
      > .rate-title-user-info {
        display: flex;
        width: 100%;
        opacity: $active-opacity;
        > div {
          flex-grow: 1;
          flex-basis: 0;
          flex-shrink: 0;
          text-align: center;
          padding: $spacing/4 0;
        }
      }
      > .rate-title-user-btn {
        margin: $spacing;
        align-self: flex-end;
      }
    }
  }

  > .rate-title-reply {
    margin-left: auto;
    display: flex;
    > .rate-title-reply__cnt {
      opacity: $active-opacity;
      font-size: 0.9em;
      align-self: flex-end;
      margin-right: $spacing;
    }
    > .rate-title-reply__icon {
      align-self: flex-end;
    }
  }
}

.rate-content {
  > p {
    margin: 1em 0;
  }
}
.rate-action {
  font-size: 0.8rem;
  margin-bottom: -2em;
}
.rate-input {
  display: flex;
  flex-direction: column;
  > .rate-input__input {
  }
  > .rate-input__btn {
    align-self: flex-end;
    margin-top: 1rem;
  }
}

.rate-reply {
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
}

// input for reply dialog
.rate-input-container {
  > button {
    margin-top: 1rem;
  }
}

.status-container {
  position: relative;
  display: flex;
  align-items: center;

  margin-left: 0 !important;
  margin-right: 0 !important;
  @include portrait {
    background: rgba(0, 0, 0, 0.04);
  }

  > .status-item {
    @include portrait {
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 0;
      padding: 1.4em 0;
    }
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1.4em;

    > .status-item__level {
      font-size: 1.4em;
    }
    > .status-item__title {
      opacity: $inactive-opacity;
      font-size: 0.8em;
      margin-top: 1.4em;
    }
  }
  > .status-action {
    margin-left: auto;
    padding: 1rem;
  }
}

a {
  color: inherit !important;
  text-decoration: none;
}
</style>
