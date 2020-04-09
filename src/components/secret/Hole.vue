<template>
  <v-container>
    <v-card class="d-flex pa-2 flex-column" flat>
      <v-card-title class="d-flex">
        <v-col>树洞</v-col>
        <v-col class="d-flex">
          <v-btn justify="end" @click="editing = true">
            新建
          </v-btn>
        </v-col>
      </v-card-title>
      <Post
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :content="post.content"
        :created_at="post.created_at"
      >
        <v-btn @click="enter(post.id)">
          回复
        </v-btn>
      </Post>
      <v-dialog v-model="editing">
        <Editor mode="secret" @close="editing = false" @done="create">
          匿名分享
        </Editor>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { getSecret, createSecret } from '../../services/post.service';
import Post from './Post.vue';
import Editor from './Editor.vue';
import log from '../../utils/log';

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
  mounted() {
    getSecret()
      .then((posts) => {
        this.posts = posts;
        log.info(posts);
      })
      .catch((err) => {
        log.info(err);
      });
  },
  methods: {
    create(input) {
      log.info('输入内容', input);
      createSecret(input.title, input.content)
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
