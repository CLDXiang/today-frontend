<template>
  <div class="list-card card-reactive-rating">
    <div class="card-reactive-rating__top-field">
      <div
        class="card-reactive-rating__top-left"
        @click.stop="handleClickAvatar"
      >
        <img
          class="avatar"
          :src="processAvatar(rating.creator.avatar)"
        >
      </div>
      <div class="card-reactive-rating__top-right">
        <div class="card-reactive-rating__top-right-first">
          <div class="card-reactive-rating__top-right-first-up">
            <span
              class="card-reactive-rating__top-nickname"
              @click.stop="handleClickAvatar"
            >
              {{ rating.creator.nickname }}
            </span>
            <five-stars
              :score="rating.form.recommended"
              size="12"
            />
            <span class="card-reactive-rating__five-stars-score">
              {{ rating.form.recommended.toFixed(1) }}
            </span>
          </div>
          <span class="card-reactive-rating__five-stars-hints">
            <span class="card-reactive-rating__hints-contents">
              {{ mapScoreToText('difficulty', rating.form.difficulty) }}
            </span>
            <span class="card-reactive-rating__hints-contents">
              {{ mapScoreToText('nice', rating.form.nice) }}
            </span>
            <span class="card-reactive-rating__hints-contents">
              {{ mapScoreToText('workload', rating.form.workload) }}
            </span>
          </span>
        </div>
        <div class="card-reactive-rating__top-right-second">
          <span class="card-reactive-rating__top-datetime">
            {{ timeDiff }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="card-reactive-rating__content"
    >
      {{ rating.form.content }}
    </div>
    <div class="card-reactive-rating__reactions">
      <reaction
        :value="mockReaction"
        :readonly="false"
        @add="handleAddReaction"
        @delete="handleDeleteReaction"
      />
    </div>
    <div class="card-reactive-rating__division-bar" />
    <div class="card-reactive-rating__bottom-icons">
      <span
        v-if="showChat"
        class="card-reactive-rating__icon"
        @click.stop="handleClickChat"
      >
        <f-icon
          name="chat"
          size="14"
        />
        <span class="card-reactive-rating__statistics">
          {{ rating.commentCount }}
        </span>
      </span>
      <span
        v-if="showLike"
        class="card-reactive-rating__icon"
        @click.stop="handleClickLike"
      >
        <f-icon
          name="heart"
          size="14"
        />
        <span class="card-reactive-rating__statistics">
          {{ rating.starCount }}
        </span>
      </span>
      <span
        v-if="showEdit"
        class="card-reactive-rating__icon"
        @click.stop="handleClickEdit"
      >
        <f-icon
          name="edit-square"
          size="14"
        />
      </span>
      <span
        v-if="showDelete"
        class="card-reactive-rating__icon"
        @click.stop="handleClickDelete"
      >
        <f-icon
          name="delete"
          size="14"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FiveStars from '@/components/FiveStars.vue';
import { mapState } from 'vuex';
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
  data() {
    return {
      mockReaction: {} as EmojiTable,
    }
  },
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, default: true },
    showChat: { type: Boolean, default: true },
    showLike: { type: Boolean, default: true },
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
  methods: {
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
  },
  created() {
    this.mockReaction = mockReaction.data.emoji;
  },
});
</script>

<style lang='scss' scoped>
.card-reactive-rating {
  padding: 16px 16px 7px 16px;
}

.card-reactive-rating {
  .card-reactive-rating__top-field {
    display: flex;
    justify-content: flex-start;
    height: 36px;
    > .card-reactive-rating__top-left {
      flex: 1;
      max-width: 40px;
    }
    > .card-reactive-rating__top-right {
      flex: 9;
      display: flex;
      justify-content: space-between;
      > .card-reactive-rating__top-right-first {
        display: flex;
        flex-direction: column;
        > .card-reactive-rating__five-stars-hints {
          text-align: left;
          font-size: 10px;
          color: $gray3;
          > .card-reactive-rating__hints-contents {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .card-reactive-rating__content {
    margin-top: 7px;
    text-align: left;
    color: $gray2;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    margin-bottom: 10px;
  }
  .card-reactive-rating__reactions {
    margin-bottom: 9px;
  }
  .card-reactive-rating__top-nickname {
    color: $primary-color;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }
  .card-reactive-rating__top-datetime {
    color: #c4c4c4;
    font-size: 12px;
  }
  .card-reactive-rating__five-stars-score {
    color: $gray3;
    margin-left: 4px;
  }
  .card-reactive-rating__division-bar {
    height: 2px;
    width: 100vw;
    margin: 0 0 7px -16px;
    background-color: #f2f2f2;
  }
  .card-reactive-rating__bottom-icons {
    display: flex;
    justify-content: space-around;
    color: $gray3;
    height: 14px;
    > .card-reactive-rating__icon {
      display: flex;
      align-items: center;
      > .card-reactive-rating__statistics {
        margin-left: 6px;
        font-size: 12px;
      }
    }
  }
}

.five-stars {
  display: inline;
  margin-left: 5px;
}
</style>
