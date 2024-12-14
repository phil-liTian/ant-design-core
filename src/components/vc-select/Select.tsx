import { computed, defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import BaseSelect, { baseSelectPrivateProps, type Placement } from './BaseSelect'
import {
  ArrayType,
  BooleanType,
  FunctionType,
  NumberType,
  ObjectType,
  StringType,
} from '../_utils/type'
import initDefaultProps from '../_utils/props-util'
import omit from '../_utils/omit'
import PropTypes from '../_utils/vue-types'
import { useProvideSelectProps } from './SelectContext'
import { flattenOptions } from './utils/valueUtil'

export type FilterFunc<OptionType> = (inputValue: string, option: OptionType) => boolean

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
    ...baseSelectPrivateProps(),
    prefixCls: String,

    // search
    mode: StringType<'multiple' | 'tags' | 'combobox'>(),
    maxTagCount: {
      type: [String, Number],
    },
    // 隐藏tag时的placeholder
    maxTagPlaceholder: PropTypes.any,
    // tag 文本的长度限制
    maxTagTextLength: Number,
    menuItemSelectedIcon: PropTypes.any,

    // 选中项后清空搜索框
    autoClearSearchValue: BooleanType(true),
    // 筛选
    filterOption: {
      type: [Boolean, Function] as PropType<boolean | FilterFunc<OptionType>>,
      default: undefined,
    },

    // 对筛选结果项排序
    filterSort: FunctionType<(optionA: OptionType, optionB: OptionType) => number>(),
    // fieldNames
    fieldNames: ObjectType<FieldNames>(),

    // options
    options: ArrayType<OptionType[]>(),

    // dropdown
    // 默认高亮第一个选项
    defaultActiveFirstOption: BooleanType(true),
    // >>> open
    open: BooleanType(false),
    defaultOpen: BooleanType(false),
    // 弹窗滚动高度
    listHeight: NumberType(256),
    placement: StringType<Placement>('bottomLeft'),
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
    const pickProps = omit(props, [])

    useProvideSelectProps({
      flattenOptions: flattenOptions(props.options),
      options: props.options,
    })
    return () => (
      <BaseSelect
        {...pickProps}
        // >>> value
        displayValues={displayValues.value}
      />
    )
  },
})
