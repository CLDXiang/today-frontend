<template>
  <div class="card-rating py-2.5 px-3 rounded-lg shadow-lg bg-white mb-2">
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
            :style="primaryColor"
            class="font-extrabold"
            @click.stop="handleClickAvatar"
          >
            {{ rating.creator.nickname }}
          </span>
          <span class="text-xs text-gray-400 card-rating__top-datetime">
            {{ timeDiff }}
          </span>
        </div>
        <div
          :class="'pt-2 overflow-hidden text-left break-all whitespace-pre-wrap'
            + ' max-h-20 overflow-ellipsis line-limit'"
        >
          {{ rating.form.content }}
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-1">
      <div
        :style="courseCardColor"
        class="text-xs rounded-2xl py-1 px-2"
      >
        {{ `${rating.lecture.name} ${rating.lecture.teachers.join(' ')}` }}
      </div>
      <div>
        <!-- FIXME: 实现 reaction 后显示 -->
        <span
          v-if="false"
        >
          <span>
            <f-icon
              name="reaction"
              size="14"
            />
          </span>
          <span
            class=""
          >
            {{ rating.reaction.count }}
          </span>
        </span>
        <!-- FIXME: 实现评论后显示 -->
        <span
          v-if="false"
          class=""
        >
          <f-icon
            name="chat"
            size="14"
          />
          <span class="">
            {{ rating.commentCount }}
          </span>
        </span>
        <!-- FIXME: 实现收藏后显示 -->
        <span
          v-if="false"
        >
          <f-icon
            :style="{color: starColor}"
            :name="rating.starred ? 'heart-fill' : 'heart'"
            size="14"
          />
          <span class="">
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
import { colors, primaryColor } from '@/utils/colors';
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
      primaryColor,
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
    courseCardColor(): Record<string, unknown> {
      // TODO: 有实际分类意义的配色
      return colors[parseInt(this.rating.lecture.id, 10) % 96 || 0];
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
