import { generate } from '@ant-design/colors'
import type { ColorMap, GenerateColorMap } from '../ColorMap'

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor)

  return colors.reduce((prev, color, index) => {
    return {
      ...prev,
      [`${index + 1}`]: color,
    }
  }, {} as ColorMap)
}
