import { computed, defineComponent, type PropType } from 'vue'
import classNames from '../_utils/classNames'
import type { SizeType } from '../config-provider'
import useConfigInject from '../config-provider/hooks/useConfigInject'

export default defineComponent({
  name: 'PInputGroup',
  props: {
    prefixCls: String,
    size: { type: String as PropType<SizeType> },
  },
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('input-group', props)
    const cls = computed(() => {
      const pre = prefixCls.value
      return classNames(pre, attrs.class, {
        [`${pre}-lg`]: props.size === 'large',
        [`${pre}-sm`]: props.size === 'small',
      })
    })
    return () => <span class={cls.value}>{slots.default?.()}</span>
  },
})
