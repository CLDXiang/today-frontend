import {
  defineComponent,
  PropType,
  ref,
  Teleport,
  VNode,
  Transition,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeUnmount,
} from 'vue';
import log from '@/utils/log';
import { addEventListener } from '@/utils/dom';
import { cloneElement, mapAnimationToTransitionClassNames } from './utils';
import { PlacementType, AnimationType } from './types';
import { ContentWrapper } from './components';

export default defineComponent({
  props: {
    /** 是否可见（v-model） */
    visible: { type: Boolean, required: false },
    /** 触发方式 */
    trigger: { type: String as PropType<'hover' | 'click'>, default: 'hover' },
    /** 相对目标元素的位置 */
    placement: {
      type: String as PropType<PlacementType>,
      default: 'top',
    },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 对于超出视口边界的情况，是否尽量通过调整位置限制在视口内 */
    adjustPlacement: { type: Boolean, default: true },
    /** 显隐动画效果 */
    animation: {
      type: String as PropType<AnimationType>,
      default: 'scale',
    },
  },
  emits: ['update:visible', 'visibleChange'],
  setup(props, { emit }) {
    /** 是否可见 */
    const isVisible = ref(props.visible ?? false);
    const setIsVisible = (value: boolean) => {
      if (value === isVisible.value || props.disabled) {
        return;
      }
      isVisible.value = value;
      emit('update:visible', value);
      emit('visibleChange', value);
    };

    const clickOutsideHandler = ref<{ remove:() => void } | null>(null);
    const touchOutsideHandler = ref<{ remove:() => void } | null>(null);

    const clearOutsideHandler = () => {
      if (clickOutsideHandler.value) {
        clickOutsideHandler.value.remove();
        clickOutsideHandler.value = null;
      }
      if (touchOutsideHandler.value) {
        touchOutsideHandler.value.remove();
        touchOutsideHandler.value = null;
      }
    };

    const defaultRef = ref<HTMLElement | undefined>(undefined);

    const handleUpdate = () => {
      // if (visible.value) {
      if (props.trigger === 'click') {
        if (!clickOutsideHandler.value) {
          clickOutsideHandler.value = addEventListener(document, 'mousedown', () =>
            setIsVisible(false));
        }
        if (!touchOutsideHandler.value) {
          touchOutsideHandler.value = addEventListener(document, 'touchstart', () =>
            setIsVisible(false));
        }
      }
      // } else {
      //   clearOutsideHandler();
      // }
    };

    onMounted(async () => {
      await nextTick();
      handleUpdate();
    });

    onUpdated(async () => {
      await nextTick();
      handleUpdate();
    });

    onBeforeUnmount(() => {
      clearOutsideHandler();
    });

    /** 用于 Transition 的类名 */
    const transitionClassNames = mapAnimationToTransitionClassNames(props.animation);

    return {
      isVisible,
      setIsVisible,
      clearOutsideHandler,
      handleUpdate,
      defaultRef,
      transitionClassNames,
    };
  },
  render() {
    const defaultSlots = this.$slots.default?.();
    if (!defaultSlots || defaultSlots.length > 1) {
      log.error('FPopover 必须有且仅有一个 default 子元素');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultSlotsProps: Record<string, any> = {
      ref: 'defaultRef',
    };

    if (this.$props.trigger === 'click') {
      defaultSlotsProps.onMousedown = (e: MouseEvent) => {
        this.setIsVisible(!this.isVisible);
        e.stopPropagation();
      };
      defaultSlotsProps.onTouchstart = (e: MouseEvent) => {
        e.stopPropagation();
      };
    } else if (this.$props.trigger === 'hover') {
      defaultSlotsProps.onMouseenter = () => this.setIsVisible(true);
      defaultSlotsProps.onMouseleave = () => this.setIsVisible(false);
    }
    const triggerNode = cloneElement(defaultSlots?.[0], defaultSlotsProps);

    return (
      <>
        {triggerNode}
        <Teleport to="body">
          <Transition
            enter-active-class={this.transitionClassNames.enterActive}
            enter-from-class={this.transitionClassNames.enterFrom}
            enter-to-class={this.transitionClassNames.enterTo}
            leave-active-class={this.transitionClassNames.leaveActive}
            leave-from-class={this.transitionClassNames.leaveFrom}
            leave-to-class={this.transitionClassNames.leaveTo}
          >
            <ContentWrapper
              visible={this.isVisible}
              content={this.$slots.content?.() as VNode | undefined}
              target={this.defaultRef}
              placement={this.placement}
              adjustPlacement={this.adjustPlacement}
            />
          </Transition>
        </Teleport>
      </>
    );
  },
});
