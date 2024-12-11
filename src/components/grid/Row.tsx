import {
  computed,
  defineComponent,
  onMounted,
  ref,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import classNames from '../_utils/classNames'
import { BooleanType, someType } from '../_utils/type'
import { useRowStyle } from './style'
import useProvideRow from './context'
import useResponsiveObserve, { type ScreenMap } from '../_utils/responsiveObserve'

export type Gap = number | undefined
export type Gutter = number | undefined
export const rowProps = () => ({
  prefixCls: String,
  wrap: BooleanType(undefined),
  gutter: someType<Gutter | [Gutter, Gutter]>([Number, Array], 0),
})

export type RowProps = Partial<ExtractPropTypes<ReturnType<typeof rowProps>>>

const Row = defineComponent({
  name: 'PRow',
  inheritAttrs: false,
  props: rowProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('row', props)
    const [WrapSSR] = useRowStyle(prefixCls)
    const screens = ref<ScreenMap>({
      xs: true,
      xl: true,
      sm: true,
      md: true,
      lg: true,
      xxl: true,
    })
    const curScreens = ref<ScreenMap>({
      xs: false,
      xl: false,
      sm: false,
      md: false,
      lg: false,
      xxl: false,
    })
    const responsiveObserve = useResponsiveObserve()

    const supportFlexGap = ref(true)
    const gutter = computed(() => {
      let results: [Gap, Gap] = [undefined, undefined]
      const { gutter = 0 } = props
      results = Array.isArray(gutter) ? gutter : [gutter, undefined]
      // results = normalizedGutter

      return results
    })
    useProvideRow({
      gutter,
      wrap: computed(() => props.wrap),
      supportFlexGap: supportFlexGap,
    })

    const className = computed(() =>
      classNames(prefixCls.value, {
        [`${prefixCls.value}-no-wrap`]: props.wrap === false,
      }),
    )

    const rowStyle = computed(() => {
      const gt = gutter.value
      let style: CSSProperties = {}
      const horizontalGutter = gt[0] && gt[0] > 0 ? `${gt[0] / -2}px` : undefined

      if (horizontalGutter) {
        style.marginLeft = horizontalGutter
        style.marginRight = horizontalGutter
      }

      if (supportFlexGap.value) {
        style.rowGap = gt[1] ? `${gt[1]}px` : undefined
      }

      return style
    })

    onMounted(() => {
      responsiveObserve.value.subscribe((screen) => {
        curScreens.value = screen
      })
    })

    return () =>
      WrapSSR(
        <div style={rowStyle.value} class={className.value}>
          {slots.default?.()}
        </div>,
      )
  },
})

export default Row
