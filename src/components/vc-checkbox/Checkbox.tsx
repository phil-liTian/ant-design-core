import { computed, defineComponent, ref, watch } from 'vue'
import initDefaultProps from '../_utils/props-util'
import classNames from '../_utils/classNames'
import { BooleanType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'

export const checkboxProps = {
  prefixCls: String,
  type: String,
  checked: BooleanType(),
  defaultChecked: BooleanType(),
  value: PropTypes.any,
}

export default defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,
  props: initDefaultProps(checkboxProps, {
    prefixCls: 'rc-checkbox',
    type: 'checkbox',
  }),
  setup(props, { attrs, emit }) {
    const { prefixCls, type } = props
    const checked = ref(props.checked ?? props.defaultChecked)
    const inputRef = ref<HTMLInputElement>()

    watch(
      () => props.checked,
      () => {
        checked.value = props.checked!
      },
    )

    const handleChange = (e: any) => {
      // if (props.checked === undefined) {
      checked.value = e.target.checked
      // }

      const eventObj = {
        target: {
          ...props,
          checked: e.target.checked,
        },
      }

      inputRef.value!.checked = !!props.checked

      emit('change', eventObj)
    }

    return () => {
      const inputProps = {
        type,
        class: `${prefixCls}-input`,
        onChange: handleChange,
      }

      const classString = classNames(prefixCls, {
        [`${prefixCls}-checked`]: checked.value,
      })

      return (
        <span class={classString}>
          <input ref={inputRef} {...inputProps} />
          <span class={`${prefixCls}-inner`} />
        </span>
      )
    }
  },
})
