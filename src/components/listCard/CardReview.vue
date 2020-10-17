<template>
  <div class="list-card card-review">
    <div class="list-card__main-field">
      <div class="list-card__avatar-field">
        <img src="/assets/default_avatar.png">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="float-left">User1 RATINGS</span>
          <span class="float-right">13 minutes ago</span>
          <div style="clear: both;"></div>
          <span class="float-left"> 善良 善良 善良</span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <div class="card-review__comment">点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评点评</div>
      <div class="float-left">REACTIONS</div>
      <div class="card-review__icons">ICONS</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLectureItem } from './types';

export default defineComponent({

})
</script>

<style lang='scss' scoped>
.list-card {
  .list-card__bottom-field {
    min-height: 22px ;
    height: auto ;
  }
}
.card-review {
  .card-review__comment {
    text-align: left;
  }
  .card-review__icons {
    clear: both;
  }
}
</style>
