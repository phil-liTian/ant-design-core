import type { ExtractPropTypes } from 'vue'
import type { DataNode } from './interface'
import { ArrayType } from '../_utils/type'

// basic tree props
export const treeProps = () => ({
  prefixCls: String,

  // data
  treeData: ArrayType<DataNode[]>([]),
})

export type TreeProps = Partial<ExtractPropTypes<ReturnType<typeof treeProps>>>
