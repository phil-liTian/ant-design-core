import { defineComponent } from 'vue'
import useStyle from './style'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import VcTree from '../vc-tree/index'

// 添加动画效果
export default defineComponent({
  name: 'PTree',
  setup(props) {
    const { prefixCls } = useConfigInject('tree', props)
    const [WrapSSR] = useStyle(prefixCls)
    return () => WrapSSR(<VcTree />)
  },
})
