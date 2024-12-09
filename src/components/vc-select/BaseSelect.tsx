import { defineComponent } from 'vue'
import SelectTrigger from './SelectTrigger'
import type { VueNode } from '../_utils/type'
import Selector from './Selector'
import initDefaultProps from '../_utils/props-util'

const baseSelectPrivateProps = () => ({
  prefixCls: String,
})

const baseSelectProps = () => ({
  ...baseSelectPrivateProps(),
})

export default defineComponent({
  name: 'BaseSelect',
  props: initDefaultProps(baseSelectProps(), {}),
  setup(props) {
    return () => {
      const { prefixCls } = props
      // >>> selector
      const SelectorNode = (
        <SelectTrigger
          prefixCls={prefixCls}
          v-slots={{ default: () => <Selector prefixCls={prefixCls} /> }}
        />
      )

      let renderNode: VueNode

      renderNode = <div>{SelectorNode}</div>
      return renderNode
    }
  },
})
