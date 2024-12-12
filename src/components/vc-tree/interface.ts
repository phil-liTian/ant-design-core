import type { CSSProperties } from 'vue'

export type IconType = any

export interface BasicDataNode {
  checkable?: boolean
  disabled?: boolean
  disableCheckbox?: boolean
  icon: IconType
  isLeaf?: boolean
  selectable?: boolean
  switcherIcon?: IconType

  // style
  class?: string
  style?: CSSProperties
  slots?: Record<string, any>
  [key: string]: any
}

export interface DataNode extends BasicDataNode {
  children?: DataNode[]
  key: string | number
  title?: any
}

export interface FlattenNode {}
