import { defineComponent, type VNode } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import PropTypes from '../_utils/vue-types'
import { anyType, BooleanType, StringType, type VueNode } from '../_utils/type'
import { cloneElement } from '../_utils/vnode'
import classNames from '../_utils/classNames'

const ClearableInputType = ['text', 'input']
export default defineComponent({
  name: 'ClearableLabeledInput',
  props: {
    prefixCls: PropTypes.string,
    inputType: StringType<'input' | 'text'>('input'),
    element: PropTypes.any,
    allowClear: BooleanType(false),
    disabled: BooleanType(false),
    value: anyType<VueNode>(),
    suffix: PropTypes.any,
  },
  setup(props, { slots }) {
    const renderClearIcon = (prefixCls: string) => {
      const { value, suffix = slots.suffix } = props

      const className = `${prefixCls}-clear-icon`
      const needClear = value && !props.disabled

      return (
        <CloseCircleFilled
          class={classNames(className, {
            [`${className}-hidden`]: !needClear,
            [`${className}-has-suffix`]: !!suffix,
          })}
          role="button"
        />
      )
    }

    const renderTextAreaWithClearIcon = (prefixCls: string, element: VNode) => {
      const { allowClear, value, disabled } = props

      if (!allowClear) {
        return cloneElement(element, { value, disabled })
      }

      return (
        <span>
          {cloneElement(element, { value, disabled })} {renderClearIcon(prefixCls)}
        </span>
      )
    }

    return () => {
      const { inputType, prefixCls, element = slots.element?.() } = props
      if (inputType === ClearableInputType[0]) {
        return renderTextAreaWithClearIcon(prefixCls, element)
      }
      return null
    }
  },
})
