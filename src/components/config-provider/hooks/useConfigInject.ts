import { computed } from 'vue'
import { useConfigContextInject, type SizeType } from '../context'

export default (name: string, props: Record<any, any>) => {
  const configProvider = useConfigContextInject()

  const prefixCls = computed(() => configProvider.getPrefixCls!(name, props.prefixCls))

  const direction = computed(() => configProvider.direction?.value)

  const autoInsertSpaceInButton = computed(() => configProvider.autoInsertSpaceInButton?.value)

  const size = computed(() => props.size as SizeType)

  // 表单类组件是否禁用
  const disabled = computed<boolean>(() => props.disabled)

  // 是否带波纹
  const wave = computed<{ disabled: boolean }>(() => props.wave ?? configProvider.wave?.value)

  return {
    prefixCls,
    direction,
    autoInsertSpaceInButton,
    size,
    wave,
    disabled,
  }
}
