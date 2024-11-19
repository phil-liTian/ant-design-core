import { computed } from 'vue'
import { useConfigContextInject } from '../context'

export default (name: string, props: Record<any, any>) => {
  const configProvider = useConfigContextInject()

  const prefixCls = computed(() => configProvider.getPrefixCls!(name, props.prefixCls))

  const direction = computed(() => configProvider.direction?.value)

  const autoInsertSpaceInButton = computed(() => configProvider.autoInsertSpaceInButton?.value)

  return {
    prefixCls,
    direction,
    autoInsertSpaceInButton,
  }
}
