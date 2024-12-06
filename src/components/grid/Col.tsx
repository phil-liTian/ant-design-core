import { computed, defineComponent } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
export const colProps = () => ({
  prefixCls: String,
})

const Col = defineComponent({
  name: 'PCol',
  props: colProps(),
  setup(props, { slots }) {
    const { prefixCls, direction } = useConfigInject('col', props)
    const classNames = computed(() => {
      return classNames(prefixCls.value, '')
    })
    return () => <div class={classNames.value}>{slots.default?.()} </div>
  },
})

export default Col
