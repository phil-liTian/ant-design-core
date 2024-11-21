import { defineComponent, ref } from 'vue'
import initDefaultProps from '../_utils/props-util'
import { checkboxProps } from '../checkbox/interface'
import classNames from '../_utils/classNames'

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
      return (
        <span class={classString}>
          <input ref={inputRef} />
          <span class={`${prefixCls}-inner`} />
        </span>
      )
    }
  },
})
