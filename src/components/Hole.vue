<template>
  <v-container>
    <v-card class="d-flex pa-2 flex-column" flat>
      <v-card-title class="d-flex">
        <v-col>树洞</v-col>
        <v-col class="d-flex">
          <v-btn @click="editing = true" justify="end">新建</v-btn>
        </v-col>
      </v-card-title>
      <Post
        v-for="post in posts"
        :key="post.id"
        :content="post.content"
        :id="post.id"
        :created_at="post.created_at"
      >
        <v-btn @click="enter(post.id)">回复</v-btn>
      </Post>
      <v-dialog v-model="editing">
        <Editor mode="discussion" @close="editing = false" @created="create()"></Editor>
      </v-dialog>
    </v-card>
    <!-- <v-speed-dial
      v-model="fab"
      bottom="true"
      right="true"
      direction="top"
      open-on-hover="false"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon @click="this.editing = true">mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>-->
  </v-container>
</template>

<script>
import { getDiscussion, createDiscussion } from '../services/post.service.js';
import Post from './Post.vue';
import Editor from './Editor.vue';
import log from '../utils/log.js';
export default {
  components: { Post, Editor },
  data() {
    return {
      posts: [],
      fab: false,
      fling: false,
      write: false,
      inputContent: '',
      inputTitle: '',
      editing: false,
    };
  },
  mounted() {
    getDiscussion().then((posts) => {
      this.posts = posts;
    });
  },
  methods: {
    create(input) {
      log.info('输入内容', input);
      createDiscussion(input.title, input.content)
        .then((p) => {
          this.posts.unshift(p);
        })
        .catch((e) => {
          log.info(e);
        });
      // this.cancel();
    },
    enter() {
      log.info(this.id);
      this.$router.push(`/post/${this.id}`);
    },
    cancel() {
      this.editing = false;
    },
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' };
        case 'two':
          return { class: 'red', icon: 'edit' };
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' };
        default:
          return {};
      }
    },
  },
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>