import { generate } from '@ant-design/colors'
import type { ColorMap, GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap'
import type { ColorNeutralMapToken } from '../../interface'
import { getAlphaColor, getSolidColor } from './colorAlgorithm'

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor)

  return colors.reduce((prev, color, index) => {
    return {
      ...prev,
      [`${index + 1}`]: color,
    }
  }, {} as ColorMap)
}

export const generateNeutralColorPalettes = (
  bgBaseColor: string,
  textBaseColor: string,
): ColorNeutralMapToken => {
  const colorBgBase = bgBaseColor || '#fff'
  const colorTextBase = textBaseColor || '#000'

  return {
    // text的颜色
    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    // 填充色
    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),

    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 19),
  }
}
