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
            class="card-rating__top-nickname"
            @click="handleClickAvatar"
          >
            {{ rating.creator.nickname }}
          </span>
          <span class="card-rating__top-datetime">
            {{ timeDiff }}
          </span>
        </div>
        <div
          class="list-card__middle-field"
          @click="handleClickRatingCard"
        >
          <span class="card-rating__content">
            {{ rating.content }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="list-card__bottom-field"
      @click="handleClickRatingCard"
    >
      <span
        :class="courseCardColor"
        class="card-rating__bottom-class-info"
      >
        {{ `${rating.lecture.name} ${rating.lecture.teachers.join(' ')}` }}
      </span>
      <span class="card-rating__bottom-icon-field">
        <span class="card-rating__bottom-icon">
          <span>
          <f-icon
            name="reaction"
            size="16"
          />
          </span>
          <span
            class="card-rating__bottom-statistics"
          >
            {{ rating.reaction.count }}
          </span>
        </span>
        <span class="card-rating__bottom-icon">
          <f-icon
            name="chat"
            size="16"
          />
          <span class="card-rating__bottom-statistics">
            {{ rating.commentCount }}
          </span>
        </span>
        <span class="card-rating__bottom-icon">
          <f-icon
            :style="{color: starColor}"
            :name="rating.starred ? 'heart-fill' : 'heart'"
            size="16"
          />
          <span class="card-rating__bottom-statistics">
            {{ rating.starCount }}
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardRatingItem } from './types';

export default defineComponent({
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
  emits: ['avatar-clicked', 'rating-card-clicked'],
  computed: {
    timeDiff() {
      const res: string = this.rating.createdAt.fromNow();
      return res;
    },
    starColor(): string {
      return this.rating.starred ? '#EF755A' : '';
    },
    courseCardColor(): string {
      return `color-${parseInt(this.rating.lecture.id.slice(4, 7), 10) % 96 || 0}`;
    },
  },
  methods: {
    handleClickAvatar() {
      this.$emit('avatar-clicked', this.rating.creator.id);
    },
    handleClickRatingCard() {
      this.$emit('rating-card-clicked', this.rating.id);
    },
  },
});
</script>

<style lang='scss' scoped>
@import '@/scss/_timetable';

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
  .card-rating__content {
    text-align: left;
    color: $gray2;
  }
  > .list-card__main-field .list-card__content-field .list-card__middle-field {
    margin-bottom: 30px;
  }
  .card-rating__bottom-class-info {
    font-size: 12px;
    border-radius: 20px;
    padding: 2px 9px;
    color: $gray2;
  }
  .card-rating__bottom-icon-field {
    display: flex;
    color: $gray3;
    .card-rating__bottom-icon {
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      .card-rating__bottom-statistics {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
