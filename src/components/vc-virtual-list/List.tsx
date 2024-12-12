import { defineComponent } from 'vue'

const List = defineComponent({
  name: 'List',
  props: {},
  setup(props, { slots }) {
    return () => slots.default?.()
  },
})

export default List
