import type { ExtractPropTypes } from 'vue'
import { withInstall } from '../_utils/type'
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarn } from './confirm'
import Modal, { modalProps, type ModalFuncProps } from './Modal'
import destroyFns from './destroyFns'

function warnModal(config: ModalFuncProps) {
  return confirm(withWarn(config))
}

Modal.success = (config: ModalFuncProps) => {
  return confirm(withSuccess(config))
}

Modal.error = (config: ModalFuncProps) => {
  return confirm(withError(config))
}

Modal.confirm = (config: ModalFuncProps) => {
  return confirm(withConfirm(config))
}

Modal.info = (config: ModalFuncProps) => {
  return confirm(withInfo(config))
}

// 销毁所有Modal
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const closeFn = destroyFns.pop()
    closeFn?.()
  }
}

Modal.warn = warnModal
Modal.warning = warnModal

export default withInstall(Modal)

export type ModalProps = Partial<ExtractPropTypes<ReturnType<typeof modalProps>>>
