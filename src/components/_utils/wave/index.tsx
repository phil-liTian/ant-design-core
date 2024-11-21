import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Wave',
  setup(props, { slots }) {
    const children = slots.default?.()[0]
    return children
  },
})
