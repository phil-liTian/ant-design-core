/**
 * target
 */
export interface TargetPoint {
  clientX?: number
  clientY?: number
  pageX?: number
  pageY?: number
}

export type TargetType = (() => HTMLElement) | TargetPoint

/**
 * align
 */

export type AlignPoint = string
export interface AlignType {
  points: AlignPoint[]
  offset?: number[]
  targetOffset?: number[]
  overflow: {
    adjustX?: boolean | number
    adjustY?: boolean | number
  }
  useCssRight?: boolean
  useCssBottom?: boolean
  useCssTransform?: boolean
}
