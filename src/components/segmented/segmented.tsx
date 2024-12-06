import { computed, defineComponent, shallowRef, type FunctionalComponent } from 'vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { segmentedProps, type SegmentedBaseOption } from './index'
import MotionThumb from './MotionThumb'
import useStyle from './style'
import classNames from '../_utils/classNames'
import type { VueNode } from '../_utils/type'

export type SegmentedValue = string | number
export interface SegmentedOption extends SegmentedBaseOption {
  label?: VueNode | ((option: SegmentedBaseOption) => VueNode)
}

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

const SegmentedOption: FunctionalComponent<
  SegmentedOption & {
    prefixCls: string
    checked: boolean
    onChange: (_event, val: SegmentedValue) => void
  }
> = (props, { slots, emit }) => {
  const {
    className,
    prefixCls,
    value,
    disabled,
    checked,
    label = slots.label,
    payload,
    title,
  } = props
  const handleChange = (event) => {
    if (!disabled) {
      emit('change', event, value)
    }
  }

  return (
    <label class={classNames(className, {})}>
      <input
        checked={checked}
        class={`${prefixCls}-item-input`}
        type="radio"
        onChange={handleChange}
      />
      <div class={`${prefixCls}-item-label`}>
        {/* 函数组件处理插槽 */}
        {typeof label === 'function' ? label({ payload, value, title }) : value}
      </div>
    </label>
  )
}

SegmentedOption.inheritAttrs = false

export default defineComponent({
  name: 'PSegmented',
  props: segmentedProps(),
  emits: ['change', 'update:value'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useConfigInject('segmented', props)
    const rootRef = shallowRef<HTMLDivElement>()
    const thumbShow = shallowRef(false)

    const [WrapSSR] = useStyle(prefixCls)
    const segmentedOptions = computed(() => normalizeOptions(props.options))

    const handleChange = (e, val: SegmentedValue) => {
      if (props.disabled) return
      emit('update:value', val)
      emit('change', val)
    }

    return () => {
      const pre = prefixCls.value
      return WrapSSR(
        <div class={classNames(pre, {})} ref={rootRef}>
          <div class={`${pre}-group`}>
            <MotionThumb
              prefixCls={pre}
              value={props.value}
              containerRef={rootRef}
              motionName={`${pre}-${props.motionName}`}
              getValueIndex={(value) =>
                segmentedOptions.value.findIndex((item) => item.value === value)
              }
            />

            {segmentedOptions.value.map((segmentedOption) => (
              <SegmentedOption
                v-slots={slots}
                onChange={handleChange}
                checked={props.value === segmentedOption.value}
                className={classNames(segmentedOption.className, `${pre}-item`, {
                  [`${pre}-item-selected`]: segmentedOption.value === props.value,
                })}
                prefixCls={pre}
                {...segmentedOption}
              />
            ))}
          </div>
        </div>,
      )
    }
  },
})
