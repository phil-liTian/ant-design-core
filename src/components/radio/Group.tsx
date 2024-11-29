import { defineComponent, ref, watch, type ExtractPropTypes } from 'vue'
import { useProvideRadioGroup } from './context'
import { ArrayType } from '../_utils/type'
import Radio from '.'
import PropTypes from '../_utils/vue-types'

export const radioGroupProps = () => ({
  options: ArrayType<string | number>(),
  value: PropTypes.any,
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
    })

    return () => {
      let children: any = null
      if (options?.length) {
        children = options.map((option) => <Radio></Radio>)
      } else {
        children = slots.default?.()
      }
      return <div>{children}</div>
    }
  },
})
