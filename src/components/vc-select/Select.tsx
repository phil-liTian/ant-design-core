import { computed, defineComponent, type ExtractPropTypes } from 'vue'
import BaseSelect from './BaseSelect'
import { ArrayType, ObjectType } from '../_utils/type'
import initDefaultProps from '../_utils/props-util'

export interface FieldNames {
  value?: String
  label?: String
  options?: String
}

export interface BaseOptionType {
  disabled?: boolean
  [name: string]: any
}

export interface DefaultOptionType extends BaseOptionType {
  label?: any
  value?: string | number | null
  children?: Omit<DefaultOptionType, 'children'>[]
}

export function selectProps<
  ValueType = any,
  OptionType extends BaseOptionType = DefaultOptionType,
>() {
  return {
    prefixCls: String,

    // fieldNames
    fieldNames: ObjectType<FieldNames>(),

    // options
    options: ArrayType<OptionType[]>(),
  }
}

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>

export default defineComponent({
  name: 'VcSelect',
  props: initDefaultProps(selectProps(), {
    prefixCls: 'vc-select',
  }),
  setup(props) {
    const displayValues = computed(() => [])
    return () => (
      <BaseSelect
        // >>> value
        displayValues={displayValues.value}
      />
    )
  },
})
