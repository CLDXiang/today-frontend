import {
  defineComponent, PropType, ref, Teleport,
} from 'vue';
import log from '@/utils/log';
import { addEventListener, cloneElement } from './utils';

export default defineComponent({
  props: {
    /** 触发方式 */
    trigger: { type: String as PropType<'hover' | 'click'>, default: 'hover' },
  },
  setup(props) {
    const visible = ref(false);
    const setVisible = (value: boolean) => {
      visible.value = value;
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

    const handleUpdate = () => {
      if (visible.value) {
        if (props.trigger === 'click') {
          if (!clickOutsideHandler.value) {
            clickOutsideHandler.value = addEventListener(document, 'mousedown', () =>
              setVisible(false));
          }
          if (!touchOutsideHandler.value) {
            touchOutsideHandler.value = addEventListener(document, 'touchstart', () =>
              setVisible(false));
          }
        }
      } else {
        clearOutsideHandler();
      }
    };

    return {
      visible,
      setVisible,
      clearOutsideHandler,
      handleUpdate,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.handleUpdate();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.handleUpdate();
    });
  },
  beforeUnmount() {
    this.clearOutsideHandler();
  },
  render() {
    const defaultSlots = this.$slots.default?.();
    if (!defaultSlots || defaultSlots.length > 1) {
      log.error('FPopover 必须有且仅有一个 default 子元素');
    }

    const defaultSlotsProps: Record<string, any> = {};

    if (this.$props.trigger === 'click') {
      defaultSlotsProps.onClick = () => this.setVisible(!this.visible);
    } else if (this.$props.trigger === 'hover') {
      defaultSlotsProps.onMouseenter = () => this.setVisible(true);
      defaultSlotsProps.onMouseleave = () => this.setVisible(false);
    }
    const triggerNode = cloneElement(defaultSlots?.[0], defaultSlotsProps);
    return (
      <>
        {triggerNode}
        <Teleport to="body">
          <div class={`fixed top-0 left-0 w-full ${this.visible ? '' : 'hidden'}`}>
            {this.$slots.content?.()}
          </div>
        </Teleport>
      </>
    );
  },
});
