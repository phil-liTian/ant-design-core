import { defineComponent } from 'vue'

export const TreeContext = defineComponent({
  name: 'TreeContext',
  setup(props, { slots }) {
    return () => slots.default?.()
  },
})
