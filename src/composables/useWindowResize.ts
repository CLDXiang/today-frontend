import {
  onBeforeUnmount, onMounted, ref,
} from 'vue';
import { addEventListener } from '@/utils/dom';

/**
 * 窗口 resize 时执行回调函数
 * @param cb 滚动到底部时触发的回调函数
 */
export const useWindowResize = (cb: (() => void) | (() => Promise<void>)) => {
  const resizeEventHandler = ref<{ remove:() => void } | null>(null);

  onMounted(() => {
    if (!resizeEventHandler.value) {
      addEventListener(window, 'resize', cb);
    }
  });

  onBeforeUnmount(() => {
    resizeEventHandler.value?.remove();
    resizeEventHandler.value = null;
  });
};
