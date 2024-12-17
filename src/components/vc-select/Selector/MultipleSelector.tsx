import PropTypes from '@/components/_utils/vue-types'
import Overflow from '@/components/vc-overflow'
import { computed, defineComponent } from 'vue'
import type { DisplayValueType } from '../BaseSelect'
import type { VueNode } from '@/components/_utils/type'
import TransBtn from '../TransBtn'
const props = {
  prefixCls: String,
  placeholder: PropTypes.any,
  //
  values: PropTypes.array,
  tagRender: PropTypes.any,

  disabled: PropTypes.bool,

  maxTagTextLength: PropTypes.number,
}

const MultipleSelector = defineComponent({
  name: 'MultipleSelector',
  inheritAttrs: false,
  props,
  setup(props) {
    const selectionPrefixCls = computed(() => `${props.prefixCls}-selection`)
    const pre = selectionPrefixCls.value

    // ==================================== Render ====================================

    const customizeRenderSelector = (value, content: VueNode, itemDisabled: boolean, closable) => {
      return (
        <span>{props.tagRender({ label: content, value, disabled: itemDisabled, closable })}</span>
      )
    }
    // 默认selector item
    const defaultRenderSelector = (
      title: VueNode,
      content: VueNode,
      itemDisabled: boolean,
      closable: boolean,
    ) => {
      return (
        <span class={`${pre}-item`}>
          <span class={`${pre}-item-content`}>{content}</span>

          {closable && <TransBtn class={`${pre}-item-remove`}> x </TransBtn>}
        </span>
      )
    }

    const renderItem = (item: DisplayValueType) => {
      const { label, value, option, disabled: itemDisabled } = item
      const closable = !props.disabled && !itemDisabled
      let displayLabel = label

      if (typeof props.maxTagTextLength === 'number') {
        if (typeof displayLabel === 'string' || typeof displayLabel === 'number') {
          let displayStr = displayLabel.toString()
          if (displayStr.length > props.maxTagTextLength) {
            displayLabel = `${displayStr.slice(0, props.maxTagTextLength)}...`
          }
        }
      }

      return typeof props.tagRender === 'function'
        ? customizeRenderSelector(value, displayLabel, itemDisabled!, closable)
        : defaultRenderSelector(label, displayLabel, itemDisabled!, closable)
    }

    return () => {
      const { placeholder, values } = props
      const InputNode = <div class={`${pre}`}></div>
      console.log('SelectionNode')

      const SelectionNode = <Overflow key="overflow" renderItem={renderItem} />
      return (
        <>
          {SelectionNode}
          {!values.length && <span class={`${pre}-placeholder`}>{placeholder}</span>}
        </>
      )
    }
  },
})

export default MultipleSelector
