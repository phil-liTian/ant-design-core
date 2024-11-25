import { generate } from '@ant-design/colors'
import { defaultPresetColors } from '../../themes/seed'
import genColorMapToken from '../shared/genColorMapToken'
import type { SeedToken } from '../../interface'
import { generateColorPalettes, generateNeutralColorPalettes } from './colors'
import genCommonMapToken from '../shared/genCommonMapToken'
import { genFontMapToken } from '../shared/genFontMapToken'
import genFontSizes from '../shared/genFontSizes'
import { genSizeMapToken } from '../shared/genSizeMapToken'
import { genControlHeightToken } from '../shared/genControlHeightToken'

export default function derivative(token: SeedToken) {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey) => {
      const colors = generate(defaultPresetColors[colorKey])

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i]
        return prev
      }, {})
    })
    .reduce((pre, cur) => {
      pre = {
        ...pre,
        ...cur,
      }
      return pre
    }, {})

  return {
    ...colorPalettes,

    // 处理颜色
    ...genColorMapToken(token, { generateColorPalettes, generateNeutralColorPalettes }),

    // 处理radius & motions
    ...genCommonMapToken(token),

    // 处理Font
    ...genFontMapToken(token.fontSize),

    // size
    ...genSizeMapToken(token),

    // 生成control height
    ...genControlHeightToken(token),
  }
}
