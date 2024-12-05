import type { ExtractPropTypes } from 'vue'
import { ArrayType, BooleanType, StringType, withInstall, type VueNode } from '../_utils/type'
import Segmented from './segmented'

type SegmentedSize = 'small' | 'large'

export interface SegmentedBaseOption {
  value: string | number
  disabled?: boolean
  title?: string
  className?: string
  payload?: any
}

export interface SegmentedOption extends SegmentedBaseOption {
  label?: VueNode | ((option: SegmentedBaseOption) => VueNode)
}

export function segmentedProps() {
  return {
    prefixCls: String,
    size: StringType<SegmentedSize>('small'),
    disabled: BooleanType(),
    block: BooleanType(),
    options: ArrayType<(string | number | SegmentedOption)[]>(),
  }
}

export type SegmentedProps = Partial<ExtractPropTypes<ReturnType<typeof segmentedProps>>>

export default withInstall(Segmented)
