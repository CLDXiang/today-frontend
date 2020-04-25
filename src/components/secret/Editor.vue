<template>
  <v-card cols="12" md="6" class="d-flex flex-column editor__container">
    <v-card-title>
      <slot />
    </v-card-title>
    <div v-if="mode === 'discussion'">
      <v-text-field v-model="title" label="标题" clearable />
    </div>
    <div class="editor__textarea mx-3">
      <v-textarea
        v-model="content"
        label="内容"
        :clearable="true"
        :hint="mode === 'discussion' ? '支持 markdown 语法' : ''"
      />
    </div>
    <div class="editor__control">
      <v-btn class="mx-3 my-4" @click="cancel">
        取消
      </v-btn>
      <v-btn class="mx-3 my-4" @click="create">
        添加
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import log from '../../utils/log';

export default {
  props: {
    mode: String, // 'secret' | 'dicussion' | 'rate' | 'reply',
    defaultContent: String,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  mounted() {
    if (this.defaultContent.length !== 0) {
      this.content = this.defaultContent;
    }
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    create() {
      const input = {
        content: this.content,
        title: this.title,
        created_at: `${new Date()}`,
        mode: this.mode,
      };
      this.content = '';
      this.title = '';
      log.info('Editor input:', input);
      this.$emit('done', input);
      this.$emit('close');
    },
  },
};
</script>

<style>
.editor_container {
  height: 900px;
}
.editor_textarea {
  flex-grow: 4;
}
.editor__control {
  display: flex;
  justify-content: center;
}
</style>
