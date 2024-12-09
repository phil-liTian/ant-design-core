import { defineComponent, ref, watch } from 'vue'
import BaseInputInner from './BaseInputInner'
import PropTypes from './vue-types'
import { StringType } from './type'

export default defineComponent({
  name: 'BaseInput',
  props: {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    tag: StringType<'input' | 'textarea'>('input'),
    type: PropTypes.string,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const renderValue = ref()

    watch(
      [() => props.value],
      () => {
        renderValue.value = props.value
      },
      { immediate: true },
    )

    const handleChange = (e) => {
      emit('change', e)
    }

    return () => {
      const { value, ...restProps } = props

      return <BaseInputInner {...restProps} onChange={handleChange} value={renderValue.value} />
    }
  },
})
