<template>
  <div class="container">
    <div class="title-row">
      <h1 class="title-row__header">
        树洞
      </h1>
      <v-btn class="title-row__create my-2 mx-2" @click="editing = true">
        新建
      </v-btn>
    </div>

    <div
      v-infinite-scroll="loadMorePosts"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      class="post__container"
    >
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
    </div>
    <v-speed-dial :v-model="true" :open-on-hover="true" class="dial">
      <template v-slot:activator>
        <v-btn color="blue darken-2" dark fab @click="refreshPosts">
          <v-icon>mdi-update</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
    <v-dialog
      v-model="editing"
      max-width="800px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <Editor mode="secret" @close="editing = false" @done="create">
        匿名分享
      </Editor>
    </v-dialog>
  </div>
</template>

<script>
import {
  getSecret,
  createSecret,
  getSecretLater,
  getSecretEarlier,
} from '../../services/post.service';
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
    posts() {
      return this.$store.state.secret.posts;
    },
  },
  mounted() {
    if (this.posts.length === 0) {
      log.info('no data in posts, fetch');
      this.refreshPosts();
    } else {
      this.updatePosts();
    }
  },
  methods: {
    refreshPosts() {
      log.info('refresh posts');
      getSecret()
        .then((posts) => {
          this.$store.commit('updateSecretPosts', posts);
          log.info('fetched', posts);
        })
        .catch((err) => {
          log.info('refresh posts error', err);
        });
    },
    updatePosts() {
      log.info('update posts');
      getSecretLater(this.posts[0].id)
        .then((data) => {
          log.info(data);
          if (data.length !== 0) {
            this.$store.commit('updateSecretPosts', [...data, ...this.posts]);
          }
          log.info('update finished');
        })
        .catch((err) => log.info('update posts error', err));
    },
    loadMorePosts() {
      log.info('update posts');
      getSecretEarlier(this.posts[this.posts.length - 1].id)
        .then((data) => {
          log.info(data);
          if (data.length !== 0) {
            this.$store.commit('updateSecretPosts', [...this.posts, ...data]);
          }
          log.info('update finished', data);
        })
        .catch((err) => log.info('update posts error', err));
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

<style lang="scss" scoped>
$width: 1000px;

html {
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - 64px - 56px);
  left: 50%;
  max-width: $width;
  margin-left: -($width / 2);
  @media (max-width: $width) {
    left: 0%;
    width: 100%;
    margin-left: 0;
  }
}

.title-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title-row__header {
  display: inline;
}

.post__container {
  /* display: flex; */
  /* flex-direction: column; */
  /* flex-grow: 1; */
  overflow-y: scroll;
}

.dial {
  position: absolute;
  bottom: 100px;
  right: 100px;
}

.post {
  height: 100px;
  border: solid;
  margin: 3px;
  padding: 10px;
}
</style>
