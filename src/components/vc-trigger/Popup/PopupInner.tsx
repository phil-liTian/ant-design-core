import { flattenChildren } from '@/components/_utils/props-util'
import { defineComponent, shallowRef, toRef, Transition, watch, type CSSProperties } from 'vue'
import { innerProps } from './interface'
import classNames from '@/components/_utils/classNames'
import { useStretchStyle } from './useStretchStyle'
import Align from '@/components/vc-align'
import { getTransitionProps } from '@/components/_utils/transition'

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
    const visible = shallowRef(false)

    let timeoutId: any
    watch(
      () => props.visible,
      (val) => {
        visible.value = val
        // clearTimeout(timeoutId)
        // if (val) {
        //   timeoutId = setTimeout(() => {})
        // } else {
        //   visible.value = false
        // }
      },
      { immediate: true },
    )

    return () => {
      const { prefixCls, align, destroyPopupOnHide } = props

      let childNode: any = flattenChildren(slots.default?.())

      const mergedClassName = classNames(prefixCls, attrs.class, {})
      const mergedStyle: CSSProperties[] = [
        {
          ...stretchStyle.value,
        },

        attrs.style as CSSProperties,
      ]

      const transitionProps = getTransitionProps('phil-slide-up')

      return (
        <Transition
          {...transitionProps}
          v-slots={{
            default: () => {
              return props.visible ? (
                <Align
                  v-show={visible.value}
                  target={getAlignTarget()}
                  align={align}
                  key="popup"
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
              ) : null
            },
          }}
        ></Transition>
      )
    }
  },
})
