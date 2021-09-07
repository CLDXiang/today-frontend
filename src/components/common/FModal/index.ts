import Modal from './Modal.vue';
import confirm from './confirm';

Modal.confirm = confirm;

export default Modal as typeof Modal & {
  readonly confirm: typeof confirm;
};
