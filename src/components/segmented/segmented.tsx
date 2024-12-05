import { computed, defineComponent } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { segmentedProps, type SegmentedOption } from './index'
import MotionThumb from './MotionThumb'
import useStyle from './style'

function normalizeOptions(options: (SegmentedOption | string | number)[]) {
  return options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: option?.toString(),
        title: option?.toString(),
        value: option?.toString(),
      }
    }

    return option
  })
}

export default defineComponent({
  name: 'PSegmented',
  props: segmentedProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('segmented', props)

    const [WrapSSR] = useStyle(prefixCls)
    const segmentedOptions = computed(() => normalizeOptions(props.options))

    return () => {
      const pre = prefixCls.value
      return WrapSSR(
        <div class={`${pre}-group`}>
          <MotionThumb />
        </div>,
      )
    }
  },
})
