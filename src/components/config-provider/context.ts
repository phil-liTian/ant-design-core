import type { ComputedRef, InjectionKey, PropType } from 'vue'
import { computed, provide, inject } from 'vue'

export const configProviderProps = () => ({
  prefixCls: String,
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
  },
})

export interface ConfigProviderInnerProps {
  direction?: ComputedRef<'ltr' | 'rtl'>
  getPrefixCls?: (suffixCls?: string, customizePrefixCls?: string) => string
}

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider')

export const defaultConfigProvider: ConfigProviderInnerProps = {
  direction: computed(() => 'ltr'),
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `phil-${suffixCls}` : 'phil'
  },
}

export const useConfigContextProvider = (props: ConfigProviderInnerProps) => {
  return provide(configProviderKey, props)
}

export const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider)
}
