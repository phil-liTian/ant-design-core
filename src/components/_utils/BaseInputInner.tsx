import { defineComponent } from 'vue'
import PropTypes from './vue-types'

export default defineComponent({
  props: {
    tag: PropTypes.oneOf(['input', 'textarea']).def('input'),
  },
  setup(props) {
    return () => {
      const { tag: Tag } = props
      return <Tag />
    }
  },
})
