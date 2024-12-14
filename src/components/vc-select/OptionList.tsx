import { computed, defineComponent, reactive } from 'vue'
import { useSelectProps } from './SelectContext'
import useMemo from '../_utils/hooks/useMemo'
import List from '../vc-virtual-list'
import { useBaseProps } from './hooks/useBaseProps'
import classNames from '../_utils/classNames'
import type { RawValueType } from './BaseSelect'

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

    return () => (
      <List
        data={memoFlattenOptions.value}
        v-slots={{
          default: (item, itemIndex) => {
            const { data, value } = item
            const { activeIndex } = state
            const optionPrefixCls = `${itemPrefixCls.value}-option`
            const optionClassName = classNames(itemPrefixCls.value, optionPrefixCls, {
              [`${optionPrefixCls}-active`]: itemIndex === activeIndex,
            })
            const content = item.label

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
                {content}
              </div>
            )
          },
        }}
      ></List>
    )
  },
})
