import { computed } from 'vue'
import { useConfigContextInject } from '../context'

export default (name: string, props: Record<any, any>) => {
  const configProvider = useConfigContextInject()

  const prefixCls = computed(() => configProvider.getPrefixCls!(name, props.prefixCls))

  return {
    prefixCls,
  }
}
