<template>
  <v-container>
    <v-card class="d-flex pa-2 flex-column" flat>
      <v-card-title class="d-flex">
        <p>树洞</p>
        <v-btn @click="editing = true">新建</v-btn>
      </v-card-title>
      <v-card v-for="post in posts" :key="post.id" outlined class="my-1">
        <v-list-item three-line>
          <v-list-item-content>
            <!-- <div class="overline mb-4">{{ post.user_id }}</div> -->
            <v-list-item-subtitle>#{{ post.id }} 于 {{ post.created_at }}</v-list-item-subtitle>
            <v-list-item-title class="headline mb-1">{{ post.title }}</v-list-item-title>
            <div v-html="render(post.content)"></div>
          </v-list-item-content>

          <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
        </v-list-item>

        <v-card-actions class="d-flex justify-end">
          <v-btn>点赞</v-btn>
          <v-btn>关注</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="editing">
        <v-card class="d-flex flex-column">
          <v-col cols="12" md="6">
            <v-text-field v-model="inputTitle" label="标题" clearable></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              name="input-7-1"
              label="内容"
              :clearable="true"
              v-model="inputContent"
              hint="Hint text"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn @click="cancel">取消</v-btn>
            <v-btn @click="create">添加</v-btn>
          </v-col>
        </v-card>
      </v-dialog>

      <!-- <v-dialog v-model="write">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>发布</v-card-title>

            <v-textarea></v-textarea>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="write = false">I accept</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>-->
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
import log from '../utils/log.js';
import marked from 'marked';
export default {
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
    create() {
      this.write = true;
      log.info('输入内容', this.inputContent);
      createDiscussion(this.inputTitle, this.inputContent).catch((e) => {
        log.info(e);
      });
      this.cancel();
    },
    cancel() {
      this.editing = false;
    },
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content, { sanitize: true });
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