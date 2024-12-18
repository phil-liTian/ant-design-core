import { FunctionType, StringType } from '@/components/_utils/type'
import { defineComponent } from 'vue'
import SingleSelector from './SingleSelector'
import MultipleSelector from './MultipleSelector'
import PropTypes from '@/components/_utils/vue-types'
import type { Mode } from '../BaseSelect'

const Selector = defineComponent({
  name: 'Selector',
  props: {
    mode: StringType<Mode>('combobox'),
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

    const onMouseDown = (e) => {
      e.preventDefault()
      // props.onToggleOpen()
    }

    return () => {
      const { mode, prefixCls, domRef } = props

      const selectNode =
        mode === 'multiple' || mode === 'tags' ? (
          <MultipleSelector {...props} />
        ) : (
          <SingleSelector {...props} />
        )

      return (
        <div
          ref={domRef}
          onMousedown={onMouseDown}
          onClick={handleClick}
          class={`${prefixCls}-selector`}
        >
          {selectNode}
        </div>
      )
    }
  },
})

export default Selector
