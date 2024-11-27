import { BooleanType, FunctionType, StringType, tuple } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { InputStatus } from '../_utils/statusUtils'

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
  placeholder: PropTypes.oneOfType([String, Object]),
  type: StringType<'text' | 'week' | 'tel' | 'password'>('text'),
  status: StringType<InputStatus>(),
})
