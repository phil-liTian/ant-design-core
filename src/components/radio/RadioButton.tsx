import { defineComponent } from 'vue'
import Radio from '.'
import { radioProps } from './Radio'
import { useProvideRadioOptionTypeContext } from './context'

export default defineComponent({
  name: 'PRadioButton',
  inheritAttrs: false,
  props: radioProps(),
  setup(props, { slots, attrs }) {
    useProvideRadioOptionTypeContext('button')
    return () => (
      <Radio {...attrs} {...props}>
        {slots.default?.()}
      </Radio>
    )
  },
})
