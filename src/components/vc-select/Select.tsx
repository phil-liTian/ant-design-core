import { defineComponent, type ExtractPropTypes } from 'vue'
import BaseSelect from './BaseSelect'
import { ObjectType } from '../_utils/type'
import initDefaultProps from '../_utils/props-util'

export interface FieldNames {
  value?: String
  label?: String
  options?: String
}

export const selectProps = () => ({
  prefixCls: String,

  // fieldNames
  fieldNames: ObjectType<FieldNames>(),
})

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>

export default defineComponent({
  name: 'VcSelect',
  props: initDefaultProps(selectProps(), {
    prefixCls: 'vc-select',
  }),
  setup(props) {
    return () => <BaseSelect />
  },
})
