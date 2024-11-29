import { defineComponent, type ExtractPropTypes, computed } from 'vue'
import PropTypes from '../_utils/vue-types'
import VcCheckbox from '../vc-checkbox/Checkbox'
import classNames from '../_utils/classNames'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { BooleanType, FunctionType, StringType } from '../_utils/type'
import { useInjectRadioGroup, useInjectRadioOptionTypeContext } from './context'
import useStyle from './style'
import omit from '../_utils/omit'

export const radioProps = () => ({
  prefixCls: StringType(),
  value: PropTypes.any,
  checked: BooleanType(),
  onChange: FunctionType<(e) => void>(),
  disabled: BooleanType(),
})

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>

export default defineComponent({
  name: 'PRadio',
  props: radioProps(),
  setup(props, { attrs, slots, emit }) {
    const { prefixCls: radioPrefixCls } = useConfigInject('radio', props)
    const radioGroupContext = useInjectRadioGroup()
    const radioOptionTypeContext = useInjectRadioOptionTypeContext()

    const prefixCls = computed(() => {
      return radioGroupContext?.optionType.value === 'button' || radioOptionTypeContext
        ? `${radioPrefixCls.value}-button`
        : radioPrefixCls.value
    })

    const [WrapSSR] = useStyle(radioPrefixCls)

    const prefixClsValue = prefixCls.value

    const handleChange = (e) => {
      console.log('handleChange')

      const targetChecked = e.target.checked
      emit('update:checked', targetChecked)
      emit('update:value', targetChecked)
      emit('change', e)
    }

    return () => {
      const radioGroup = radioGroupContext

      const rProps: RadioProps = {
        ...omit(props, ['prefixCls']),
        prefixCls: prefixCls.value,
        checked: props.checked,
      }

      console.log('rProps', rProps)

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

      const wrapperClassStr = classNames(
        {
          [`${prefixClsValue}-wrapper`]: true,
          [`${prefixClsValue}-wrapper-checked`]: rProps.checked,
        },
        attrs.class,
      )
      return WrapSSR(
        <label class={wrapperClassStr}>
          <VcCheckbox {...rProps} type="radio" />
          {slots.default && <span>{slots.default()}</span>}
        </label>,
      )
    }
  },
})
