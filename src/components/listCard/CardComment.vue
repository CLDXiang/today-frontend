<template>
  <div class="list-card card-comment">
    <div class="list-card__main-field">
      <div
        class="list-card__avatar-field"
        @click="handleClickAvatar"
      >
        <img
          class="avatar"
          :src="processAvatar(comment.creator.avatar)"
        >
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span
            class="card-comment__user-name"
            @click="handleClickAvatar"
          >
            {{ comment.creator.nickname }}
          </span>
          <span class="card-comment__time-diff">
            {{ timeDiff }}
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-comment__comment-content">
            {{ comment.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span />
      <span class="card-comment__icon-field">
        <f-icon
          :style="{color: starColor}"
          :name="comment.starred ? 'heart-fill' : 'heart'"
          size="16"
          @click="handleClickStar"
        />
        <span class="card-comment__statistics">
          {{ comment.starCount }}
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useProcessAvatar } from '@/composables';
import { CardCommentItem } from './types';

export default defineComponent({
  props: {
    comment: { type: Object as PropType<CardCommentItem>, required: true },
  },
  emits: ['avatar-clicked', 'comment-star'],
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
      this.$emit('avatar-clicked', this.comment.creator.id);
    },
    handleClickStar() {
      this.$emit('comment-star', this.comment.id);
    },
  },
});
</script>

<style lang='scss' scoped>
.card-comment {
  .card-comment__user-name {
    color: $primary-color;
    font-weight: bold;
  }
  .card-comment__time-diff {
    color: $gray3;
    font-size: 12px;
  }
  .card-comment__comment-content {
    color: $gray2;
  }
  .card-comment__icon-field {
    display: flex;
    align-items: center;
    .card-comment__statistics {
      margin-left: 4px;
      color: $gray3;
      font-size: 12px;
    }
  }
}
</style>
