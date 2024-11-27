import { defineComponent } from 'vue'
import VcInput from '../vc-input/Input'
import { inputProps } from './inputProps'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'

export default defineComponent({
  name: 'PInput',
  props: inputProps(),

  setup(props, { slots }) {
    const { prefixCls, size, direction } = useConfigInject('input', props)
    const [wrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value

    return () => {
      const {
        suffix = slots.suffix?.(),
        prefix = slots.prefix?.(),
        addonAfter = slots.addonAfter?.(),
        addonBefore = slots.addonBefore?.(),
      } = props
      return wrapSSR(
        <VcInput
          prefixCls={prefixClsValue}
          suffix={suffix}
          prefix={prefix}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
        />,
      )
    }
  },
})
