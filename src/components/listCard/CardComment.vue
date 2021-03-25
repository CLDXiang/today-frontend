<template>
  <div class="rounded-lg bg-white shadow-lg py-2.5 px-3">
    <div class="flex mt-1 mb-2">
      <div
        class="flex-shrink-0 w-10"
        @click.stop="handleClickAvatar"
      >
        <img
          class="w-10 h-10 rounded-full"
          :src="processAvatar(comment.creator.avatar)"
        >
      </div>
      <div class="flex flex-grow ml-2">
        <div class="flex justify-between">
          <span
            class="font-extrabold cursor-pointer text-primary"
            @click.stop="handleClickAvatar"
          >
            {{ comment.creator.nickname }}
          </span>
          <span class="text-xs text-gray-400">
            {{ timeDiff }}
          </span>
        </div>
        <div class="mt-2 mb-2 text-sm text-left text-gray-600 whitespace-pre-wrap">
          {{ comment.content }}
        </div>
      </div>
    </div>
    <div>
      <reaction
        :value="mockReaction"
        :readonly="false"
        @add="handleAddReaction"
        @delete="handleDeleteReaction"
      />
    </div>
    <div>
      <span class="flex items-center">
        <f-icon
          name="edit"
          class="ml-4 cursor-pointer"
          size="14"
          @click.stop="handleClickStar"
        />
        <f-icon
          name="delete"
          class="ml-4 cursor-pointer"
          size="14"
          @click.stop="handleClickStar"
        />
        <f-icon
          :style="{color: starColor}"
          :name="comment.starred ? 'heart-fill' : 'heart'"
          class="ml-4 cursor-pointer"
          size="14"
          @click.stop="handleClickStar"
        />
        <span class="ml-1 text-xs text-gray-500">
          {{ comment.starCount }}
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useProcessAvatar } from '@/composables';
import { Reaction } from '@/components/reaction';
import { CardCommentItem } from './types';

export default defineComponent({
  components: {
    Reaction,
  },
  props: {
    comment: { type: Object as PropType<CardCommentItem>, required: true },
  },
  emits: ['click-avatar', 'click-star'],
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
  computed: {
    starColor(): string {
      return this.comment.starred ? '#ef755a' : '';
    },
    timeDiff() {
      const res: string = this.comment.createdAt.fromNow();
      return res;
    },
  },
  methods: {
    handleClickAvatar() {
      this.$emit('click-avatar', this.comment.creator.id);
    },
    handleClickStar() {
      this.$emit('click-star', this.comment.id);
    },
  },
});
</script>
