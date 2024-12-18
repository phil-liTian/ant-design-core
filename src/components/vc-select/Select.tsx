import { computed, defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import BaseSelect, {
  baseSelectPrivateProps,
  baseSelectPropsWithoutPrivate,
  isMultiple,
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
import { useProvideSelectProps, type SelectContextProps } from './SelectContext'
import { flattenOptions } from './utils/valueUtil'
import useMergedState from '../_utils/hooks/useMergedState'
import useCache from './hooks/useCache'

export type FilterFunc<OptionType> = (inputValue: string, option: OptionType) => boolean

export type OnInternalSelect = (value: RawValueType, info: { selected: boolean }) => void

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
    onChange: FunctionType<(value: ValueType, option: OptionType) => void>(),
    labelInValue: PropTypes.bool,

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
    itemHeight: NumberType(32),
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
    const { fieldNames, options, listHeight, itemHeight } = props
    const multiple = computed(() => isMultiple(props.mode))

    // ========================== Options ==========================
    const mergedFilterOptions = computed(() => {
      if (props.filterOption === undefined) {
        return false
      }
      return props.filterOption
    })

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
      // 此处处理label可以是一个函数或者没有默认使用value当作label
      return mergedValues.value.map((item) => {
        return {
          ...item,
          label: (typeof item.label === 'function' ? item.label() : item.label) || item.value,
        }
      })
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

      if (!!props.onChange) {
        const returnValues = props.labelInValue
          ? labeledValues.map((item) => ({
              ...item,
              originLabel: item.label,
              label: typeof item.label === 'function' ? item.label() : item.label,
            }))
          : labeledValues.map((v) => v.value)

        const returnOptions = labeledValues.map((v) => v.option)

        props.onChange(
          multiple.value ? returnValues : returnValues[0],
          multiple.value ? returnOptions : returnOptions[0],
        )
      }
    }
    // ========================= Select ===========================
    const onInternalSelect = (value: RawValueType, { selected }) => {
      // TODO
      let cloneValues: any[] = []
      const mergedSelect = multiple.value ? selected : true

      if (mergedSelect) {
        cloneValues = multiple.value ? [...mergedValues.value, value] : [value]
      } else {
        // 反选
        cloneValues = mergedValues.value.filter((v) => v.value !== value)
      }
      triggerChange(cloneValues)
      // triggerChange([value])
    }

    const rawValues = computed(() => new Set(mergedValues.value.map((v) => v.value)) || [])

    useProvideSelectProps({
      flattenOptions: displayOptions,
      options: props.options,
      onSelect: onInternalSelect,
      listHeight,
      rawValues: rawValues.value,
      listItemHeight: itemHeight,
      menuItemSelectedIcon: props.menuItemSelectedIcon,
    } as unknown as SelectContextProps)

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
