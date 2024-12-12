import { defineComponent } from 'vue'
import { TreeContext } from './contextTypes'
import NodeList from './NodeList'
import { treeProps } from './props'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'Tree',
  props: treeProps(),
  setup(props) {
    return () => {
      const { prefixCls } = props
      return (
        <TreeContext>
          <div role="tree" class={classNames(prefixCls)}>
            <NodeList />
          </div>
        </TreeContext>
      )
    }
  },
})
