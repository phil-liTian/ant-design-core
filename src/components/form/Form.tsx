import { defineComponent, type ExtractPropTypes } from 'vue'
import FormItem from './FormItem'
import { BooleanType, FunctionType, ObjectType, someType, StringType, tuple } from '../_utils/type'
import type { SizeType } from '../config-provider/index'
import PropTypes from '../_utils/vue-types'
import type { ColProps } from '../grid'
import type { FormLabelAlign } from './interface'

export const formProps = () => ({
  prefixCls: String,
  name: String,
  layout: PropTypes.oneOf(tuple('horizontal', 'inline', 'vertical')),
  labelCol: ObjectType<ColProps>(),
  wrapperCol: ObjectType<ColProps>(),
  colon: BooleanType(),
  labelAlign: StringType<FormLabelAlign>(),
  labelWrap: BooleanType(),
  size: StringType<SizeType>(),

  // value
  disabled: BooleanType(),
  model: PropTypes.object,
  onSubmit: FunctionType<(e: Event) => void>(),
  validateTrigger: someType<string | string[]>([String, Array]),
  onValuesChange: FunctionType<(changedValues: any, values: any) => void>(),
})

export type FormProps = Partial<ExtractPropTypes<ReturnType<typeof formProps>>>

const Form = defineComponent({
  name: 'PForm',
  inheritAttrs: false,
  Item: FormItem,
  props: formProps(),
  setup(props, { slots, attrs }) {
    return () => {
      return <form {...attrs}>{slots.default?.()}</form>
    }
  },
})

export default Form as typeof Form & {
  readonly Item: typeof FormItem
}
