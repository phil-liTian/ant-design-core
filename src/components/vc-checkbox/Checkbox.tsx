import { defineComponent, ref } from 'vue'
import initDefaultProps from '../_utils/props-util'
import classNames from '../_utils/classNames'

export const checkboxProps = {
  prefixCls: String,
  type: String,
}

export default defineComponent({
  name: 'Checkbox',
  props: initDefaultProps(checkboxProps, {
    prefixCls: 'rc-checkbox',
    type: 'checkbox',
  }),
  setup(props) {
    const { prefixCls, type } = props
    const inputRef = ref<HTMLInputElement>()

    const classString = classNames(prefixCls)

    return () => {
      const inputProps = {
        type,
      }
      return (
        <span class={classString}>
          <input ref={inputRef} {...inputProps} />
          <span class={`${prefixCls}-inner`} />
        </span>
      )
    }
  },
})
