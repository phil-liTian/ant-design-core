import { defineComponent, h } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'

export default defineComponent({
  name: 'PButton',
  props: {},
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('btn', props)
    console.log('prefixCls', prefixCls.value)

    const [wrapSSR] = useStyle(prefixCls)

    const pre = prefixCls.value

    const buttonProps = {
      class: [
        {
          [`${pre}`]: true,
        },
      ],
    }

    return () => {
      let buttonNode = <button {...buttonProps}>11213</button>

      return wrapSSR(buttonNode)
    }
  },
})
