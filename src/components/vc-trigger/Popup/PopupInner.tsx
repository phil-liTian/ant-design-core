import { flattenChildren } from '@/components/_utils/props-util'
import { defineComponent, toRef, Transition, type CSSProperties } from 'vue'
import { innerProps } from './interface'
import classNames from '@/components/_utils/classNames'
import { useStretchStyle } from './useStretchStyle'
import Align from '@/components/vc-align'

export default defineComponent({
  name: 'PopupInner',
  inheritAttrs: false,
  props: innerProps,
  setup(props, { slots, attrs }) {
    const [stretchStyle, measureStretchStyle] = useStretchStyle(toRef(props, 'stretch'))

    const doMeasure = () => {
      if (props.stretch) {
        measureStretchStyle(props.getRootDomNode())
      }
    }

    doMeasure()
    const getAlignTarget = () => props.getRootDomNode

    return () => {
      const { prefixCls, align } = props

      let childNode: any = flattenChildren(slots.default?.())
      const mergedClassName = classNames(prefixCls)
      const mergedStyle: CSSProperties[] = [
        {
          ...stretchStyle.value,
        },
        attrs.style as CSSProperties,
      ]

      return (
        <Transition
          v-slots={{
            default: () => {
              return (
                <Align
                  target={getAlignTarget()}
                  align={align}
                  v-slots={{
                    default: () => {
                      // dropdown的元素
                      return (
                        <div style={mergedStyle} class={mergedClassName}>
                          {childNode}
                        </div>
                      )
                    },
                  }}
                ></Align>
              )
            },
          }}
        ></Transition>
      )
    }
  },
})
