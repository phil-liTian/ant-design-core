import { defineComponent, type VNodeTypes } from 'vue'
import { FunctionType } from '../_utils/type'

export default defineComponent({
  name: 'LocaleReceiver',
  props: {
    children: FunctionType<() => VNodeTypes>(),
  },
  setup(props, { slots }) {
    return () => {
      const children = slots.children || slots.default

      return children?.()
    }
  },
})
