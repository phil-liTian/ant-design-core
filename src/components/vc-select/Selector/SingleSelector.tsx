import PropTypes from '@/components/_utils/vue-types'
import { defineComponent } from 'vue'

const props = {
  prefixCls: String,
  values: PropTypes.array,
}

const SingleSelector = defineComponent({
  name: 'SingleSelector',
  inheritAttrs: false,
  props,
  setup(props) {
    const renderPlaceholder = () => {
      const { prefixCls, values } = props
      if (values[0]) return null
      return <div class={`${prefixCls}-selection-placeholder`}>renderPlaceholder</div>
    }

    return () => {
      const { prefixCls } = props
      return (
        <>
          <div class={`${prefixCls}-selection-search`}></div>
          {/* placeholder */}
          {renderPlaceholder()}
        </>
      )
    }
  },
})

export default SingleSelector
