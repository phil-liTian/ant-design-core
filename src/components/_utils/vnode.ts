import { cloneVNode, type VNode, render as VueRender } from 'vue'

export function cloneElement(vnode: VNode) {
  let ele = vnode

  if (!ele) return null

  const node = cloneVNode(ele)

  return node
}

export function triggerVNodeUpdate(vnode: VNode, attrs: Record<string, any>, container: any) {
  return VueRender(cloneVNode(vnode, attrs), container)
}
