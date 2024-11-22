import { computed, type ComputedRef } from 'vue'
import { useCacheToken } from '../_utils/cssinjs/hooks/useCacheToken'
import createTheme from '../_utils/cssinjs/theme/createTheme'
import defaultDerivative from '../theme/themes/default'
import defaultSeedToken from '../theme/themes/seed'
import type { CSSInterpolation } from '../_utils/cssinjs/hooks/useStyleRegister'
import type { AliasToken } from './interface/alias'
export type { PresetColorKey, PresetColorsType, ColorPalettes } from './interface'

const defaultTheme = createTheme(defaultDerivative)

export function useToken(): [any, ComputedRef<any>] {
  const mergedTheme = computed(() => defaultTheme)

  const cacheToken = useCacheToken(
    mergedTheme,
    computed(() => [defaultSeedToken]),
  )

  return ['', computed(() => cacheToken.value[0])]
}

export type GenerateStyle<
  ComponentToken extends object = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType
