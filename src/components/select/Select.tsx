import { defineComponent } from 'vue'
import VcSelect, { selectProps } from '../vc-select'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import initDefaultProps from '../_utils/props-util'
import useStyle from './style'

export default defineComponent({
  name: 'PSelect',
  props: initDefaultProps(selectProps(), {}),
  setup(props) {
    const { prefixCls } = useConfigInject('select', props)
    const [WrapSSR] = useStyle(prefixCls)

    return () => WrapSSR(<VcSelect prefixCls={prefixCls.value} />)
  },
})
