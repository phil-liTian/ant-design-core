/**
 * type 定义
 */

import type { App, PropType, VNode } from 'vue'

export type VNodeChildAtom = VNode | string | null

export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode

export function tuple<T extends string>(...args: T[]): T[] {
  return args
}

// 定义给一个对象类型的props, 参数作为默认值
export function ObjectType<T = {}>(defaultValue?: T) {
  return { type: Object as PropType<T>, default: defaultValue as T }
}

// 定义一个boolean类型的props
export function BooleanType(defaultValue?: boolean) {
  return { type: Boolean, default: defaultValue as boolean }
}

// 定义函数类型的props
export function FunctionType<T = () => {}>(defaultValue?: T) {
  return { type: Function as PropType<T>, default: defaultValue as T }
}

// 定义string类型的props
export function StringType<T extends string = string>(defaultValue?: T) {
  return { type: String as unknown as PropType<T>, default: defaultValue as T }
}

// 定义array类型的props
export function ArrayType<T = any>(defaultValue?: T) {
  return { type: Array as unknown as PropType<T>, default: defaultValue as T }
}

export function NumberType<T extends number = number>(defaultValue?: T) {
  return { type: Number as unknown as PropType<T>, default: defaultValue as T }
}

export function EventType<T>() {
  return { type: [Function, Array] as PropType<T | T[]> }
}

export function someType<T>(types?: any[], defaultVal?: T) {
  return { type: types as PropType<T>, default: defaultVal as T }
}

export type LiteralUnion<T extends string> = T | (string & {})

export const withInstall = <T>(comp: T) => {
  const c = comp as any
  c.install = (app: App) => {
    const name = c.displayName || c.name
    if (name) {
      app.component(name, c)
    }
  }

  return comp as T & Plugin
}
