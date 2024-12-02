import { computed, type CSSProperties, type Ref } from 'vue'
import type { ComponentTokenMap, GlobalToken } from '../interface'
import useStyleRegister, {
  type CSSInterpolation,
} from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { useToken } from '../internal'
import { useConfigContextInject } from '@/components/config-provider/context'

export type OverrideTokenWithoutDerivative = ComponentTokenMap
export type OverrideComponent = keyof OverrideTokenWithoutDerivative
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[ComponentName]

export type TokenWithCommonCls<T> = T & {
  componentCls: string

  prefixCls: string

  iconCls: string

  antCls: string
}

export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>) => CSSInterpolation,
) {
  return (_prefixCls?: Ref<string>) => {
    const prefixCls = computed(() => _prefixCls?.value)
    const { getPrefixCls, iconPrefixCls } = useConfigContextInject()
    const rootPrefixCls = computed(() => getPrefixCls?.())
    const [theme, token] = useToken()

    const componentInfo = computed(() => {})
    const componentCls = `.${prefixCls.value}`

    const mergedToken = {
      componentCls,
      ...token.value,
      antCls: rootPrefixCls.value,
      iconCls: iconPrefixCls?.value,
    }

    return [
      useStyleRegister(componentInfo, () => {
        const styleInterpolation = styleFn(mergedToken)

        return [styleInterpolation]
      }),
    ]
  }
}
