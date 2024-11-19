import { isVNode, type PropType } from 'vue'
import { func, type VueTypeDef, type VueTypeValidableDef } from 'vue-types'
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
    if (propTypes[k] === null || propTypes[k] === undefined) {
      propTypes[k] = defaultProps[k]
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
  return c && c.children.length === 0
}

export default initDefaultProps
