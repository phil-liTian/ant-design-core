import { computed, defineComponent, ref, watch } from 'vue'
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
  emits: ['change', 'input'],
  setup(props, { emit, expose }) {
    const renderValue = ref()
    const inputRef = ref()

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

    const handleInput = (e) => {
      emit('input', e)
    }

    expose({
      input: computed(() => inputRef.value?.input),
    })

    return () => {
      const { value, ...restProps } = props

      return (
        <BaseInputInner
          {...restProps}
          ref={inputRef}
          onChange={handleChange}
          onInput={handleInput}
          value={renderValue.value}
        />
      )
    }
  },
})
