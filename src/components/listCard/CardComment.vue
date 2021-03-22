<template>
  <div class="list-card card-comment">
    <div class="list-card__main-field">
      <div
        class="list-card__avatar-field"
        @click.stop="handleClickAvatar"
      >
        <img
          class="avatar"
          :src="processAvatar(comment.creator.avatar)"
        >
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span
            class="card-comment__user-name text-primary"
            @click.stop="handleClickAvatar"
          >
            {{ comment.creator.nickname }}
          </span>
          <span class="card-comment__time-diff text-gray-500">
            {{ timeDiff }}
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-comment__comment-content text-gray-600">
            {{ comment.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-comment__reactions">
      <reaction
        :value="mockReaction"
        :readonly="false"
        @add="handleAddReaction"
        @delete="handleDeleteReaction"
      />
    </div>
    <div class="list-card__bottom-field">
      <span />
      <span class="card-comment__icon-field">
        <f-icon
          name="edit"
          size="14"
          @click.stop="handleClickStar"
        />
        <f-icon
          name="delete"
          size="14"
          @click.stop="handleClickStar"
        />
        <f-icon
          :style="{color: starColor}"
          :name="comment.starred ? 'heart-fill' : 'heart'"
          size="14"
          @click.stop="handleClickStar"
        />
        <span class="card-comment__statistics text-gray-500">
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

<style lang='scss' scoped>
.card-comment {
  .card-comment__user-name {
    font-weight: bold;
    cursor: pointer;
  }
  .card-comment__time-diff {
    font-size: 12px;
  }
  .card-comment__comment-content {
    word-break: break-all;
    font-size: 14px;
  }
  .card-comment__icon-field {
    display: flex;
    align-items: center;
    > svg {
      cursor: pointer;
      margin-left: 18px;
    }
    > .card-comment__statistics {
      margin-left: 4px;
      font-size: 12px;
    }
  }
}
</style>
