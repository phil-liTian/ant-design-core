import { defineComponent, onBeforeMount, Teleport } from 'vue'
import PropTypes from './vue-types'

export default defineComponent({
  name: 'Portal',
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
  },

  setup(props, { slots }) {
    let container: HTMLElement

    function setContainer() {
      container = props.getContainer!()
    }

    onBeforeMount(() => setContainer())

    return () => (container ? <Teleport to={container} v-slots={slots}></Teleport> : null)
  },
})
