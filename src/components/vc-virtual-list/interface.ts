import type { CSSProperties, VNodeTypes } from 'vue'

export type RenderFunc<T> = (
  item: T,
  index: number,
  props?: { style?: CSSProperties },
) => VNodeTypes
