import { defineComponent, type ExtractPropTypes } from 'vue'
import PropTypes from '../_utils/vue-types'
import VcCheckbox from '../vc-checkbox/Checkbox'
import classNames from '../_utils/classNames'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { BooleanType, FunctionType } from '../_utils/type'
import { useInjectRadioGroup } from './context'

export const radioProps = () => ({
  value: PropTypes.any,
  checked: BooleanType(),
  onChange: FunctionType<(e) => void>(),
})

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>

export default defineComponent({
  name: 'PRadio',
  props: radioProps(),
  setup(props, { attrs, slots, emit }) {
    const { prefixCls } = useConfigInject('radio', props)
    const prefixClsValue = prefixCls.value
    const radioGroupContext = useInjectRadioGroup()
    const wrapperClassStr = classNames(
      {
        [`${prefixClsValue}-wrapper`]: true,
      },
      attrs.class,
    )

    const handleChange = (e) => {
      const targetChecked = e.target.checked
      emit('update:checked', targetChecked)
      emit('update:value', targetChecked)
    }

    const rProps: RadioProps = {}

    return () => {
      const radioGroup = radioGroupContext

      if (radioGroup) {
        // 在radioGroup中
      } else {
        rProps.onChange = handleChange
      }
      return (
        <label class={wrapperClassStr}>
          <VcCheckbox {...rProps} type="radio" />
          {slots.default && <span>{slots.default()}</span>}
        </label>
      )
    }
  },
})
