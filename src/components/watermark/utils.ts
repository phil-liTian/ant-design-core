import type { CSSProperties } from 'vue'

// key支持驼峰命名
export function toLowercaseSeparator(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const getStyleStr = (style: CSSProperties) => {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}:${style[key]}`)
    .join(';')
}

export const getPixelRatio = () => {
  return 1
}

export function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: Number,
) {
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}
