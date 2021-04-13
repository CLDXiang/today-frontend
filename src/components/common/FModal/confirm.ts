import {
  createApp, h,
} from 'vue';
import { ModalContentWrapper } from './components';

interface ModalConfirmProps {
  /** 是否显示右上关闭按钮 */
  closable?: boolean;
  /** 标题 */
  title?: string;
  /** 确认按钮文字 */
  okText?: string;
  /** 确认按钮类型 */
  okType?: 'primary' | 'normal' | 'danger' | 'link';
  /** 取消按钮文字 */
  cancelText?: string;
  /** 取消按钮类型 */
  cancelType?: 'primary' | 'normal' | 'danger' | 'link';
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否允许关闭 */
  maskClosable?: boolean;
  /** 内容 */
  content: string;
  /** 点击确认回调 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOk?: () => any;
  /** 点击取消回调 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCancel?: () => any;
}

const confirm = (props: ModalConfirmProps) => {
  const div = document.createElement('div');
  div.className = 'w-full h-0 fixed top-0 left-0 overflow-visible';
  div.style.zIndex = '990';
  document.body.appendChild(div);

  /** 组件实例，不知道为什么无论如何无法和 createApp 的返回类型对上，就用了 any */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let confirmModalInstance: any = null;

  const {
    content,
    onOk,
    onCancel,
    ...currentProps
  } = props;

  /** 传入组件的 Props */
  const confirmModalProps = {
    visible: false,
    ...currentProps,
  };

  /** 销毁组件实例 */
  function close() {
    if (confirmModalInstance && div.parentNode) {
      confirmModalInstance.vIf = false;
      confirmModalInstance = null;
      div.parentNode.removeChild(div);
    }
  }

  confirmModalInstance = createApp({
    data() {
      return {
        confirmModalProps,
        vIf: true,
      };
    },
    render() {
      // 在 JSX 中使用 Vue SFC 组件会没法识别 Props 类型，只好用原生渲染函数写了
      return this.vIf
        ? h(
          ModalContentWrapper,
          {
            ...this.confirmModalProps,
            onOk: () => {
              onOk?.();
              // 0.5 秒后自动销毁，给隐藏动画预留时间
              setTimeout(() => close(), 500);
            },
            onCancel: () => {
              onCancel?.();
              // 0.5 秒后自动销毁,给隐藏动画预留时间
              setTimeout(() => close(), 500);
            },
          },
          () => content,
        )
        : null;
    },
  }).mount(div);

  if (confirmModalInstance) {
    /* 为了有显示时的动画效果，需要先通过 visible: false 状态生成实例，
        再将 visible 改为 true 实现。这里通过修改实例对象本身 $data 的
        confirmModalProps 值触发其更新。 */
    Object.assign(confirmModalInstance, {
      confirmModalProps: {
        ...confirmModalProps,
        visible: true,
      },
    });
  }

  return {
    close,
  };
};

export default confirm;
