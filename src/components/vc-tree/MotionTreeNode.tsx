import { defineComponent, Transition } from 'vue'
import { ArrayType } from '../_utils/type'
import type { FlattenNode } from './interface'
import TreeNode from './TreeNode'

export default defineComponent({
  name: 'MotionTreeNode',
  inheritAttrs: false,
  props: {
    motionNodes: ArrayType<FlattenNode[]>([]),
  },
  setup(props) {
    return () => {
      const { motionNodes } = props
      if (motionNodes) {
        return (
          <Transition>
            <div></div>
          </Transition>
        )
      }
      return <TreeNode />
    }
  },
})
