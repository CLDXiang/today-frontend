<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="star" viewBox="-2 -2 30 30">
        <path
          d="M26 10.109c0 .281-.203.547-.406.75l-5.672 5.531 1.344 7.812c.016.109.016.203.016.313 0 .406-.187.781-.641.781a1.27 1.27 0 0 1-.625-.187L13 21.422l-7.016 3.687c-.203.109-.406.187-.625.187-.453 0-.656-.375-.656-.781 0-.109.016-.203.031-.313l1.344-7.812L.39 10.859c-.187-.203-.391-.469-.391-.75 0-.469.484-.656.875-.719l7.844-1.141 3.516-7.109c.141-.297.406-.641.766-.641s.625.344.766.641l3.516 7.109 7.844 1.141c.375.063.875.25.875.719z"
        />
      </symbol>
    </svg>
    <div>
      <span class="rating">
        <input id="s11" type="radio" name="str1">
        <label for="s11">
          <svg>
            <use xlink:href="#star" />
          </svg>
        </label>
        <input id="s12" type="radio" name="str1">
        <label for="s12">
          <svg>
            <use xlink:href="#star" />
          </svg>
        </label>
        <input id="s13" type="radio" name="str1">
        <label for="s13">
          <svg>
            <use xlink:href="#star" />
          </svg>
        </label>
        <input id="s14" type="radio" name="str1">
        <label for="s14">
          <svg>
            <use xlink:href="#star" />
          </svg>
        </label>
        <input id="s15" type="radio" name="str1">
        <label for="s15">
          <svg>
            <use xlink:href="#star" />
          </svg>
        </label>
      </span>
      <span>9.9</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../../scss/config.scss';
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

.rating {
  color: rgb(255, 204, 0);

  $unit: 1.4em;
  display: inline-block;
  > input {
    display: none;
  }
  > label {
    display: inline-block;
    width: $unit;
    height: $unit;
    margin-right: $small-spacing/2;
    cursor: pointer;
    > svg {
      width: $unit;
      height: $unit;
    }
  }

  > input:checked ~ label > svg {
    fill: var(--fill-color--inactive, none);
    stroke: var(--border-color--inactive, rgba(black, $high-emphasis-opacity));
    stroke-width: var(--border-width--inactive, var(--border-width, 0.06em));
  }
  > label > svg,
  > input:checked + label > svg {
    fill: var(--fill-color, currentColor);
    stroke: var(--border-color, rgba(black, $high-emphasis-opacity));
    stroke-width: var(--border-width, 0.06em);
  }
  > input:checked + label > svg {
    animation: wobble 0.8s ease-out;
  }
}
</style>
