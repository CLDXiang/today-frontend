<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar size="80" color="grey">
        <img :src="processAvatar(user.avatar)" alt="avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ user.nickName||'Anonymous' }}
        </v-list-item-title>
        <v-list-item-subtitle> 登录名：{{ user.name }} </v-list-item-subtitle>
        <v-list-item-subtitle> 个性签名：{{ user.bio||'这个人还没有个性签名哦' }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-tabs center-active grow show-arrows>
      <v-tabs-slider />
      <v-tab href="#tab-1">
        关注课程 {{ countUserStar }}
      </v-tab>
      <v-tab-item value="tab-1">
        <!-- <v-card flat tile> -->
        <v-list two-line>
          <div v-for="(lecture, index) in star" :key="lecture.id">
            <v-list-item :to="`/lecture/${lecture.code}/${lecture.idx}`">
              <v-list-item-content>
                <v-list-item-title v-text="`${lecture.code}.${lecture.idx} ${lecture.name}`" />
                <v-list-item-subtitle v-text="lecture.teacher" />
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index + 1 < star.length" :key="index" />
          </div>
        </v-list>
        <!-- </v-card> -->
      </v-tab-item>
      <v-tab href="#tab-2">
        我的评课 {{ countUserRate }}
      </v-tab>
      <v-tab-item value="tab-2">
        <v-card flat tile>
          <v-list three-line>
            <template v-for="(item, index) in rate">
              <!-- TODO: 路由的目标不对 -->
              <v-list-item
                :key="item.lectureId"
                :to="`/lecture/${item.code}/${item.idx}`"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${item.name} · ${item.teacher}`"
                  />
                  <v-list-item-subtitle v-text="item.content" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.time" />
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < rate.length" :key="index" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-3">
        关注的人 {{ countFollowing }}
      </v-tab>
      <v-tab-item value="tab-3">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(item, index) in profile.following">
              <v-list-item :key="item.id" :to="`/user/${item.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(item.avatar)" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="item.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.following.length" :key="index" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-4">
        我的粉丝 {{ countFollower }}
      </v-tab>
      <v-tab-item value="tab-4">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(item, index) in profile.follower">
              <v-list-item :key="item.nickName" :to="`/user/${item.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(item.avatar)" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="item.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.follower.length" :key="index" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-5">
        浏览历史 {{ countHistory }}
      </v-tab>
      <v-tab-item value="tab-5">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(item, index) in history">
              <v-list-item
                :key="item.lectureId"
                :to="`/rate/${item.code}/${item.idx}`"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${item.code}.${item.idx} ${item.name}`"
                  />
                  <v-list-item-subtitle v-text="item.teacher" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.time" />
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="index + 1 < history.length" :key="index" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-6">
        通知动态 {{ countNotification }}
      </v-tab>
      <v-tab-item value="tab-6">
        <v-card flat tile />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import getLectureById from '../../utils/lecture';
import renderTime from '../../utils/time';

export default {
  data: () => ({
    rate: [],
    star: [],
    history: [],
  }),
  computed: {
    ...mapState(['user', 'profile']),
    ...mapGetters([
      'countUserRate',
      'countUserStar',
      'countFollower',
      'countFollowing',
      'countHistory',
      'countNotification',
    ]),
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '个人主页');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.profile.userRate.forEach((element) => {
        const time = { time: renderTime(element.createdAt) };
        this.rate.push({
          ...getLectureById(element.lectureId),
          ...element,
          ...time,
        });
      });
      this.profile.userStar.forEach((element) => {
        this.star.push(getLectureById(element.lecture_id));
      });
      this.$store.state.profile.history.forEach((element) => {
        const time = { time: renderTime(element.created_at) };
        this.history.push({
          ...getLectureById(element.history_about_id),
          ...time,
        });
      });
    },
    processAvatar(originAvatar) {
      if (originAvatar.substring(originAvatar.length - 18) === 'default_avatar.png') {
        // eslint-disable-next-line global-require
        return require('../../assets/default_avatar.png');
      }
      return originAvatar;
    },
  },
};
</script>

<style></style>
