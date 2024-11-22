import type { SeedToken } from '../../interface'
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap'

interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap
  generateNeutralColorPalettes?: GenerateNeutralColorMap
}

export default function genColorMapToken(
  seed: SeedToken,
  { generateColorPalettes, generateNeutralColorPalettes }: PaletteGenerators,
) {
  const {
    colorPrimary: colorPrimaryBase,
    colorInfo: colorInfoBase,
    colorError: colorErrorBase,
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
  } = seed

  const infoColors = generateColorPalettes(colorInfoBase)
  const successColors = generateColorPalettes(colorSuccessBase)
  const warningColors = generateColorPalettes(colorWarningBase)
  const errorColors = generateColorPalettes(colorErrorBase)
  const primaryColors = generateColorPalettes(colorPrimaryBase)
  console.log('infoColors', infoColors)

  return {
    // success
    colorSuccessBg: successColors[1],
    colorSuccessBorder: successColors[3],
    colorSuccessInfo: successColors[6],

    // Info
    colorInfoBg: infoColors[1],
    colorInfoBorder: infoColors[3],
    colorInfo: infoColors[6],

    // warning
    colorWarningBg: warningColors[1],
    colorWarningBorder: warningColors[3],
    colorWarning: warningColors[6],

    // error
    colorErrorBg: errorColors[1],
    colorErrorBorder: errorColors[3],
    colorError: errorColors[6],
  }
}
