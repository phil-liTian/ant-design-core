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
  defaultValue: ArrayType<CheckboxValueType>(),
  value: ArrayType<CheckboxValueType>(),
  onChange: FunctionType<(checkedValues: CheckboxValueType[], e) => void>(),
})

export const checkboxProps = () => ({
  ...abstractCheckboxProps(),
  indeterminate: BooleanType(false),
})

export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>
export type CheckboxGroupProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>>

export interface CheckboxGroupContext {
  name: ComputedRef<string>
  disabled: Ref<boolean>
  toggleOption: (option: CheckOptionType) => void
  mergedValue: Ref<CheckboxValueType[]>
}

export const CheckboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('CheckboxGroupContext')
