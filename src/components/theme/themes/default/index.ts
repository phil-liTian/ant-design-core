import { generate } from '@ant-design/colors'
import { defaultPresetColors } from '../../themes/seed'
import genColorMapToken from '../shared/genColorMapToken'
import type { SeedToken } from '../../interface'
import { generateColorPalettes } from './colors'

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

    ...genColorMapToken(token, { generateColorPalettes }),
  }
}
