import initDefaultProps from '@/components/_utils/props-util'
import dialogPropTypes from '@/components/_utils/props-util'
import { ObjectType } from '@/components/_utils/type'
import { computed, defineComponent } from 'vue'
import type { ModalFuncProps } from '../Modal'
import ConfirmDialog from '../ConfirmDialog'
import { useConfigContextInject } from '@/components/config-provider/context'

const comfirmFuncProps = () => ({
  config: ObjectType<Partial<ModalFuncProps>>(),
  open: Boolean,
})

export default defineComponent({
  name: 'HookModal',
  props: initDefaultProps(comfirmFuncProps(), {
    config: {
      width: 520,
    },
  }),
  setup(props) {
    const { getPrefixCls } = useConfigContextInject()
    const prefixCls = getPrefixCls!('modal')
    const rootPrefixCls = getPrefixCls!()
    const open = computed(() => props.open)
    const innerConfig = computed(() => props.config)
    return () => (
      <ConfirmDialog
        rootPrefixCls={rootPrefixCls}
        prefixCls={prefixCls}
        open={open.value}
        {...innerConfig.value}
      />
    )
  },
})
