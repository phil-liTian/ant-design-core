import type { ComputedRef, ExtractPropTypes, InjectionKey, Ref } from 'vue'
import PropTypes from '../_utils/vue-types'
import { ArrayType, BooleanType, FunctionType, type VueNode } from '../_utils/type'

export type CheckboxValueType = string | number | boolean

export interface CheckOptionType {
  label?: VueNode
  value: CheckboxValueType
  disabled?: boolean
  indeterminate?: boolean
  onChange?: (e) => void
}

export const abstractCheckboxGroupProps = () => {
  return {
    name: String,
    prefixCls: String,
    disabled: Boolean,
    id: String,
    options: ArrayType<string | number | CheckOptionType>([]),
  }
}

export const abstractCheckboxProps = () => {
  return {
    prefixCls: String,
    value: PropTypes.any,
    checked: BooleanType(),
    disabled: BooleanType(),
    indeterminate: BooleanType(),
    onChange: FunctionType<(e) => void>(),
  }
}

export const checkboxGroupProps = () => ({
  ...abstractCheckboxGroupProps(),
})

export const checkboxProps = () => ({
  ...abstractCheckboxProps(),
  indeterminate: BooleanType(false),
})

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>

export interface CheckboxGroupContext {
  name: ComputedRef<string>
  disabled: Ref<boolean>
}

export const CheckboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('CheckboxGroupContext')
