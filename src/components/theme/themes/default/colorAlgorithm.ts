import { TinyColor } from '@ctrl/tinycolor'

export const getAlphaColor = (baseColor: string, alpha: number) => {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString()
}

export const getSolidColor = (baseColor: string, brightness: number) => {
  return new TinyColor(baseColor).darken(brightness).toHexString()
}
