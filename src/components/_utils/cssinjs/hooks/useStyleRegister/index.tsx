import type { CSSProperties } from 'vue'
import { compile, serialize, stringify } from 'stylis'
import type { VueNode } from '@/components/_utils/type'
import { updateCss } from '@/components/vc-util/Dom/dynamicCSS'

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}

type ArrayCSSInterpolation = readonly CSSInterpolation[]

export type InterpolationPrimitive =
  | undefined
  | null
  | false
  | number
  | string
  | ArrayCSSInterpolation
  | CSSObject

// export interface CSSObject extends CSSPropertiesWithMultiValues {}
export type CSSObject = any

export type CSSInterpolation = ArrayCSSInterpolation

export default function useStyleRegister(info: any, styleFn: () => CSSInterpolation) {
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
          // 允许js使用驼峰处理样式
          const styleName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

          styleStr += `${styleName}:${value};`
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
  // compile函数用于将原始的样式字符串（styleStr）编译成 Stylis 内部的抽象语法树（AST）格式或者其他中间表示形式。

  // 在compile函数将样式字符串转换为内部表示形式之后，serialize函数用于将这个中间表示形式重新转换为字符串格式。
  const serialized = serialize(compile(styleStr), stringify)
  return serialized.replace(/\{%%%\:[^;];}/g, ';')
}
