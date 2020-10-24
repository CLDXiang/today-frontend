<template>
  <div class="list-card card-reactive-rating">
    <div class="card-reactive-rating__top-field">
      <div
        class="card-reactive-rating__top-left"
        @click="handleClickAvatar"
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
              @click="handleClickAvatar"
            >
              {{ rating.creator.nickname }}
            </span>
            <five-stars
              score="4.7"
              size="12"
            />
            <span class="card-reactive-rating__five-stars-score">
              4.7
            </span>
          </div>
          <span class="card-reactive-rating__five-stars-hints">
            善良善良善良
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
      @click="handleClickRatingCard"
    >
      {{ rating.content }}
    </div>
    <div class="card-reactive-rating__reactions">
      REACTIONS
    </div>
    <div class="card-reactive-rating__division-bar" />
    <div class="card-reactive-rating__bottom-icons">
      <span class="card-reactive-rating__icon">
        <f-icon
          name="chat"
          size="16"
        />
        <span class="card-reactive-rating__statistics">
          {{ rating.commentCount }}
        </span>
      </span>
      <span
        class="card-reactive-rating__icon"
        @click="handleClickChat"
      >
        <f-icon
          name="heart"
          size="16"
        />
        <span
          class="card-reactive-rating__statistics"
          @click="handleClickLike"
        >
          {{ rating.starCount }}
        </span>
      </span>
      <span
        class="card-reactive-rating__icon"
        @click="handleClickEdit"
      >
        <f-icon
          name="edit-square"
          size="16"
        />
      </span>
      <span
        class="card-reactive-rating__icon"
        @click="handleClickDelete"
      >
        <f-icon
          name="delete"
          size="16"
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
import { CardRatingItem } from './types';

export default defineComponent({
  components: {
    FiveStars,
  },
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
  emits: [
    'avatar-clicked',
    'rating-card-clicked',
    'rating-card-chat-clicked',
    'rating-card-like-clicked',
    'rating-card-edit-clicked',
    'rating-card-delete-clicked',
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
      return this.rating.starred ? '#EF755A' : '';
    },
  },
  methods: {
    handleClickAvatar() {
      this.$emit('avatar-clicked', this.rating.creator.id);
    },
    handleClickRatingCard() {
      this.$emit('rating-card-clicked', this.rating.id);
    },
    handleClickChat() {
      this.$emit('rating-card-chat-clicked', this.rating.id);
    },
    handleClickLike() {
      this.$emit('rating-card-like-clicked', this.rating.id);
    },
    handleClickEdit() {
      this.$emit('rating-card-edit-clicked', this.rating.id);
    },
    handleClickDelete() {
      this.$emit('rating-card-delete-clicked', this.rating.id);
    },
  },
});
</script>

<style lang='scss' scoped>
.card-reactive-rating {
  padding: 16px 16px 10px 16px;
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
        }
      }
    }
  }
  .card-reactive-rating__content {
    text-align: left;
    color: $gray2;
  }
  .card-reactive-rating__top-nickname {
    color: $primary-color;
  }
  .card-reactive-rating__top-datetime {
    color: #c4c4c4;
  }
  .card-reactive-rating__five-stars-hints {
    font-size: 10px;
    color: $gray3
  }
  .card-reactive-rating__five-stars-score {
    color: $gray3;
    margin-left: 4px;
  }
  .card-reactive-rating__bottom-icons {
    display: inline;
    color: $gray3;
    .card-reactive-rating__icon {
      display: flex;
      flex-direction: row;
      align-items: center;
      > .card-reactive-rating__statistics {
        margin-left: 6px;
        font-size: 12px;
      }
    }
  }
  .card-reactive-rating__division-bar {
    height: 2px;
    width: 100vw;
    margin: 0 0 10px -16px;
    background-color: #F2F2F2;
  }
  .card-reactive-rating__bottom-icons {
    display: flex;
    justify-content: space-around;
    color: $gray3;
    height: 15px;
  }
}

.five-stars {
  display: inline;
  margin-left: 5px;
}
</style>
