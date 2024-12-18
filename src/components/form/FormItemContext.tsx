import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PFormItemRest',
  setup(props, { slots }) {
    return slots.default?.()
  },
})
