import type { CSSObject } from '../_utils/cssinjs/hooks/useStyleRegister'
import { PresetColors } from '../theme/interface'
import type { AliasToken } from '../theme/interface/alias'
import type { TokenWithCommonCls } from '../theme/utils/genComponentStyleHook'

interface CalcColor {
  textColor: string
  lightColor: string
  darkColor: string
  lightBorderColor: string
}

type GenCss = (colorKey: string, calcColor: CalcColor) => CSSObject

export function genPresetColor<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  genCss: GenCss,
): CSSObject {
  return PresetColors.reduce((pre, colorKey) => {
    const lightColor = token[`${colorKey}-1`]
    const lightBorderColor = token[`${colorKey}-3`]
    const darkColor = token[`${colorKey}-6`]
    const textColor = token[`${colorKey}-7`]
    return {
      ...pre,
      ...genCss(colorKey, { lightColor, lightBorderColor, darkColor, textColor }),
    }
  }, {} as CSSObject)
}
