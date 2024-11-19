import type { ComputedRef, InjectionKey, PropType } from 'vue'
import { computed, provide, inject } from 'vue'
import type { AliasToken } from '../theme/interface/alias'

export type SizeType = 'small' | 'middle' | 'large' | undefined

export interface ThemeConfig {
  token?: Partial<AliasToken>
}

// config provider可接收的props
export const configProviderProps = () => ({
  prefixCls: String,
  autoInsertSpaceInButton: { type: Boolean, default: true },
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
  },
  theme: {
    type: Object as PropType<ThemeConfig>,
    default: () => ({}),
  },
})

export interface ConfigProviderInnerProps {
  direction?: ComputedRef<'ltr' | 'rtl'>
  autoInsertSpaceInButton?: ComputedRef<boolean>
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
