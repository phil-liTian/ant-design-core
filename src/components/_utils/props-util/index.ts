import { Fragment, isVNode, Text, type ComponentPublicInstance, type PropType } from 'vue'
import { type VueTypeDef, type VueTypeValidableDef } from 'vue-types'
import isValid from '../isValid'

const initDefaultProps = <T>(
  types: T,
  defaultProps: {
    [K in keyof T]?: T[K] extends VueTypeValidableDef<infer U>
      ? U
      : T[K] extends VueTypeDef<infer U>
        ? U
        : T[K] extends { type: PropType<infer U> }
          ? U
          : any
  },
): T => {
  const propTypes: T = { ...types }

  Object.keys(defaultProps).forEach((k) => {
    const prop = propTypes[k]

    if (prop) {
      propTypes[k] = { type: prop, default: defaultProps[k] }
    }
  })

  return propTypes
}

export const flattenChildren = (children = [], filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children]
  let res = []
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty))
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child)
      } else if (!filterEmpty) {
        res.push(child)
      }
    } else if (isValid(child)) {
      res.push(child)
    }
  })

  return res
}

export function isEmptyElement(c: any) {
  return c && c.type === Fragment && c.children.length === 0
}

function getPropsSlot(slots: any, props: any, prop = 'default') {
  return props[prop] ?? slots[prop]?.()
}

const fineDOMNode = (instance: any) => {
  let node = instance?.vnode?.el || (instance && (instance.$el || instance))
  while (node && !node.tagName) {
    node = node.nextSibling
  }
  return node
}

export function isValidElement(element: any) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0]
  }
  return element && element.__v_isVNode
}

export default initDefaultProps

export { getPropsSlot, fineDOMNode }
