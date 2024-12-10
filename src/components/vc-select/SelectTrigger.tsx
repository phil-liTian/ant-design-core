import { defineComponent } from 'vue'
import Trigger from '../vc-trigger'

export default defineComponent({
  name: 'SelectTrigger',
  props: {
    prefixCls: String,
  },
  setup(props, { slots }) {
    const { prefixCls } = props
    const dropdownPrefixCls = `${prefixCls}-dropdown`
    return () => <Trigger v-slots={{ default: slots.default }}></Trigger>
  },
})
