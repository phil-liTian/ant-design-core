import {
  computed,
  defineComponent,
  ref,
  shallowRef,
  toRefs,
  reactive,
  watch,
  type ExtractPropTypes,
  type PropType,
} from 'vue'
import SelectTrigger from './SelectTrigger'
import { BooleanType, FunctionType, StringType, type Key, type VueNode } from '../_utils/type'
import Selector from './Selector'
import initDefaultProps from '../_utils/props-util'
import classNames from '../_utils/classNames'
import Optionlist from './OptionList'
import PropTypes from '../_utils/vue-types'
import createRef from '../_utils/createRef'
import { useProvideBaseSelectProps } from './hooks/useBaseProps'
import { toReactive } from '../_utils/toReactive'
import type { BaseOptionType } from './Select'

export type Mode = 'multiple' | 'tags' | 'combobox'
export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

export type RawValueType = string | number

export interface DropdownObject {
  menuNode?: VueNode
  props?: Record<string, any>
}

export type RenderDOMFunc = (props?: any) => HTMLElement

export type DropdownRender = (opt?: DropdownObject) => VueNode

export interface DisplayValueType {
  key?: Key
  value?: RawValueType
  label?: any
  disabled?: boolean
  option?: BaseOptionType
}
export const baseSelectPrivateProps = () => ({
  prefixCls: String,
  displayValues: Array as PropType<DisplayValueType[]>,

  // search
  autofocus: BooleanType(false),
  // >>> status
  disabled: BooleanType(undefined),

  // >> icon
  allowClear: BooleanType(false),
  clearIcon: PropTypes.any,

  // value
  labelInValue: PropTypes.bool,

  // dropdown
  placement: StringType<Placement>('bottomLeft'),
  // 下拉框是否与选择器同宽
  dropdownMatchSelectWidth: {
    type: [Boolean, Number] as PropType<boolean | number>,
  },

  dropdownStyle: PropTypes.object,
  // 下拉框渲染的位置
  getPopupContainer: FunctionType<RenderDOMFunc>(),
})

export const baseSelectPropsWithoutPrivate = () => ({
  mode: StringType<Mode>('combobox'),
  showArrow: BooleanType(true),
  inputIcon: PropTypes.any,
  placeholder: PropTypes.any,

  // dropdown
  dropdownClassName: String,
  notFoundContent: PropTypes.any,
  // 自定义下拉框内容
  dropdownRender: FunctionType<DropdownRender>(),
})

const baseSelectProps = () => ({
  ...baseSelectPrivateProps(),
  ...baseSelectPropsWithoutPrivate(),
})

export type BaseSelectProps = Partial<ExtractPropTypes<ReturnType<typeof baseSelectProps>>>

export function isMultiple(mode: Mode) {
  return mode === 'multiple' || mode === 'tags'
}

export default defineComponent({
  name: 'BaseSelect',
  props: initDefaultProps(baseSelectProps(), {
    // notFoundContent: 'Not Found',
  }),
  setup(props, { attrs }) {
    const { displayValues, mode } = props
    const multiple = computed(() => isMultiple(mode))
    const mergedOpen = shallowRef(false)
    const triggerOpen = computed(() => mergedOpen.value)
    const containerWidth = shallowRef<number>()
    const selectorDomRef = createRef()
    const containerRef = ref<HTMLDivElement>()
    const onToggleOpen = () => {
      mergedOpen.value = !triggerOpen.value
    }

    watch(
      () => triggerOpen.value,
      (val) => {
        if (triggerOpen.value) {
          const newWidth = containerRef.value?.offsetWidth
          containerWidth.value = newWidth
        }
      },
      { immediate: true, flush: 'post' },
    )

    useProvideBaseSelectProps(
      toReactive({ ...toRefs(props), toggleOpen: onToggleOpen, multiple } as any),
    )

    return () => {
      const {
        prefixCls,
        placement,
        placeholder,
        displayValues,
        showArrow,
        inputIcon,
        dropdownClassName,
        dropdownRender,
      } = props

      const mergedShowArrow = showArrow
      let arrowNode: VueNode = null
      if (mergedShowArrow) {
        arrowNode = <span class={`${prefixCls}-arrow`}>{inputIcon()}</span>
      }

      const optionList = <Optionlist />

      // >>> selector
      const SelectorNode = (
        <SelectTrigger
          visible={triggerOpen.value}
          prefixCls={prefixCls}
          containerWidth={containerWidth.value}
          popupElement={optionList}
          placement={placement}
          dropdownClassName={dropdownClassName}
          dropdownRender={dropdownRender}
          getTriggerDOMNode={() => selectorDomRef.current}
          v-slots={{
            default: () => (
              <Selector
                mode={mode!}
                placeholder={placeholder}
                domRef={selectorDomRef}
                onToggleOpen={onToggleOpen}
                values={displayValues}
                prefixCls={prefixCls}
              />
            ),
          }}
        />
      )

      const mergedClassName = classNames(prefixCls, attrs.class, {
        [`${prefixCls}-single`]: !multiple.value,
        [`${prefixCls}-multiple`]: multiple.value,
        [`${prefixCls}-customize-input`]: false,
      })

      let renderNode: VueNode

      renderNode = (
        <div ref={containerRef} class={mergedClassName}>
          {SelectorNode}
          {arrowNode}
        </div>
      )
      return renderNode
    }
  },
})
