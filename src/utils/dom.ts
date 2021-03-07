/* eslint-disable @typescript-eslint/no-explicit-any */
/** 封装 addEventListener，提供 remove 方法 */
export function addEventListener(
  target: Window | Document | HTMLElement,
  eventType: any,
  cb: (this: HTMLElement, ev: any) => any,
) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb);
  }
  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}
