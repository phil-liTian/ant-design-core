import { FunctionType, StringType } from '@/components/_utils/type'
import { defineComponent } from 'vue'
import SingleSelector from './SingleSelector'
import MultipleSelector from './MultipleSelector'
import PropTypes from '@/components/_utils/vue-types'

const Selector = defineComponent({
  name: 'Selector',
  props: {
    mode: StringType<'single' | 'multiple'>('single'),
    prefixCls: String,
    values: PropTypes.array,

    // open
    onToggleOpen: FunctionType<(open?: boolean) => void>(),

    // ref
    domRef: Function,
    placeholder: PropTypes.any,
  },
  setup(props) {
    const handleClick = () => {
      props.onToggleOpen()
    }

    return () => {
      const { mode, prefixCls, domRef } = props

      const selectNode = mode === 'single' ? <SingleSelector {...props} /> : <MultipleSelector />

      return (
        <div ref={domRef} onClick={handleClick} class={`${prefixCls}-selector`}>
          {selectNode}
        </div>
      )
    }
  },
})

export default Selector
