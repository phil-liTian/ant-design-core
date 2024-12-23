export default function genFontSizes(base: number) {
  const fontSizes = new Array(10).fill(null).map((_, index) => {
    const i = index - 1
    const baseSize = base * 2.71828 ** (i / 5)
    const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize)

    return Math.floor(intSize / 2) * 2
  })
  fontSizes[1] = base

  return fontSizes.map((size, index) => {
    const height = size + 8
    return {
      size,
      height: height / size,
    }
  })
}
