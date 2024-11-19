import type { CSSProperties } from 'vue'
import { compile, serialize, stringify } from 'stylis'
import type { VueNode } from '@/components/_utils/type'
import { updateCss } from '@/components/vc-util/Dom/dynamicCSS'

type ArrayCSSInterpolation = readonly CSSInterpolation[]

export type CSSInterpolation = ArrayCSSInterpolation

export default function useStyleRegister(info, styleFn: () => CSSInterpolation) {
  const styleObj = styleFn()

  const [parsedStyle] = parseStyle(styleObj)
  const styleStr = normalizeStyle(parsedStyle)
  updateCss(styleStr)

  return (node: VueNode) => node
}

export const parseStyle = (
  interpolation: CSSInterpolation,
  config = {},
  { root } = { root: true },
) => {
  let styleStr = ''
  function flattenList(list, fullList = []) {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList)
      } else {
        fullList.push(item)
      }
    })

    return fullList
  }

  const flattenStyleList = flattenList(
    Array.isArray(interpolation) ? interpolation : [interpolation],
  )

  flattenStyleList.forEach((originStyle) => {
    if (typeof originStyle === 'string') {
      styleStr += originStyle
    } else {
      Object.keys(originStyle).forEach((key) => {
        const value = originStyle[key]
        if (typeof value === 'object') {
          let mergedKey = key.trim()

          const [parsedStr] = parseStyle(value, {}, { root: false })

          styleStr += `${mergedKey}${parsedStr}`
        } else {
          styleStr += `${key}:${value};`
        }
      })
    }
  })

  if (!root) {
    styleStr = `{${styleStr}}`
  }

  return [styleStr]
}

export function normalizeStyle(styleStr: string): string {
  const serialized = serialize(compile(styleStr), stringify)
  return serialized.replace(/\{%%%\:[^;];}/g, ';')
}
