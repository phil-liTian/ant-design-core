import type { CSSProperties } from 'vue'
import { compile, serialize, stringify } from 'stylis'
import type { VueNode } from '@/components/_utils/type'
import { updateCss } from '@/components/vc-util/Dom/dynamicCSS'
import type { Keyframes } from 'ant-design-vue'

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

export type CSSInterpolation = ArrayCSSInterpolation | any

export default function useStyleRegister(info: any, styleFn: () => CSSInterpolation) {
  const styleObj = styleFn()

  const [parsedStyle, effectStyle] = parseStyle(styleObj)
  const styleStr = normalizeStyle(parsedStyle)
  updateCss(styleStr)

  Object.keys(effectStyle).forEach((effectKey) => {
    updateCss(normalizeStyle(effectStyle[effectKey]))
  })

  return (node: VueNode) => node
}

export const parseStyle = (
  interpolation: CSSInterpolation,
  config = {},
  { root } = { root: true },
) => {
  const { hashId } = config
  let styleStr = ''
  let effectStyle: any = {}
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

  function parseKeyframes(keyframes: any) {
    const animationName = keyframes.getName(hashId)

    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config)
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}{${parsedStr}}`
    }
  }

  flattenStyleList.forEach((originStyle) => {
    if (typeof originStyle === 'string') {
      styleStr += originStyle
    } else if ((originStyle as any)._keyframe) {
      parseKeyframes(originStyle as any)
    } else {
      Object.keys(originStyle).forEach((key) => {
        let value = originStyle[key]
        if (typeof value === 'object' && key !== 'animationName') {
          let mergedKey = key.trim()

          const [parsedStr, childEffectStyle] = parseStyle(value, {}, { root: false })
          effectStyle = {
            ...effectStyle,
            ...(childEffectStyle || {}),
          }

          styleStr += `${mergedKey}${parsedStr}`
        } else {
          // 允许js使用驼峰处理样式
          const styleName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

          let formatValue: any = value
          // 给数值类型添加‘px’
          if (typeof value === 'number') {
            formatValue = `${value}px`
          }

          if (key === 'animationName') {
            parseKeyframes(value)
            formatValue = (value as Keyframes).getName('')
          }

          styleStr += `${styleName}:${formatValue};`
        }
      })
    }
  })

  if (!root) {
    styleStr = `{${styleStr}}`
  }

  return [styleStr, effectStyle]
}

export function normalizeStyle(styleStr: string): string {
  // compile函数用于将原始的样式字符串（styleStr）编译成 Stylis 内部的抽象语法树（AST）格式或者其他中间表示形式。

  // 在compile函数将样式字符串转换为内部表示形式之后，serialize函数用于将这个中间表示形式重新转换为字符串格式。
  const serialized = serialize(compile(styleStr), stringify)
  return serialized.replace(/\{%%%\:[^;];}/g, ';')
}
