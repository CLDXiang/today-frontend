<template>
  <div>
    <span
      :class="{ 'rating-readonly': readonly }"
      class="rating"
    >
      <div
        v-for="i in length"
        :key="i"
        :class="{'rate-active': valueData >= i }"
        @click="handleClick(i)"
      >
        <svg viewBox="-2 -2 30 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26 10.109c0 .281-.203.547-.406.75l-5.672 5.531 1.344 7.812c.016.109.016.203.016.313 0 .406-.187.781-.641.781a1.27 1.27 0 0 1-.625-.187L13 21.422l-7.016 3.687c-.203.109-.406.187-.625.187-.453 0-.656-.375-.656-.781 0-.109.016-.203.031-.313l1.344-7.812L.39 10.859c-.187-.203-.391-.469-.391-.75 0-.469.484-.656.875-.719l7.844-1.141 3.516-7.109c.141-.297.406-.641.766-.641s.625.344.766.641l3.516 7.109 7.844 1.141c.375.063.875.25.875.719z"
          />
        </svg>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      default: 5,
    },
    value: {
      type: Number,
      default: 3,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valueData: 0,
    };
  },
  watch: {
    value(v) {
      this.valueData = v;
    },
  },
  created() {
    this.valueData = this.value;
  },
  methods: {
    handleClick(i) {
      this.valueData = i;
      this.$emit('input', i);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';
// Star -- Animation
@keyframes wobble {
  0% {
    transform: scale(0.8);
  }
  20% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(0.9);
  }
  60% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1);
  }
}
.rating-readonly {
  pointer-events: none;
}

.rating {
  color: rgb(255, 204, 0);

  $unit: 1.4em;
  display: inline-block;
  & > div {
    display: inline-block;
    width: $unit;
    height: $unit;
    margin-right: $small-spacing/2;
    cursor: pointer;
    & > svg {
      width: $unit;
      height: $unit;
    }
  }

  > div > svg {
    fill: var(--fill-color--inactive, none);
    stroke: var(--border-color--inactive, rgba(black, $active-opacity));
    stroke-width: var(--border-width--inactive, var(--border-width, 0.06em));
  }
}

.rate-active > svg {
  fill: var(--fill-color, currentColor) !important;
  stroke: var(--border-color, rgba(black, $active-opacity)) !important;
  stroke-width: var(--border-width, 0.06em) !important;
  animation: wobble 0.8s ease-out;
}
</style>
