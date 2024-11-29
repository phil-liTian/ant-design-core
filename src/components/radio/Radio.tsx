import { defineComponent, type ExtractPropTypes } from 'vue'
import PropTypes from '../_utils/vue-types'
import VcCheckbox from '../vc-checkbox/Checkbox'
import classNames from '../_utils/classNames'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { BooleanType, FunctionType, StringType } from '../_utils/type'
import { useInjectRadioGroup } from './context'
import useStyle from './style'

export const radioProps = () => ({
  prefixCls: StringType(),
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
    const [WrapSSR] = useStyle(prefixCls)
    const prefixClsValue = prefixCls.value
    const radioGroupContext = useInjectRadioGroup()

    const handleChange = (e) => {
      const targetChecked = e.target.checked
      emit('update:checked', targetChecked)
      emit('update:value', targetChecked)
    }

    return () => {
      const radioGroup = radioGroupContext

      const rProps: RadioProps = {
        prefixCls: prefixCls.value,
        value: props.value,
      }

      const wrapperClassStr = classNames(
        {
          [`${prefixClsValue}-wrapper`]: true,
          [`${prefixClsValue}-wrapper-checked`]: rProps.checked,
        },
        attrs.class,
      )

      if (radioGroup) {
        // 在radioGroup中
        rProps.checked = radioGroup.value.value === props.value
        rProps.onChange = (e) => {
          emit('change', e)
          radioGroup.onChange(e)
        }
      } else {
        rProps.onChange = handleChange
      }
      return WrapSSR(
        <label class={wrapperClassStr}>
          <VcCheckbox {...rProps} type="radio" />
          {slots.default && <span>{slots.default()}</span>}
        </label>,
      )
    }
  },
})
