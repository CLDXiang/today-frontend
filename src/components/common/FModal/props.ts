import { PropType } from 'vue';

export const ModalProps = {
  /** 是否可见（v-model） */
  visible: { type: Boolean, required: false },
  /** 是否显示右上关闭按钮 */
  closable: { type: Boolean, default: true },
  /** 标题 */
  title: { type: String, default: '' },
  /** 确认按钮文字 */
  okText: { type: String, default: '确定' },
  /** 确认按钮类型
   * - 参考 FButton type
   */
  okType: {
    type: String as PropType<'primary' | 'normal' | 'danger' | 'link'>,
    default: 'primary',
  },
  /** 取消按钮文字 */
  cancelText: { type: String, default: '取消' },
  /** 取消按钮类型
   * - 参考 FButton type
   */
  cancelType: {
    type: String as PropType<'primary' | 'normal' | 'danger' | 'link'>,
    default: 'normal',
  },
  /** 是否显示遮罩 */
  mask: { type: Boolean, default: true },
  /** 点击遮罩是否允许关闭 */
  maskClosable: { type: Boolean, default: true },
};
