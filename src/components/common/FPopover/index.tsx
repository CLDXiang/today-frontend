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
import { cloneElement } from './utils';
import { PlacementType } from './types';
import { ContentWrapper } from './components';

export default defineComponent({
  props: {
    visible: { type: Boolean, required: false },
    /** 触发方式 */
    trigger: { type: String as PropType<'hover' | 'click'>, default: 'hover' },
    /** 相对目标元素的位置 */
    placement: {
      type: String as PropType<PlacementType>,
      default: 'top',
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    /** 是否可见 */
    const isVisible = ref(props.visible ?? false);
    const setIsVisible = (value: boolean) => {
      isVisible.value = value;
      emit('update:visible', value);
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

    return {
      isVisible,
      setIsVisible,
      clearOutsideHandler,
      handleUpdate,
      defaultRef,
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
      defaultSlotsProps.onClick = () => this.setIsVisible(!this.isVisible);
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
            enter-active-class="transition ease-out duration-150 transform"
            enter-from-class="opacity-0 scale-50"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-100 transform"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-50"
          >
            <ContentWrapper
              visible={this.isVisible}
              content={this.$slots.content?.() as VNode | undefined}
              target={this.defaultRef}
              placement={this.placement}
            />
          </Transition>
        </Teleport>
      </>
    );
  },
});
