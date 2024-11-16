import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'PButton',
  setup() {
    return () => {
      return h('button', 'hello world1')
    }
  },
})
