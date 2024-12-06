import { computed, defineComponent } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import classNames from '../_utils/classNames'

export const rowProps = () => ({
  prefixCls: String,
})

const Row = defineComponent({
  name: 'PRow',
  inheritAttrs: false,
  props: rowProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('row', props)

    const className = computed(() => classNames(prefixCls.value, ''))

    return () => <div class={className.value}>{slots.default?.()}</div>
  },
})

export default Row
