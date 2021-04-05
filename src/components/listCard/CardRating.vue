<template>
  <div class="py-2.5 px-3 rounded-lg shadow-lg bg-white mb-2">
    <div class="flex mt-1 mb-2">
      <div
        class="flex-shrink-0 w-10"
        @click.stop="handleClickAvatar"
      >
        <img
          :src="processAvatar(rating.creator.avatar)"
          class="w-10 h-10 rounded-full"
        >
      </div>
      <div class="flex-grow ml-2">
        <div class="flex justify-between">
          <span
            class="font-extrabold text-primary"
            @click.stop="handleClickAvatar"
          >
            {{ rating.creator.nickname }}
          </span>
          <span class="text-xs text-gray-400">
            {{ timeDiff }}
          </span>
        </div>
        <div
          :class="['pt-2 overflow-hidden text-left break-all whitespace-pre-wrap',
                   'max-h-20 overflow-ellipsis line-limit']"
        >
          {{ rating.form.content }}
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-1 items-center">
      <div
        :class="courseCardColor"
        class="px-2 py-1 overflow-hidden text-xs rounded-2xl whitespace-nowrap overflow-ellipsis"
      >
        {{ `${rating.lecture.name} ${rating.lecture.teachers.join(' ')}` }}
      </div>
      <div class="flex space-x-2 ml-1 text-gray-500">
        <!-- FIXME: 实现 reaction 后显示 -->
        <span class="flex">
          <span>
            <f-icon
              name="reaction"
              size="14"
            />
          </span>
          <span class="ml-1 text-xs text-gray-400">
            {{ rating.reaction.count }}
          </span>
        </span>
        <!-- FIXME: 实现评论后显示 -->
        <span class="flex">
          <f-icon
            name="chat"
            size="14"
          />
          <span class="ml-1 text-xs text-gray-400">
            {{ rating.commentCount }}
          </span>
        </span>
        <!-- FIXME: 实现收藏后显示 -->
        <span class="flex">
          <f-icon
            :style="{color: starColor}"
            :name="rating.starred ? 'heart-fill' : 'heart'"
            size="14"
          />
          <span class="ml-1 text-xs text-gray-400">
            {{ rating.starCount }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useProcessAvatar } from '@/composables';
import { hashColorClassNames } from '@/utils/colors';
import { CardRatingItem } from './types';

export default defineComponent({
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
  emits: ['click-avatar'],
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
  computed: {
    timeDiff() {
      const res: string = this.rating.createdAt.fromNow();
      return res;
    },
    starColor(): string {
      return this.rating.starred ? '#ef755a' : '';
    },
    courseCardColor(): string {
      // TODO: 有实际分类意义的配色
      return hashColorClassNames(parseInt(this.rating.lecture.id, 10) || 0);
    },
  },
  methods: {
    handleClickAvatar() {
      this.$emit('click-avatar', this.rating.creator.id);
    },
  },
});
</script>

<style scoped>
.line-limit {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
