import { StringType } from '@/components/_utils/type'
import { defineComponent } from 'vue'
import SingleSelector from './SingleSelector'
import MultipleSelector from './MultipleSelector'

const Selector = defineComponent({
  name: 'Selector',
  props: {
    mode: StringType<'single' | 'multiple'>('single'),
    prefixCls: String,
    values: [],
  },
  setup(props) {
    return () => {
      const { mode } = props

      const selectNode = mode === 'single' ? <SingleSelector {...props} /> : <MultipleSelector />

      return <div>{selectNode}</div>
    }
  },
})

export default Selector
