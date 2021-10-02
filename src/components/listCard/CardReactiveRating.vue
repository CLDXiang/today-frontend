<template>
  <div class="py-2.5 px-3 rounded-lg shadow-lg bg-white mb-2">
    <div class="flex justify-start h-10">
      <div
        class="w-10"
        @click.stop="handleClickAvatar"
      >
        <img
          class="w-10 h-10 rounded-full"
          :src="processAvatar(rating.creator.avatar)"
        >
      </div>
      <div class="flex-grow ml-1">
        <div class="flex flex-col">
          <div class="flex justify-between flex-grow">
            <div>
              <span
                class="font-extrabold cursor-pointer text-primary"
                @click.stop="handleClickAvatar"
              >
                {{ rating.creator.nickname }}
              </span>
              <five-stars
                :score="rating.form.recommended"
                size="12"
                class="inline ml-1"
                style="display: inline-flex"
              />
              <span class="ml-1 text-gray-500">
                {{ rating.form.recommended.toFixed(1) }}
              </span>
            </div>
            <div class="text-xs text-gray-400">
              {{ timeDiff }}
            </div>
          </div>
          <div class="text-left">
            <span class="mr-1 text-xs text-gray-500">
              {{ mapScoreToText('difficulty', rating.form.difficulty) }}
            </span>
            <span class="mr-1 text-xs text-gray-500">
              {{ mapScoreToText('nice', rating.form.nice) }}
            </span>
            <span class="mr-1 text-xs text-gray-500">
              {{ mapScoreToText('workload', rating.form.workload) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-2 mb-2 text-sm text-left text-gray-600 whitespace-pre-wrap"
    >
      {{ rating.form.content }}
    </div>
    <!-- FIXME: 实现 reaction 后显示 -->
    <div
      v-if="false"
      class="h-9"
    >
      <reaction
        :value="mockReaction"
        :readonly="false"
        @add="handleAddReaction"
        @delete="handleDeleteReaction"
      />
    </div>
    <!-- FIXME: 实现对点评的评论、收藏后显示 -->
    <div
      v-if="false"
      class="w-screen h-1"
    />
    <div
      class="flex justify-around h-3 text-gray-500"
    >
      <span
        v-if="showChat"
        @click.stop="handleClickChat"
      >
        <f-icon
          name="chat"
          size="14"
        />
        <span class="ml-1 text-xs">
          {{ rating.commentCount }}
        </span>
      </span>
      <span
        v-if="showLike"
        @click.stop="handleClickLike"
      >
        <f-icon
          name="heart"
          size="14"
          class="f-clickable"
        />
        <span class="ml-1 text-xs">
          {{ rating.starCount }}
        </span>
      </span>
      <span
        v-if="showEdit"
        @click.stop="handleClickEdit"
      >
        <f-icon
          name="edit-square"
          size="14"
          class="f-clickable"
        />
      </span>
      <span
        v-if="showDelete"
        @click.stop="handleClickDelete"
      >
        <f-icon
          name="delete"
          size="14"
          class="f-clickable"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapState } from 'vuex';
import FiveStars from '@/components/FiveStars.vue';
import { useProcessAvatar } from '@/composables';
import { mapScoreToText } from '@/utils/rating';
import { Reaction, EmojiTable } from '@/components/reaction';
import { reactionClient } from '@/apis';
import { mockReaction } from '@/apis/mocks/reaction';
import { CardRatingItem } from './types';

export default defineComponent({
  components: {
    FiveStars,
    Reaction,
  },
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
    showChat: { type: Boolean, default: false },
    showLike: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: false },
    showDelete: { type: Boolean, default: false },
  },
  emits: [
    'click-avatar',
    'click-chat',
    'click-like',
    'click-edit',
    'click-delete',
  ],
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
  data() {
    return {
      mockReaction: {} as EmojiTable,
    };
  },
  computed: {
    ...mapState(['user']),
    timeDiff() {
      const res: string = this.rating.createdAt.fromNow();
      return res;
    },
    starColor(): string {
      return this.rating.starred ? '#ef755a' : '';
    },
  },
  created() {
    this.mockReaction = mockReaction.data.emoji;
  },
  methods: {
    handleAddReaction(emojiId: string) {
      reactionClient.addReaction({ uniId: 'uni-1', emojiId }).then(({ data }) => {
        this.mockReaction = { ...data.emoji };
      });
    },
    handleDeleteReaction(emojiId: string) {
      reactionClient.deleteReaction({ uniId: 'uni-1', emojiId }).then(({ data }) => {
        this.mockReaction = { ...data.emoji };
      });
    },
    mapScoreToText,
    /** 点击头像 */
    handleClickAvatar() {
      this.$emit('click-avatar', this.rating.creator.id);
    },
    /** 点击讨论 */
    handleClickChat() {
      this.$emit('click-chat', this.rating.id);
    },
    /** 点击收藏 */
    handleClickLike() {
      this.$emit('click-like', this.rating.id);
    },
    /** 点击修改 */
    handleClickEdit() {
      this.$emit('click-edit', this.rating.id);
    },
    /** 点击删除 */
    handleClickDelete() {
      this.$emit('click-delete', this.rating.id);
    },
  },
});
</script>
