<template>
  <div class="list-card card-reply">
    <div class="list-card__main-field">
      <div class="list-card__avatar-field">
        <img src="default_avatar.png">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-user__user-name float-left">
            User1
          </span>
        </div>
        <div class="list-card__middle-field float-left">
          <span class="card-user__user-signature">
            To thyself be true.
          </span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-reply__icon float-right">
        ICON
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({

});
</script>

<style lang='scss' scoped>
</style>
