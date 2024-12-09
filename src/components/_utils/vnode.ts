import { cloneVNode, type VNode, render as VueRender } from 'vue'

export function cloneElement(vnode: VNode, nodeProps = {}) {
  let ele = vnode
  if (Array.isArray(vnode)) {
    ele = vnode[0]
  }

  if (!ele) return null

  const node = cloneVNode(ele, nodeProps)

  return node
}

export function triggerVNodeUpdate(vnode: VNode, attrs: Record<string, any>, container: any) {
  return VueRender(cloneVNode(vnode, attrs), container)
}
