import { defineComponent, type ExtractPropTypes } from 'vue'
import ResizeObserver from '../vc-resize-observer'
import { FunctionType, type VueNode } from '../_utils/type'

const props = {
  prefixCls: String,
  renderItem: FunctionType<(item: any) => VueNode>(),
  component: String,
}

export type OverflowProps = Partial<ExtractPropTypes<typeof props>>

const Overflow = defineComponent({
  name: 'Overflow',
  props,
  setup(props, { slots }) {
    return () => {
      const { component: Component = 'div' } = props

      const overflowNode = () => {
        return <Component>{slots.default?.()}</Component>
      }

      return <ResizeObserver v-slots={{ default: overflowNode }}></ResizeObserver>
    }
  },
})

export default Overflow
