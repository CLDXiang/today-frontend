<template>
  <v-container>
    <Post :id="post.id" :content="post.content" :created_at="post.created_at">
      <v-btn @click="editing = true">
        回复
      </v-btn>
    </Post>
    <v-card>
      <v-card v-for="reply in replies" :key="reply.id" class="my-1 my-1" flat>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ getName(reply.anony_id) }} 于 {{ reply.created_at }}：
            </v-list-item-subtitle>
            <div>{{ reply.content }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
    <v-dialog v-model="editing">
      <Editor mode="reply" @close="editing = false" @done="createReply">
        写回复
      </Editor>
    </v-dialog>
  </v-container>
</template>

<script>
import marked from 'marked';
import { ANONY_NAMES } from '../../utils/config';
import Post from './Post.vue';
import Editor from './Editor.vue';
import log from '../../utils/log';
import { getSecretById, getSecretReply, createSecretReply } from '../../services/post.service';

export default {
  components: { Post, Editor },
  props: { id: String },
  data() {
    return {
      editing: false,
      post: {
        id: 23,
        title: '加载中',
        content: '加载中',
        created_at: '2020-02-26T07:44:31.365Z',
        my_id: 1,
        user_id: 1,
        user_name: '小虎',
        user_avatar: 'logo.png',
        category: 'discussion',
      },
      replies: [],
    };
  },
  async mounted() {
    this.post = await getSecretById(parseInt(this.id, 10));
    this.replies = await getSecretReply(parseInt(this.id, 10));
  },
  methods: {
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content);
    },
    getName(id) {
      let name;
      if (id < ANONY_NAMES.length) {
        name = ANONY_NAMES[id];
      } else {
        name = `${id}`;
      }
      if (id === this.post.anony_id) {
        name += '（我）';
      }
      return name;
    },
    async createReply(reply) {
      log.info('reply!', reply);
      // eslint-disable-next-line camelcase
      const { anony_id, id } = await createSecretReply(parseInt(this.id, 10), reply.content);
      log.info();
      this.replies.push({ ...reply, anony_id, id });
      this.editing = false;
    },
  },
};
</script>

<style></style>
