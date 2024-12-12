import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Popup',
  setup(props, { slots }) {
    return () => <div>{slots.default!()}</div>
  },
})
