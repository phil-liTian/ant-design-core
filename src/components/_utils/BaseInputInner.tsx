import { defineComponent, ref, type PropType } from 'vue'
import PropTypes from './vue-types'
import { FunctionType } from './type'

export default defineComponent({
  props: {
    tag: PropTypes.oneOf(['input', 'textarea']).def('input'),
    value: PropTypes.any,
    onChange: FunctionType<(e) => void>(),
    onInput: Function as PropType<(e) => void>,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  },
  setup(props, { expose }) {
    const inputRef = ref()

    expose({
      input: inputRef,
    })
    return () => {
      const { tag: Tag, value, ...restProps } = props

      // @ts-ignore
      return <Tag ref={inputRef} {...restProps} value={value} />
    }
  },
})
