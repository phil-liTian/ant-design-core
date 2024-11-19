import { computed, defineComponent, type App } from 'vue'
import {
  configProviderProps,
  useConfigContextProvider,
  type ConfigProviderInnerProps,
} from './context'

export type { SizeType } from './context'

const ConfigProvider = defineComponent({
  name: 'PConfigProvider',
  props: configProviderProps(),
  setup(props, { slots }) {
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
      const { prefixCls = 'ant' } = props
      if (customizePrefixCls) return customizePrefixCls
      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
    }

    const direction = computed(() => props.direction)

    const configProvider: ConfigProviderInnerProps = {
      getPrefixCls,
      direction,
    }
    useConfigContextProvider(configProvider)

    const childNode = slots.default?.()
    return () => <div>{childNode}</div>
  },
})

ConfigProvider.install = (app: App) => {
  app.component(ConfigProvider.name!, ConfigProvider)
}

export default ConfigProvider
