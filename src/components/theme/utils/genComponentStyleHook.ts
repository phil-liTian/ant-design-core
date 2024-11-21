import { computed, type CSSProperties, type Ref } from 'vue'
import type { ComponentTokenMap } from '../interface'
import useStyleRegister, {
  type CSSInterpolation,
} from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { useToken } from '../internal'

export type OverrideTokenWithoutDerivative = ComponentTokenMap
export type OverrideComponent = keyof OverrideTokenWithoutDerivative
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> =
  ComponentTokenMap[ComponentName]

export type TokenWithCommonCls<T> = T & {}

export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>) => CSSInterpolation,
) {
  return (_prefixCls?: Ref<string>) => {
    const prefixCls = computed(() => _prefixCls?.value)
    const [theme, token] = useToken()

    const componentInfo = computed(() => {})
    const componentCls = `.${prefixCls.value}`

    const mergedToken = {
      componentCls,
      ...token.value,
    }

    return [
      useStyleRegister(componentInfo, () => {
        const styleInterpolation = styleFn(mergedToken)

        return [styleInterpolation]
      }),
    ]
  }
}
