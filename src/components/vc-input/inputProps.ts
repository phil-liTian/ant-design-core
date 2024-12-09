import { BooleanType, FunctionType, StringType, tuple, type VueNode } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { InputStatus } from '../_utils/statusUtils'
import type { PropType } from 'vue'

interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number; value?: string }) => VueNode
}

export const commonInputProps = () => {
  return {
    addonBefore: PropTypes.any,
    addonAfter: PropTypes.any,
    prefix: PropTypes.any,
    suffix: PropTypes.any,
    clearIcon: PropTypes.any,
    allowClear: BooleanType(undefined),
  }
}

export const baseInputProps = () => {
  return {
    ...commonInputProps(),
    value: PropTypes.oneOfType([String, Number]),
    defaultValue: PropTypes.oneOfType([String, Number]),
    inputElement: PropTypes.any,
    prefixCls: StringType(),
    disabled: BooleanType(),
    handleReset: FunctionType<(e) => void>(),
  }
}

export const inputProps = () => ({
  ...baseInputProps(),
  placeholder: PropTypes.string,
  type: StringType<'text' | 'week' | 'tel' | 'password'>('text'),
  status: StringType<InputStatus>(),
  maxlength: Number,
  showCount: {
    type: [Boolean, Object],
  },
})
