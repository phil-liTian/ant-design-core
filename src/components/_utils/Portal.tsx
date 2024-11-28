import { defineComponent, Teleport } from 'vue'

export default defineComponent({
  name: 'Portal',

  setup() {
    let container: HTMLElement

    return () => <Teleport to={container}></Teleport>
  },
})
