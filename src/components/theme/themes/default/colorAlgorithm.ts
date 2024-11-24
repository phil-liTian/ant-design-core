import { TinyColor } from '@ctrl/tinycolor'

export const getAlphaColor = (baseColor: string, alpha: number) => {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString()
}
