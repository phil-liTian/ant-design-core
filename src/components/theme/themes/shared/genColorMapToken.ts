import { TinyColor } from '@ctrl/tinycolor'
import type { SeedToken } from '../../interface'
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap'

interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap
  generateNeutralColorPalettes: GenerateNeutralColorMap
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
    colorBgBase,
    colorTextBase,
  } = seed

  // 处理颜色
  const infoColors = generateColorPalettes(colorInfoBase)
  const successColors = generateColorPalettes(colorSuccessBase)
  const warningColors = generateColorPalettes(colorWarningBase)
  const errorColors = generateColorPalettes(colorErrorBase)
  const primaryColors = generateColorPalettes(colorPrimaryBase)

  // 处理中性色
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase)

  return {
    ...neutralColors,
    // primary
    colorPrimaryBg: primaryColors[1],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],

    // success
    colorSuccessBg: successColors[1],
    colorSuccessBorder: successColors[3],
    colorSuccessInfo: successColors[6],

    // Info
    colorInfoBg: infoColors[1],
    colorInfoBorder: infoColors[3],
    colorInfo: infoColors[6],
    colorInfoText: infoColors[9],

    // warning
    colorWarningBg: warningColors[1],
    colorWarningBorder: warningColors[3],
    colorWarning: warningColors[6],

    // error
    colorErrorBg: errorColors[1],
    colorErrorBorder: errorColors[3],
    colorError: errorColors[6],

    colorBgMask: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    colorWhite: '#fff',
  }
}
