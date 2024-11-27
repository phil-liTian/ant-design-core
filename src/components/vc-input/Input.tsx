import { defineComponent, shallowRef } from 'vue'
import BaseInput from './BaseInput'
import BaseInputCore from '../_utils/BaseInput'
import { inputProps } from './inputProps'

export default defineComponent({
  name: 'VCInput',
  props: inputProps(),
  setup(props, { slots }) {
    const { prefix, suffix, prefixCls } = props

    const stateValue = shallowRef(props.value ?? props.defaultValue)

    const setValue = (value: any) => {
      stateValue.value = value
    }

    // input输入值
    const handleChange = (e: any) => {
      const { value } = e.target
      if (value === stateValue.value) return
      const newValue = e.target.value
      setValue(newValue)
    }

    // 重置值
    const handleReset = (e: any): void => {
      setValue('')
    }

    const getInputElement = () => {
      const inputProps = {
        onChange: handleChange,
        onInput: handleChange,
      }

      const inputNode = <BaseInputCore {...inputProps} />

      return inputNode
    }

    const getSuffix = () => {
      const { suffix = slots.suffix?.() } = props

      if (suffix) {
        return suffix
      }

      return null
    }

    return () => {
      return (
        <BaseInput
          prefixCls={prefixCls}
          prefix={prefix}
          suffix={getSuffix()}
          handleReset={handleReset}
          inputElement={getInputElement()}
        />
      )
    }
  },
})
