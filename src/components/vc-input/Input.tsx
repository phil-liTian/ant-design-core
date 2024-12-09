import { defineComponent, shallowRef } from 'vue'
import BaseInput from './BaseInput'
import BaseInputCore from '../_utils/BaseInput'
import { inputProps } from './inputProps'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'VCInput',
  props: inputProps(),
  emits: ['change'],
  setup(props, { slots, emit }) {
    const { prefix, suffix, prefixCls } = props

    const stateValue = shallowRef(props.value ?? props.defaultValue)

    const triggerChange = (e: any) => {
      emit('change', e)
    }

    const setValue = (value: any) => {
      stateValue.value = value
    }

    // input输入值
    const handleChange = (e: any) => {
      const { value } = e.target
      if (value === stateValue.value) return
      const newValue = e.target.value
      triggerChange(e)
      setValue(newValue)
    }

    // 重置值
    const handleReset = (e: any): void => {
      setValue('')
    }

    const getInputElement = () => {
      const { prefixCls, placeholder, allowClear, type } = props
      const inputProps = {
        value: stateValue.value,
        onChange: handleChange,
        onInput: handleChange,
        class: classNames(prefixCls, {}),
        placeholder,
        allowClear,
        type,
      }

      const inputNode = <BaseInputCore {...inputProps} />

      return inputNode
    }

    return () => {
      const { prefixCls, ...rest } = props

      const getSuffix = () => {
        const { suffix = slots.suffix?.() } = props

        if (suffix) {
          return suffix
        }

        return null
      }

      return (
        <BaseInput
          {...rest}
          prefixCls={prefixCls}
          prefix={prefix}
          suffix={getSuffix()}
          handleReset={handleReset}
          value={stateValue.value}
          inputElement={getInputElement()}
          v-slots={slots}
        />
      )
    }
  },
})
