import { onMounted, ref, Ref } from 'vue';
import debounce from 'lodash.debounce';
import logger from '@/utils/log';

/**
 * 使得对应 ref 的容器滚动到底部时触发回调函数
 * @param cb 滚动到底部时触发的回调函数
 * @param bottom 距离底部多少 px 时执行回调，默认 0
 * @param enable 是否生效
 * @param delay 防抖延迟，默认 150
 */
export const useScrollToBottom: (
  cb: (() => void) | (() => Promise<void>),
  bottom?: number,
  enable?: boolean,
  delay?: number,
) => { scrollRef: Ref<HTMLElement | undefined>; pending: Ref<boolean> } = (
  cb,
  bottom = 0,
  enable = true,
  delay = 150,
) => {
  const scrollRef = ref<HTMLElement>();
  const pending = ref<boolean>(false);

  onMounted(() => {
    const el = scrollRef.value;
    if (el) {
      el.addEventListener(
        'scroll',
        debounce(async () => {
          if (!el || !enable) {
            return;
          }
          const { offsetHeight, scrollTop, scrollHeight } = el;
          logger.info(offsetHeight + scrollTop - scrollHeight, bottom - 1);
          if (offsetHeight + scrollTop - scrollHeight >= -bottom - 1) {
            pending.value = true;
            // 需要执行的代码
            await cb();
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
