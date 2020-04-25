<template>
  <div>
    <div class="container">
      <main class="mark">
        <h3>{{ lecture.name }}</h3>

        <div class="rating-bar">
          <rate-picker :value="Math.round(score)" readonly />
          <span class="rating-score">{{ score }}</span>
          <div class="rating-fav">
            <span class="rating-fav-cnt">{{ favorCount }}</span>
            <svg-switch v-model="favored" variant="heart" />
          </div>
        </div>

        <p>本门课程是「{{ lecture.depart }}」的课程，授课老师为「{{ lecture.teacher }}」，学分数为「{{ lecture.credit }}」</p>

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
        </div>


        <h4 class="comment-title">
          点评<span class="comment-count">{{ rateCount }}</span>
          <v-btn color="primary" style="margin-left: auto;" @click="routeToRate">
            撰写点评
          </v-btn>
        </h4>


        <div
          v-infinite-scroll="loadNextRateBatch"
          infinite-scroll-disabled="loadingRates"
          infinite-scroll-distance="10"
        >
          <div
            v-for="rate in rates"
            :key="rate.id"
            class="rate-item"
          >
            <div class="rate-title">
              <div class="rate-title-avatar">
                <img class="rate-title-avatar__img" :src="rate.avatar">
              </div>
              <div class="rate-title-info">
                <div class="rate-title-info__author">
                  {{ rate.author }}
                </div>
                <div class="rate-title-info__time">
                  {{ rate.time }}
                </div>
              </div>
              <div class="rate-title-reply">
                <div v-if="rate.replies" class="rate-title-reply__cnt">
                  {{ rate.replies.length }}人回复
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
              @activate="postReaction(`rate${rate.id}`, $event)"
              @deactivate="deleteReaction(`rate${rate.id}`, $event)"
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
              <v-btn color="primary" class="rate-input__btn" @click="postReply(rate.id, rate.input)">
                发表回复
              </v-btn>
            </div>

            <div v-if="rate.openReplies && rate.replies" class="rate-reply">
              <div v-for="reply in rate.replies" :key="reply.id" class="rate-reply__item">
                <div class="rate-title">
                  <div class="rate-title-avatar">
                    <img class="rate-title-avatar__img" :src="reply.avatar">
                  </div>
                  <div class="rate-title-info">
                    <div class="rate-title-info__author">
                      {{ reply.author }}
                    </div>
                    <div class="rate-title-info__time">
                      {{ reply.time }}
                    </div>
                  </div>
                </div>

                <div class="rate-content">
                  <p>{{ reply.content }}</p>
                </div>

                <my-picker
                  class="rate-action"
                  @activate="postReaction(`reply${reply.id}`, $event)"
                  @deactivate="deleteReaction(`reply${reply.id}`, $event)"
                />
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
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import log from '../../utils/log';

import MyPicker from './EmojiPicker.vue';
import SvgSwitch from './SvgSwitch.vue';
import RatePicker from './RatePicker.vue';

import {
  getLectureRateInfo,
  getReplies,
  getRateBatch,
  postReaction,
  deleteReaction,
} from '../../services/rate';
import { lectures, getLectureByCodeAndIdx } from '../../services/lecture';

