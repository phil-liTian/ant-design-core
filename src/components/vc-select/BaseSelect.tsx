import { computed, defineComponent, shallowRef } from 'vue'
import SelectTrigger from './SelectTrigger'
import { StringType, type VueNode } from '../_utils/type'
import Selector from './Selector'
import initDefaultProps from '../_utils/props-util'
import classNames from '../_utils/classNames'
import Optionlist from './Optionlist'

type Mode = 'multiple' | 'tags' | 'combobox'
const baseSelectPrivateProps = () => ({
  prefixCls: String,
  displayValues: Array,
})

const baseSelectPropsWithoutPrivate = () => ({
  mode: StringType<Mode>('combobox'),
})

const baseSelectProps = () => ({
  ...baseSelectPrivateProps(),
  ...baseSelectPropsWithoutPrivate(),
})

export function isMultiple(mode: Mode) {
  return mode === 'multiple' || mode === 'tags'
}

export default defineComponent({
  name: 'BaseSelect',
  props: initDefaultProps(baseSelectProps(), {}),
  setup(props, { attrs }) {
    const { displayValues, mode } = props
    const multiple = computed(() => isMultiple(mode))
    const mergedOpen = shallowRef(false)
    const triggerOpen = computed(() => mergedOpen.value)
    const onToggleOpen = () => {
      mergedOpen.value = !triggerOpen.value

      console.log('mergedOpen', mergedOpen.value)
    }

    return () => {
      const { prefixCls } = props

      console.log('triggerOpen', triggerOpen.value)

      const optionList = <Optionlist />

      // >>> selector
      const SelectorNode = (
        <SelectTrigger
          visible={triggerOpen.value}
          prefixCls={prefixCls}
          popupElement={optionList}
          v-slots={{
            default: () => (
              <Selector onToggleOpen={onToggleOpen} values={displayValues} prefixCls={prefixCls} />
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

      renderNode = <div class={mergedClassName}>{SelectorNode}</div>
      return renderNode
    }
  },
})
