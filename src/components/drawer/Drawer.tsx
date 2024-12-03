import { defineComponent } from 'vue'
import { drawProps } from './index'
import VcDrawer from '../vc-drawer'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'

const drawer = defineComponent({
  name: 'pDrawer',
  inheritAttrs: false,
  props: drawProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('drawer', props)
    const [WrapSSR] = useStyle(prefixCls)

    return () => WrapSSR(<VcDrawer />)
  },
})

export default drawer
