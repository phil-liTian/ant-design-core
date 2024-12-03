import type { VueNode } from '@/components/_utils/type'
import { computed, defineComponent, shallowRef, type MaybeRef } from 'vue'
import type { ModalFuncProps } from '../Modal'
import type { ModalStaticFunctions } from '../confirm'
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm'
import HookModal from './HookModal'

const ElementHolder = defineComponent({
  name: 'ElementHolder',
  setup() {
    return () => <div>12312</div>
  },
})

export type ModalFuncWithRef = (props: MaybeRef<ModalFuncProps>) => {
  destroy: () => void
  update: (config: ModalFuncProps) => void
}

function useModal(): readonly [
  Omit<ModalStaticFunctions<ModalFuncWithRef>, 'warn'>,
  () => VueNode,
] {
  const getConfirmFunc = (withFunc: (props: ModalFuncProps) => ModalFuncProps): ModalFuncWithRef =>
    function hookConfirm(props: MaybeRef<ModalFuncProps>) {
      const open = shallowRef(true)

      const Modal = () => <HookModal open={open.value} />
      return {
        destroy: () => {},
        update: () => {},
      }
    }

  const fns = computed(() => ({
    info: getConfirmFunc(withInfo),
    warning: getConfirmFunc(withWarn),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    confirm: getConfirmFunc(withConfirm),
  }))

  return [fns.value, () => <ElementHolder />]
}

export default useModal
