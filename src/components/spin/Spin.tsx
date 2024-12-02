import { cloneVNode, defineComponent, isVNode, shallowRef, type VNode } from 'vue'
import { spinProps } from './index'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import { flattenChildren } from '../_utils/props-util'

let defaultIndicator: () => VNode | VNode

export const setDefaultIndicator = (content: any) => {
  const Indicator = content.indicator
  defaultIndicator = typeof Indicator === 'function' ? Indicator : () => <Indicator />
}

export default defineComponent({
  name: 'PSpin',
  props: spinProps(),
  setup(props, { slots }) {
    const { tip, size, spining } = props
    const { prefixCls } = useConfigInject('spin', props)
    const [wrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value
    const sSpinning = shallowRef(spining)

    return () => {
      const children = slots.default?.()
      const renderIndicator = (prefixCls: string) => {
        const dotClassName = `${prefixCls}-dot`

        if (defaultIndicator && isVNode(defaultIndicator())) {
          return cloneVNode(defaultIndicator(), { class: dotClassName })
        }

        return (
          <span class={`${dotClassName} ${dotClassName}-spin`}>
            <i class={`${dotClassName}-item`}></i>
            <i class={`${dotClassName}-item`}></i>
            <i class={`${dotClassName}-item`}></i>
            <i class={`${dotClassName}-item`}></i>
          </span>
        )
      }

      const spinClassName = {
        [prefixClsValue]: true,
        [`${prefixClsValue}-spinning`]: sSpinning.value,
      }

      const spinElement = (
        <div class={spinClassName}>
          {renderIndicator(prefixClsValue)}
          {tip ? <div class={`${prefixCls}-text`}>{tip}</div> : null}
        </div>
      )

      if (children && flattenChildren(children as any).length) {
        const containerClassName = {
          [`${prefixClsValue}-container`]: true,
          [`${prefixClsValue}-blur`]: sSpinning.value,
        }
        return wrapSSR(
          <div class={[`${prefixClsValue}-nested-loading`]}>
            {sSpinning.value && spinElement}
            <div class={containerClassName}>{children}</div>
          </div>,
        )
      }

      return wrapSSR(spinElement)
    }
  },
})
