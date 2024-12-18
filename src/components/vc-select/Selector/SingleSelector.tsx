import PropTypes from '@/components/_utils/vue-types'
import { computed, defineComponent } from 'vue'

const props = {
  prefixCls: String,
  values: PropTypes.array,
  placeholder: PropTypes.any,
}

const SingleSelector = defineComponent({
  name: 'SingleSelector',
  inheritAttrs: false,
  props,
  setup(props) {
    const renderPlaceholder = () => {
      const { prefixCls, values } = props
      if (values[0]) return null
      return <div class={`${prefixCls}-selection-placeholder`}>{props.placeholder}</div>
    }

    const title = computed(() => {
      const { values } = props
      const item = values[0] as any

      return item && (typeof item.label === 'number' || typeof item.label === 'string')
        ? item.label.toString()
        : undefined
    })

    return () => {
      const { prefixCls, values } = props
      const item = values[0]
      let titleNode = null
      if (item) {
      }

      return (
        <>
          <div class={`${prefixCls}-selection-search`}></div>
          {title.value && <span class={`${prefixCls}-selection-item`}>{title.value}</span>}
          {/* placeholder */}
          {renderPlaceholder()}
        </>
      )
    }
  },
})

export default SingleSelector
