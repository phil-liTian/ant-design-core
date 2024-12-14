import { defineComponent } from 'vue'
import PropTypes from '../_utils/vue-types'

const List = defineComponent({
  name: 'List',
  props: {
    data: PropTypes.array,
  },
  setup(props, { slots }) {
    return () => {
      const { data } = props
      return data.map((item, index) => {
        return slots.default?.(item, index)
      })
    }
  },
})

export default List
