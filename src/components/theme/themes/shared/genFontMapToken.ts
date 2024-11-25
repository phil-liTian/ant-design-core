import type { FontMapToken } from '../../interface/maps/font'
import genFontSizes from './genFontSizes'

export const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize)
  const fontSizes = fontSizePairs.map((v) => v.size)
  const lineHeights = fontSizePairs.map((v) => v.height)

  return {
    // fontSize
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],

    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
  }
}
