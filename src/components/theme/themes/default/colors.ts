import { generate } from '@ant-design/colors'
import type { ColorMap, GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap'
import type { ColorNeutralMapToken } from '../../interface'
import { getAlphaColor } from './colorAlgorithm'

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

    colorBgContainer: 'blue',
  }
}
