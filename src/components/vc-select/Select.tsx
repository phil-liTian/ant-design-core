import { computed, defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import BaseSelect, {
  baseSelectPrivateProps,
  baseSelectPropsWithoutPrivate,
  type Placement,
  type RawValueType,
} from './BaseSelect'
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
import useMergedState from '../_utils/hooks/useMergedState'
import useCache from './hooks/useCache'

export type FilterFunc<OptionType> = (inputValue: string, option: OptionType) => boolean

export type OnInternalSelect = (value: RawValueType) => void

export interface FieldNames {
  value?: string
  label?: string
  options?: string
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
    ...baseSelectPropsWithoutPrivate(),
    prefixCls: String,

    // value
    defaultValue: PropTypes.any,

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
    const { fieldNames, options } = props

    const displayOptions = computed(() =>
      flattenOptions(props.options, {
        fieldNames,
      }),
    )

    const [internalValue, setInternalValue] = useMergedState(props.defaultValue)
    const rawLabeledValues = computed(() => {
      const values = internalValue.value

      return values
    })

    const [mergedValues] = useCache(rawLabeledValues)

    const displayValues = computed(() => {
      return mergedValues.value
    })

    const convert2LabelValues = (draftValues) => {
      return draftValues.map((val) => {
        const option = options.find((v) => v.value === val) || {}

        return {
          label: option.label,
          value: option.value,
        }
      })
    }

    const triggerChange = (values) => {
      // 选中的values转化成对象数组
      const labeledValues = convert2LabelValues(values)

      setInternalValue(labeledValues)
    }

    const onInternalSelect = (value: RawValueType) => {
      triggerChange([value])
    }

    useProvideSelectProps({
      flattenOptions: displayOptions,
      options: props.options,
      onSelect: onInternalSelect,
    })
    return () => {
      const pickProps = omit(props, [])

      return (
        <BaseSelect
          {...pickProps}
          // >>> value
          displayValues={displayValues.value}
        />
      )
    }
  },
})
