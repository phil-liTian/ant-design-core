import { defineComponent } from 'vue'
import PropTypes from './vue-types'
import { FunctionType } from './type'

export default defineComponent({
  props: {
    tag: PropTypes.oneOf(['input', 'textarea']).def('input'),
    value: PropTypes.any,
    onChange: FunctionType<(e) => void>(),
    placeholder: PropTypes.string,
    type: PropTypes.string,
  },
  setup(props) {
    return () => {
      const { tag: Tag, value, ...restProps } = props
      // @ts-ignore
      return <Tag {...restProps} value={value} />
    }
  },
})
