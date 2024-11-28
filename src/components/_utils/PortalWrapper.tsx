import { defineComponent, type VNode } from 'vue'
import Portal from './Portal'

export default defineComponent({
  name: 'PortalWrapper',
  setup() {
    return () => {
      let portal: VNode | null = null

      portal = <Portal></Portal>

      return portal
    }
  },
})
