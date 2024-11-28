import { defineComponent } from 'vue'
import SelectTrigger from './SelectTrigger'
import type { VueNode } from '../_utils/type'

export default defineComponent({
  name: 'BaseSelect',
  setup() {
    return () => {
      // >>> selector
      const SelectorNode = <SelectTrigger />

      let renderNode: VueNode

      renderNode = <div>{SelectorNode}</div>
      return renderNode
    }
  },
})
