import { computed, defineComponent, ref, watch, type ExtractPropTypes } from 'vue'
import { useProvideRadioGroup } from './context'
import { ArrayType, StringType } from '../_utils/type'
import Radio from '.'
import PropTypes from '../_utils/vue-types'
import type { RadioGroupOptionType } from './interface'
export type RadioGroupChildOption = {
  label?: string
  value: string
  disabled?: boolean
}

export const radioGroupProps = () => ({
  options: ArrayType<string | number | RadioGroupChildOption>(),
  value: PropTypes.any,
  optionType: StringType<RadioGroupOptionType>('default'),
})

export type RadioGroupProps = Partial<ExtractPropTypes<ReturnType<typeof radioGroupProps>>>

export default defineComponent({
  name: 'PRadioGroup',
  props: radioGroupProps(),
  setup(props, { slots, emit }) {
    const { options } = props
    const stateValue = ref(props.value)

    watch(
      () => props.value,
      () => {
        stateValue.value = props.value
      },
    )

    const onRadioChange = (e: any) => {
      const { value } = e.target
      emit('update:value', value)
    }

    useProvideRadioGroup({
      value: stateValue,
      onChange: onRadioChange,
      optionType: computed(() => props.optionType),
    })

    return () => {
      let children: any = null
      if (options?.length) {
        children = options.map((option) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            )
          } else {
            const { value, label, disabled } = option as RadioGroupChildOption
            return (
              <Radio key={value} value={value} disabled={disabled}>
                {label}
              </Radio>
            )
          }
        })
      } else {
        children = slots.default?.()
      }
      return <div>{children}</div>
    }
  },
})
