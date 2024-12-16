import { defineComponent } from 'vue'
import VcSelect, { selectProps as VcSelectProps, Option, OptGroup } from '../vc-select'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import initDefaultProps from '../_utils/props-util'
import useStyle from './style'
import { FunctionType, someType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { SelectCommonPlacement } from '../_utils/transition'
import type { InputStatus } from '../_utils/statusUtils'
import type { SizeType } from '../config-provider'
import omit from '../_utils/omit'
import getIcons from './utils/iconUtil'
import classNames from '../_utils/classNames'
import DefaultRenderEmpty from '../config-provider/renderEmpty'

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
  Option,
  OptGroup,
  props: initDefaultProps(selectProps(), {}),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('select', props)
    const [WrapSSR, hashId] = useStyle(prefixCls)
    const { suffixIcon } = getIcons(props, slots)
    console.log('hashId', hashId)

    return () => {
      const { dropdownClassName, notFoundContent } = props
      const selectProps = omit(props, ['dropdownClassName'])
      let mergedNotFound: any
      if (notFoundContent !== undefined) {
        mergedNotFound = notFoundContent
      } else if (slots.notFoundContent) {
        mergedNotFound = slots.notFoundContent()
      } else {
        mergedNotFound = <DefaultRenderEmpty componentName="Select" />
      }

      const rcSelectDropdownClassName = classNames(dropdownClassName)
      return WrapSSR(
        <VcSelect
          {...selectProps}
          dropdownClassName={rcSelectDropdownClassName}
          inputIcon={suffixIcon}
          prefixCls={prefixCls.value}
          notFoundContent={mergedNotFound}
        />,
      )
    }
  },
})
