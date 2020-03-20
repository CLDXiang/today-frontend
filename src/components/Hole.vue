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
        <Editor mode="secret" @close="editing = false" @done="create"
          >匿名分享</Editor
        >
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { getPost, createPost } from '../services/post.service.js';
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
    getPost('secret').then((posts) => {
      this.posts = posts;
      log.info(posts);
    });
  },
  methods: {
    create(input) {
      log.info('输入内容', input);
      createPost('secret', input.title, input.content)
        .then((p) => {
          this.posts.unshift(p);
        })
        .catch((e) => {
          log.info(e);
        });
      this.cancel();
    },
    enter(id) {
      log.info('enter', id);
      this.$router.push(`/post/${id}`);
    },
    cancel() {
      this.editing = false;
    },
    created(post) {
      log.info('created', post);
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
