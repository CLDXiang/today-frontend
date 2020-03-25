<template>
  <div>
    <sign-in />
    <sign-up />
    <reply id="discuss" />
    <base-layout>
      <main>
        <div class="mark main-container responsive-padding responsive-width">
          <h3>{{ info.name }}</h3>

          <RatePicker />

          <div class="tag-container">
            <!-- TODO: customize button style -->
            <button v-for="tag in info.tags" v-bind:key="tag.id" class="light">
              {{ tag.name }}
            </button>
          </div>

          <p class="intro-paragraph">{{ info.intro }}</p>
          <div class="action-bar responsive-padding responsive-border">
            <svg-set variant="edit" class="action-switch--edit" />
            <svg-set variant="heart" class="action-switch--fav" />
          </div>

          <h4 class="comment-title">
            Comments<span class="comment-count">{{ info.rateCount }}</span>
          </h4>

          <div class="rate-list">
            <div
              v-for="rate in rates"
              v-bind:key="rate.id"
              class="responsive-margin responsive-padding responsive-border-radius responsive-background"
            >
              <p class="rate-content">{{ rate.content }}</p>
              <div class="rate-action-bar">
                <span class="rate-action__author">{{ rate.author }}</span>
                <span class="rate-action__time">{{ rate.time }}</span>
                <a class="rate-action__fav link">Like</a>
                <a class="link" href="#discuss">Reply</a>
                <!-- <a class="link" @click="$router.push('reply#discuss')">Reply</a> -->
              </div>
            </div>
          </div>
        </div>

        <nav class="nav-container">
          <div class="mark nav-container-inner">
            <h4 class="nav-section__title">More Professors</h4>
            <p class="nav-section__subtitle">
              Professors that related to this cource
            </p>
            <div class="list">
              <div v-for="p in relatedProfessors" v-bind:key="p.id">
                <a class="link">{{ p.name }}</a>
              </div>
            </div>

            <h4 class="nav-section__title">More Courses</h4>
            <p class="nav-section__subtitle">Other courses of the professor</p>
            <div class="list">
              <div v-for="c in relatedCourses" v-bind:key="c.id">
                <a class="link">{{ c.name }}</a>
              </div>
            </div>
          </div>
        </nav>
      </main>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from './common/BaseLayout.vue';
import SignIn from './common/SignIn.vue';
import SignUp from './common/SignUp.vue';
import RatePicker from './common/RatePicker.vue';
import Reply from './Reply.vue';
import SvgSet from './SvgSet.vue';

export default {
  components: {
    BaseLayout,
    SignIn,
    SignUp,
    RatePicker,
    Reply,
    SvgSet,
  },
  data() {
    return {
      info: {
        name: 'Introduction to Algorithm',
        fav: 13,
        score: 9.9,
        rateCount: '99+',
        tags: [{ id: 1, name: 'Naive' }, { id: 2, name: 'Medium Workload' }],
        intro:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      relatedProfessors: [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }],
      relatedCourses: [
        { id: 1, name: 'Math' },
        { id: 2, name: 'Chinese' },
        { id: 3, name: 'English' },
      ],
      rates: [
        {
          id: 1,
          author: 'Airey',
          time: '',
          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
          id: 2,
          author: 'Airey',
          time: '',
          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
          id: 3,
          author: 'Airey',
          time: '',
          content:
            'Lorem   m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/config.scss';

.main-container {
  --padding--landscape: 0 3rem 0 3rem;
  --padding--portrait: 0 0 0 0;
}

.nav-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.nav-container__inner {
  --padding--landscape: 0 3rem 0 0;
}
.nav-section__title {
  margin-bottom: 0.13em;
}
.nav-section__subtitle {
  opacity: 0.6;
}

.course-name {
  font-size: 1.9em;
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
.action-bar {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin: 0;
  --padding--landscape: 2rem 0 0 0;
  --padding--portrait: 1.4rem 1rem 1.6rem 1rem;
  --border--portrait: 1px solid rgba(0, 0, 0, 0.12);
  border-top: none;
  border-left: none;
  border-right: none;
}
.action-switch--edit {
  margin-left: auto;
  margin-right: 1rem;
}
.action-switch--fav {
  margin-right: 0.7rem;
}

.comment-title {
  margin-bottom: 0;
}
.comment-count {
  font-size: 0.6em;
  margin-left: 1rem;
}
.rate-list {
  margin: 0;
  --opacity: 0.38;
  --opacity--hover: 0.6;
  --margin--landscape: 1.5rem 0;
  --padding--landscape: 1.2rem 1.4rem 1.5rem 1.4rem;
  --border-radius--landscape: 0.6em;
  --background--landscape: rgba(0, 0, 0, 0.03);
  --margin--portrait: 0;
  --padding--portrait: 1rem 1rem 1rem 1rem;
  --border-radius--portrait: 0;
  --background--portrait: transparent;
}
.rate-content {
  margin: 0;
}
.rate-action-bar {
  display: flex;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 0.8rem;
}
.rate-action__author {
  margin-right: 1rem;
}
.rate-action__time {
  opacity: var(--opacity);
}
.rate-action__fav {
  margin-left: auto;
  margin-right: 1rem;
}
</style>
