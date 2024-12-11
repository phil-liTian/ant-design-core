import { computed, defineComponent, type CSSProperties, type PropType } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { useColStyle } from './style'
import classNames from '../_utils/classNames'
import { useInjectRow } from './context'

type ColSpanType = number | string
export interface ColSize {
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}

export const colProps = () => ({
  prefixCls: String,
  flex: [String, Number],
  span: [String, Number],
  order: [String, Number],
  offset: [String, Number],
  push: [String, Number],
  pull: [String, Number],
  xs: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
  sm: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
  md: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
  lg: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
  xl: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
  xxl: {
    type: [String, Number, Object] as PropType<string | number | ColSize>,
    default: undefined,
  },
})

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
const Col = defineComponent({
  name: 'PCol',
  props: colProps(),
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('col', props)
    const [WrapSSR] = useColStyle(prefixCls)
    const { gutter, supportFlexGap } = useInjectRow()

    const className = computed(() => {
      const { span, order, offset, push, pull } = props
      const pre = prefixCls.value
      let sizeClassObj = {}
      sizes.forEach((size) => {
        let sizeProps: ColSize = {}
        const propSize = props[size]
        if (typeof propSize === 'number') {
          // number 默认当span处理
          sizeProps.span = propSize
        } else if (typeof propSize === 'object') {
          sizeProps = propSize || {}
        }
        sizeClassObj = {
          ...sizeClassObj,
          [`${pre}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        }
      })
      return classNames(
        pre,
        {
          [`${pre}-${span}`]: span !== undefined,
          [`${pre}-order-${order}`]: order,
          [`${pre}-offset-${offset}`]: offset,
          [`${pre}-push-${push}`]: push,
          [`${pre}-pull-${pull}`]: pull,
        },
        sizeClassObj,
        attrs.class,
      )
    })

    const mergedStyle = computed(() => {
      const gutterVal = gutter.value
      let style: CSSProperties = {}
      if (gutterVal && gutterVal[0]! > 0) {
        const horizontalGutter = `${gutterVal[0]! / 2}px`
        style.paddingLeft = horizontalGutter
        style.paddingRight = horizontalGutter
      }

      if (gutterVal && gutterVal[1]! > 0 && !supportFlexGap.value) {
        const verticalGutter = `${gutterVal[1]! / 2}px`
        style.paddingTop = verticalGutter
        style.paddingBottom = verticalGutter
      }

      return style
    })

    return () =>
      WrapSSR(
        <div style={mergedStyle.value} class={className.value}>
          {slots.default?.()}
        </div>,
      )
  },
})

export default Col
