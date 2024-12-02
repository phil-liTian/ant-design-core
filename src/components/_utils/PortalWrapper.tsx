import { computed, defineComponent, type VNode } from 'vue'
import Portal from './Portal'
import PropTypes from './vue-types'

export default defineComponent({
  name: 'PortalWrapper',
  props: {
    getContainer: PropTypes.any,
  },
  setup(props, { slots }) {
    const getContainer = computed(() => {
      return () => 'body'
    })
    return () => {
      let portal: VNode | null = null

      portal = (
        <Portal
          getContainer={getContainer.value}
          v-slots={{ default: () => slots.default?.() }}
        ></Portal>
      )

      return portal
    }
  },
})
