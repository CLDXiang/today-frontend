<template>
  <div class="list-card card-rating">
    <div class="list-card__main-field">
      <div
        class="list-card__avatar-field"
        @click="handleClickAvatar"
      >
        <img src="rating.creator.avatar">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span
            class="card-rating__top-nickname float-left"
            @click="handleClickAvatar"
          >
            {{ rating.creator.nickname }}
          </span>
          <five-stars
            class="float-left"
            score="4.7"
            size="12"
          />
          <span class="card-rating__five-stars-score float-left">
            4.7
          </span>
          <span class="card-rating__top-datetime float-right">
            {{ timeDiff }}
          </span>
          <div style="clear: both" />
          <span class="card-rating__five-stars-hints float-left">
            善良善良善良
          </span>
        </div>
        <div
          class="list-card__middle-field"
          @click="handleClickRatingCard"
        >
          <span class="card-rating__content float-left">
            {{ rating.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-rating__reactions">
      REACTIONS
    </div>
    <div class="card-rating__division-bar" />
    <div class="card-rating__bottom-icons">
      <span class="card-rating__icon">
        <f-icon
          name="chat"
          size="16"
        />
        <span class="card-rating__statistics">
          {{ rating.commentCount }}
        </span>
      </span>
      <span
        class="card-rating__icon"
        @click="handleClickChat"
      >
        <f-icon
          name="heart"
          size="16"
        />
        <span
          class="card-rating__statistics"
          @click="handleClickLike"
        >
          {{ rating.starCount }}
        </span>
      </span>
      <span
        class="card-rating__icon"
        @click="handleClickEdit"
      >
        <f-icon
          name="edit"
          size="16"
        />
      </span>
      <span
        class="card-rating__icon"
        @click="handleClickDelete"
      >
        <f-icon
          name="trash"
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
.card-rating {
  padding: 16px 16px 10px 16px;
}

.card-rating {
  .card-rating__content {
    color: #979797;
  }
  .card-rating__top-nickname {
    color: $primary-color;
  }
  .card-rating__top-datetime {
    color: #c4c4c4;
  }
  .card-rating__five-stars-hints {
    font-size: 10px;
    color: $gray3
  }
  .card-rating__five-stars-score {
    color: $gray3;
    margin-left: 4px;
  }
  .card-rating__content {
    text-align: left;
    color: $gray2;
  }
  > .list-card__main-field .list-card__content-field .list-card__middle-field {
    margin-bottom: 30px;
  }
  .card-rating__bottom-class-info {
    color: $gray2;
  }
  .card-rating__bottom-icon-field {
    display: inline;
    color: $gray3;
    .card-rating__bottom-icon {
      margin-right: 10px;
      .card-rating__bottom-statistics {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
  .card-rating__division-bar {
    height: 2px;
    width: 100%;
    background-color: #F2F2F2;
  }
  .card-rating__bottom-icons {
    display: flex;
    justify-content: space-around;
    color: $gray3;
  }
}
.five-stars {
  display: inline;
  margin-left: 5px;
}
</style>
