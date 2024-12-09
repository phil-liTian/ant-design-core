import { defineComponent } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import VcInput from '../vc-input/Input'
import { inputProps } from './inputProps'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'

export default defineComponent({
  name: 'PInput',
  props: inputProps(),

  setup(props, { slots, emit }) {
    const { prefixCls, size, direction } = useConfigInject('input', props)
    const [wrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value

    const triggerChange = (e) => {
      emit('update:value', e.target.value)
    }

    return () => {
      const {
        suffix = slots.suffix?.(),
        prefix = slots.prefix?.(),
        addonAfter = slots.addonAfter?.(),
        addonBefore = slots.addonBefore?.(),
        ...rest
      } = props

      const clearIcon = slots.clearIcon || (() => <CloseCircleFilled />)

      return wrapSSR(
        <VcInput
          {...rest}
          onChange={triggerChange}
          prefixCls={prefixClsValue}
          prefix={prefix}
          suffix={suffix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          v-slots={{ clearIcon }}
        />,
      )
    }
  },
})
