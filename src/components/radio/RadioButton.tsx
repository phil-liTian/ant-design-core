import { defineComponent } from 'vue'
import Radio from '.'

export default defineComponent({
  name: 'PRadioButton',
  setup(props, { slots }) {
    return () => <Radio>{slots.default?.()}</Radio>
  },
})
