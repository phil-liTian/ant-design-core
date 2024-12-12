import { defineComponent } from 'vue'
import VirtualList from '../vc-virtual-list/index'
import MotionTreeNode from './MotionTreeNode'

export default defineComponent({
  name: 'NodeList',
  setup() {
    return () => {
      return (
        <VirtualList
          v-slots={{
            default: () => {
              return <MotionTreeNode />
            },
          }}
        ></VirtualList>
      )
    }
  },
})
