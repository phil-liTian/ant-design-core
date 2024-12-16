import { cloneVNode, type FunctionalComponent } from 'vue'
import { flattenChildren } from '../_utils/props-util'

export interface ItemProps {}

const Item: FunctionalComponent<ItemProps> = (props, { slots }) => {
  const children = flattenChildren(slots.default?.() as any)

  return children?.length ? cloneVNode(children[0]) : children
}

export default Item
