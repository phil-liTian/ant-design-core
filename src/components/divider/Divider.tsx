import { computed, defineComponent } from 'vue'
import { dividerProps } from '.'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import useStyle from './style'
import classNames from '../_utils/classNames'
import { flattenChildren } from '../_utils/props-util'

export default defineComponent({
  name: 'PDivider',
  inheritAttrs: false,
  props: dividerProps(),
  setup(props, { slots, attrs }) {
    const { type, dashed, plain, orientation, orientationMargin } = props
    const { prefixCls } = useConfigInject('divider', props)
    const prefixClsValue = prefixCls.value
    const [WrapSSR] = useStyle(prefixCls)
    // 左边距
    const orientationMarginLeft = computed(
      () => orientation === 'left' && props.orientationMargin != null,
    )

    // 右边距
    const orientationMarginRight = computed(
      () => orientation === 'right' && props.orientationMargin != null,
    )

    // 自定义内部children margin样式
    const innerStyle = computed(() => {
      const marginValue =
        typeof orientationMargin === 'number' ? `${orientationMargin}px` : orientationMargin

      return {
        ...(orientationMarginLeft.value && {
          marginLeft: marginValue,
        }),
        ...(orientationMarginRight.value && {
          marginRight: marginValue,
        }),
      }
    })

    return () => {
      const children = flattenChildren(slots.default?.() as any)
      const classStr = classNames(prefixClsValue, {
        [`${prefixClsValue}-${type}`]: true,
        [`${prefixClsValue}-dashed`]: dashed,
        [`${prefixClsValue}-plain`]: plain,
      })

      return WrapSSR(
        <div
          role="separator"
          class={[
            classStr,
            attrs.class,
            children.length
              ? `${prefixClsValue}-with-text ${prefixClsValue}-with-text-${orientation}}`
              : '',
          ]}
        >
          {children.length ? (
            <span class={`${prefixClsValue}-inner-text`} style={innerStyle.value}>
              {children}
            </span>
          ) : null}
        </div>,
      )
    }
  },
})
