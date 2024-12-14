import { defineComponent } from 'vue'
import VcSelect, { selectProps as VcSelectProps } from '../vc-select'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import initDefaultProps from '../_utils/props-util'
import useStyle from './style'
import { FunctionType, someType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { SelectCommonPlacement } from '../_utils/transition'
import type { InputStatus } from '../_utils/statusUtils'
import type { SizeType } from '../config-provider'
import omit from '../_utils/omit'

type RawValue = string | number
export interface LabeledValue {
  key?: string
  label?: any
  value: RawValue
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export const selectProps = () => ({
  ...omit(VcSelectProps<SelectValue>(), ['mode']),
  // search
  bordered: { type: Boolean, default: true },
  suffixIcon: PropTypes.any,
  status: StringType<InputStatus>(''),
  mode: StringType<'multiple' | 'tags'>(),
  size: StringType<SizeType>('small'),

  // value
  value: someType<SelectValue>([Array, Object, String, Number]),
  defaultValue: someType<SelectValue>([Array, Object, String, Number]),
  'onUpdate:value': FunctionType<(value: SelectValue) => void>(),

  // dropDown
  notFoundContent: PropTypes.any,
  popupClassName: String,
  placement: StringType<SelectCommonPlacement>('bottomLeft'),
})

export default defineComponent({
  name: 'PSelect',
  props: initDefaultProps(selectProps(), {}),
  setup(props) {
    const { prefixCls } = useConfigInject('select', props)
    const selectProps = omit(props, [])
    const [WrapSSR] = useStyle(prefixCls)

    return () => WrapSSR(<VcSelect {...selectProps} prefixCls={prefixCls.value} />)
  },
})
