<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        md="10"
        lg="8"
        class="d-flex flex-column"
      >
        <v-card class="d-flex pa-2 flex-column" flat>
          <v-card-title class="d-flex">
            <v-row class="d-flex justify-space-between">
              <v-col>树洞</v-col>
              <v-btn class="mx-5 my-3" @click="editing = true">
                新建
              </v-btn>
            </v-row>
          </v-card-title>
        </v-card>
        <v-container class="overflow-y">
          <v-row v-for="post in posts" :key="post.id" justify="center" class="d-flex flex-column">
            <Post
              :id="post.id"
              :content="post.content"
              :created_at="post.created_at"
            >
              <v-btn @click="enter(post.id)">
                回复
              </v-btn>
            </Post>
          </v-row>
          <v-speed-dial
            :v-model="true"
            :open-on-hover="true"
            :bottom="true"
            :right="true"
            class="dial"
          >
            <template v-slot:activator>
              <v-btn
                v-model="fab"
                color="blue darken-2"
                dark
                fab
              >
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </template>
          </v-speed-dial>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="editing"
      max-width="800px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <Editor
        mode="secret"
        @close="editing = false" 
        @done="create"
      >
        匿名分享
      </Editor>
    </v-dialog>
  </v-container>
</template>

<script>
import { getSecret, createSecret, getSecretLater } from '../../services/post.service';
import Post from './Post.vue';
import Editor from './Editor.vue';
import log from '../../utils/log';

export default {
  components: { Post, Editor },
  data() {
    return {
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
    posts() {
      return this.$store.state.secret.posts;
    },
  },
  mounted() {
    if (this.posts.length === 0) {
      log.info('no data in posts, fetch');
      getSecret()
        .then((posts) => {
          this.$store.commit('updateSecretPosts', posts);
          log.info('fetched', posts);
        })
        .catch((err) => {
          log.info(err);
        });
    } else {
      this.updatePosts();
    }
  },
  methods: {
    updatePosts() {
      log.info('update posts');
      getSecretLater(this.posts[0].id)
        .then((data) => {
          log.info(data);
          this.$store.commit('updateSecretPosts', [...data, ...this.posts]);
          log.info('update finished');
        })
        .catch((err) => log.info(err));
    },
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
.overflow-y {
  overflow-y: auto;
}
.dial {
  position: absolute;
  bottom: 100px;
  right: 50px;
}
</style>
