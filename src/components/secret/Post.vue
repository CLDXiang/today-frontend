<template>
  <v-card outlined class="my-1 px-1">
    <v-list-item three-line>
      <v-list-item-content>
        <!-- <div class="overline mb-4">{{ post.user_id }}</div> -->
        <v-list-item-subtitle>
          #{{ id }} 于 {{ created_at }}
        </v-list-item-subtitle>
        <v-list-item-title v-if="title !== ''" class="headline mb-1">
          {{ title }}
        </v-list-item-title>
        <div v-html="render(content)" />
      </v-list-item-content>

      <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
    </v-list-item>

    <v-card-actions class="d-flex justify-end">
      <v-btn>点赞</v-btn>
      <v-btn>关注</v-btn>
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script>
import marked from 'marked';

export default {
  props: {
    title: String,
    content: String,
    id: Number,
    created_at: String,
  },
  methods: {
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content);
    },
  },
};
</script>

<style></style>
