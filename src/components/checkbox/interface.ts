import type { ExtractPropTypes } from 'vue'
import PropTypes from '../_utils/vue-types'
import { BooleanType } from '../_utils/type'

export type CheckboxValueType = string | number | boolean

export const abstractCheckboxGroupProps = () => {
  return {
    name: String,
    prefixCls: String,
    disabled: Boolean,
    id: String,
  }
}

export const abstractCheckboxProps = () => {
  return {
    value: PropTypes.any,
    checked: BooleanType(),
    disabled: BooleanType(),
    indeterminate: BooleanType(),
  }
}

export const checkboxProps = () => ({
  ...abstractCheckboxProps(),
  indeterminate: BooleanType(false),
})

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>
