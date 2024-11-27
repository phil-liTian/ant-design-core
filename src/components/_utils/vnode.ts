import { cloneVNode, type VNode } from 'vue'

export function cloneElement(vnode: VNode) {
  let ele = vnode

  if (!ele) return null

  const node = cloneVNode(ele)

  return node
}