export default {
  directives: {
    infiniteScroll,
  },
  components: {
    SvgSwitch,
    MyPicker,
    RatePicker,
  },
  data() {
    return {
      // For UI control
      loadingRates: false,

      lecture: {},

      favorCount: 3,
      favored: true,

      difficultyName: '噩梦',
      gradingName: '善良',
      workloadName: '巨多',
      score: 3.2,
      rateCount: '99+',
      tags: [
        { name: '五学分' },
        { name: '简单', color: 'rgba(0, 167, 90, .8)' },
        { name: '中等工作量', color: 'rgba(0, 0, 0, .6)' },
      ],
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      relatedProfessors: [{ teacher: 'foo', route: '/lecture/x/1' }],
      relatedLectures: [{ name: 'foo', route: '/lecture/x/2' }],

      rateBatchSize: 10, // scroll down and load rates in batch
      rateOrder: 'default', // by time

      rates: [
        {
          id: 1, // rate id
          author: '小明',
          avatar: 'https://img.icons8.com/offices/80/000000/user.png',
          time: '一天前',
          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          replyCnt: 2,
          input: '',
          openReplies: false,
          replies: [
            {
              id: 1,
              author: 'Tom',
              time: '一个月前',
              avatar: 'https://img.icons8.com/offices/80/000000/user.png',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
              id: 2,
              author: 'Tom',
              time: '一个月前',
              avatar: 'https://img.icons8.com/offices/80/000000/user.png',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
          ],
        },
        {
          id: 2, // rate id
          author: '小明',
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
        this.fetchData();
      }
    },
    favored(checked) {
      if (checked) {
        this.postReaction(`lecture${this.lecture.id}`, 'favor');
        this.favorCount += 1;
      } else {
        this.deleteReaction(`lecture${this.lecture.id}`, 'favor');
        this.favorCount -= 1;
      }
    },
  },
  created() {
    this.fetchData();
    // log.info("created");
  },
  methods: {
    routeToRate() {
      this.$router.push(`${this.$route.path}/rate`);
    },
    fetchData() {
      // log.info(this.$route.params.code, this.$route.params.idx);
      log.info('fetchData');

      this.lecture = getLectureByCodeAndIdx(this.$route.params.code, this.$route.params.idx);
      // log.info(this.lecture);

      this.relatedProfessors = lectures
        .filter((data) => {
          return data.name === this.lecture.name && data.id !== this.lecture.id;
        })
        .map((data) => {
          return { teacher: data.teacher, route: `/lecture/${data.code}/${data.idx}` };
        });
      this.relatedLectures = lectures
        .filter((data) => {
          return data.teacher.includes(this.lecture.teacher) && data.id !== this.lecture.id;
        })
        .map((data) => {
          return { name: data.name, route: `/lecture/${data.code}/${data.idx}` };
        });

      log.info(this.lecture);
      getLectureRateInfo(this.lecture.id).then((resp) => {
        log.info(resp);
      });

      // this.switchRateOrder();
    },

    // Rates
    switchRateOrder() {
      this.rates = [];
      this.loadNextRateBatch();
    },
    loadNextRateBatch() {
      // load rates in batch when scroll down
      this.loadingRates = true;

      getRateBatch(this.lecture.id, this.rates.length, this.rateBatchSize, this.rateOrder)
        .then((resp) => {
          resp.forEach((data) => {
            this.rate.push({
              id: data.id,
              author: data.author,
              avatar: data.avatar,
              time: data.time,
              content: data.content,
              replyCnt: data.reply_cnt,
              input: '',
              openReplies: false,
            });
          });
          if (resp.length < this.rateBatchSize) this.loadingRates = false;
        })
        .catch((e) => {
          log.info(e.name, e.message);
        });
    },

    // Reply
    postReply(id, content) {
      if (this.$store.state.user.jwt_token === '') {
        this.$router.push('/login?go=-1');
        this.$toast.warn('请您先登录');
      }
      log.info(id, content);
    },
    handleOpenReplies(rrate, open) {
      const rate = rrate;
      rate.openReplies = open;
      if (open && rate.replies === undefined) {
        log.info('open');
        getReplies(rate.id)
          .then((resp) => {
            rate.replies = resp;
          })
          .catch((e) => {
            log.info(e);
          });
      }
    },

    // Reaction and Favor
    postReaction(target, reaction) {
      postReaction(target, reaction)
        .then((resp) => {
          log.info(resp);
        })
        .catch((e) => {
          log.info(e);
        });
    },
    deleteReaction(target, reaction) {
      deleteReaction(target, reaction)
        .then((resp) => {
          log.info(resp);
        })
        .catch((e) => {
          log.info(e);
        });
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

.container {
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

.nav-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  @include portrait {
    padding: 1rem;
  }
}
.nav-container__inner {
  --padding--landscape: 0 3rem 0 0;
}
.nav-section__title {
  margin-bottom: 0.13em !important;
}
.nav-section__subtitle {
  opacity: 0.6;
}

.tag-container {
  display: flex;
  font-size: 0.8em;
  > button {
    margin-right: 1em;
  }
}
.intro-paragraph {
  margin-bottom: 0;
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

// Rate List
.rate-item {
  margin-bottom: 2rem;
}
.rate-title {
  $spacing: 1rem;
  $img-size: 3rem;

  display: flex;
  > .rate-title-avatar {
    height: $img-size;
    > .rate-title-avatar__img {
      width: $img-size;
      height: $img-size;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.08);
    }
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

  > .rate-reply__item {
    margin-top: 2rem;
  }
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

  margin-left: 0 !important;
  margin-right: 0 !important;
  @include portrait {
    background: rgba(0, 0, 0, 0.04);
  }

  > .status-item {
    @include portrait {
      flex-basis: 1;
      flex-grow: 1;
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
}

a {
  color: inherit !important;
  text-decoration: none;
}
</style>
