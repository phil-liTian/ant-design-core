import { triggerVNodeUpdate } from '../_utils/vnode'
import ConfirmDialog from './ConfirmDialog'
import type { ModalFuncProps } from './Modal'
import { createVNode, render as vueRender } from 'vue'

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void
  update: (config: ConfigUpdate) => ConfigUpdate
}

/**
 * 处理Modal.methods()
 * @param config
 */
const confirm = (config: ModalFuncProps) => {
  const container = document.createDocumentFragment()
  let confirmDialogInstance: any = null
  let currentConfig = {
    ...config,
    close,
    open: true,
  } as any

  function destroy() {
    if (confirmDialogInstance) {
      vueRender(null, container as any)
      confirmDialogInstance = null
    }
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (currentConfig.afterClose) {
          currentConfig.afterClose()
        }
        // 关闭之后 销毁当前vnode
        destroy()
      },
    }

    update(currentConfig)
  }

  // 更新支持对象和函数两种 更新方式
  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig)
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      }
    }
    if (confirmDialogInstance) {
      triggerVNodeUpdate(confirmDialogInstance, currentConfig, container as any)
    }
  }

  const Wrapper = (p: ModalFuncProps) => {
    return <ConfirmDialog {...p} />
  }

  function render(props: ModalFuncProps) {
    // 创建一个vnode
    const vm = createVNode(Wrapper, { ...props })
    vueRender(vm, container as any)
    return vm
  }

  confirmDialogInstance = render(currentConfig)

  return {
    destroy: close,
    update,
  }
}

export default confirm

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'warning',
  }
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'info',
  }
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
  }
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
  }
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  }
}
