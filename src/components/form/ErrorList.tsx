import { defineComponent, Transition } from 'vue'

export default defineComponent({
  name: 'ErrorList',
  props: ['errors', 'help', 'warnings', 'validateStatus'],
  setup() {
    return () => {
      return (
        <Transition>
          <div>error</div>
        </Transition>
      )
    }
  },
})
