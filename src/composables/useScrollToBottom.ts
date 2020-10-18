import {
  onMounted, ref, Ref,
} from 'vue';
import debounce from 'lodash.debounce';

/**
 * 使得对应 ref 的容器滚动到底部时触发回调函数
 * @param callback 滚动到底部时触发的回调函数
 * @param delay 防抖延迟，默认 150
 */
const useScrollToBottom: (
  callback: (() => void) | (() => Promise<void>),
  delay?: number,
) => { scrollRef: Ref<HTMLElement | undefined> } = (callback, delay = 150) => {
  const scrollRef = ref<HTMLElement>();
  const pending = ref<boolean>(false);

  onMounted(() => {
    const el = scrollRef.value;
    if (el) {
      el.addEventListener(
        'scroll',
        debounce(async () => {
          if (!el) {
            return;
          }
          const { offsetHeight, scrollTop, scrollHeight } = el;
          if (offsetHeight + scrollTop - scrollHeight >= -1) {
            pending.value = true;
            // 需要执行的代码
            await callback();
            pending.value = false;
          }
        }, delay),
      );
    }
  });
  return {
    /** 滚动容器 ref，直接在 setup return 到对应 ref 名即可 */
    scrollRef,
    /** 是否正在执行回调函数 */
    pending,
  };
};

export default useScrollToBottom;
