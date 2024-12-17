import { computed, defineComponent, reactive } from 'vue'
import { useSelectProps } from './SelectContext'
import useMemo from '../_utils/hooks/useMemo'
import List from '../vc-virtual-list'
import { useBaseProps } from './hooks/useBaseProps'
import classNames from '../_utils/classNames'
import type { RawValueType } from './BaseSelect'
import TransBtn from './TransBtn'

export default defineComponent({
  name: 'OptionList',
  setup() {
    const props = useSelectProps()
    const baseProps = useBaseProps()

    const itemPrefixCls = computed(() => `${baseProps.prefixCls}-item`)
    const state = reactive({ activeIndex: 0 })
    // 悬浮选中样式
    const setActive = (index: number) => {
      state.activeIndex = index
    }

    const onSelectValue = (value: RawValueType) => {
      if (value !== undefined) {
        props.onSelect(value)
      }
    }

    const memoFlattenOptions = useMemo(() => props.flattenOptions, [() => props.flattenOptions])

    const getLabel = (item: Record<string, any>) => {
      return typeof item.label === 'function' ? item.label() : item.label
    }

    const isSelected = (value) => {
      // return props.rawValues?.has(value)
      return false
    }

    return () => {
      const { notFoundContent } = baseProps
      const { listHeight, listItemHeight, menuItemSelectedIcon } = props

      if (!memoFlattenOptions.value.length) {
        return (
          <div role="listbox" class={`${itemPrefixCls.value}-empty`}>
            {notFoundContent}
          </div>
        )
      }

      return (
        <List
          data={memoFlattenOptions.value}
          height={listHeight}
          itemHeight={listItemHeight}
          v-slots={{
            default: (item, itemIndex) => {
              const { data, value } = item
              const { activeIndex } = state
              const optionPrefixCls = `${itemPrefixCls.value}-option`
              const selected = isSelected(value)
              const iconVisible =
                selected || !menuItemSelectedIcon || typeof menuItemSelectedIcon === 'function'
              const optionClassName = classNames(itemPrefixCls.value, optionPrefixCls, {
                [`${optionPrefixCls}-active`]: itemIndex === activeIndex,
              })
              const mergedLabel = getLabel(item)
              // content的内容 优先取label(label可以是函数或者是string), 其次取value的值
              const content = mergedLabel || value

              return (
                <div
                  class={optionClassName}
                  onMousemove={(e) => {
                    setActive(itemIndex)
                  }}
                  onClick={(e) => {
                    onSelectValue(value)
                  }}
                >
                  <div class={`${optionPrefixCls}-content`}>{content}</div>
                  {iconVisible && (
                    <TransBtn class={`${itemPrefixCls.value}-option-state`}>
                      {selected ? '✓' : null}
                    </TransBtn>
                  )}
                </div>
              )
            },
          }}
        ></List>
      )
    }
  },
})
