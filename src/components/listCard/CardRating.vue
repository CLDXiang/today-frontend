<template>
  <div class="list-card card-rating">
    <div class="list-card__main-field">
      <div
        class="list-card__avatar-field"
        @click="handleClickAvatar"
      >
        <img src="/assets/default_avatar.png">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span
            class="card-rating__top-nickname float-left"
            @click="handleClickAvatar"
          >
            {{ rating.creator.nickname }}
          </span>
          <span class="card-rating__top-datetime float-right">
            {{ timeDiff }}
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-rating__content float-left">
            {{ rating.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-rating__bottom-class-info float-left">
        {{ `${rating.lecture.name} ${rating.lecture.teachers.join(' ')}` }}
      </span>
      <div class="card-rating__bottom-icon-field float-right">
        <span class="card-rating__bottom-icon">
          <f-icon
            name="reaction"
            size="16"
          />
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
          <span
            class="card-rating__bottom-statistics"
          >
            {{ rating.starCount }}
          </span>
        </span>
      </div>
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
  emits: ['avatar-clicked'],
  computed: {
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
      this.$emit('avatar-clicked', this.rating.id);
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
  .card-rating__top-datetime {
    color: #c4c4c4;
  }
  .card-rating__content {
    text-align: left;
  }
  > .list-card__main-field .list-card__content-field .list-card__middle-field {
    margin-bottom: 30px;
  }
  .card-rating__bottom-icon-field {
    display: inline;
    color: #828282;
    .card-rating__bottom-icon {
      margin-right: 10px;
      .card-rating__bottom-statistics {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
