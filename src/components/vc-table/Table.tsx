import { computed, defineComponent } from 'vue'
const EMPTY_DATA = []

export default defineComponent({
  name: 'VcTable',
  inheritAttrs: false,
  props: ['prefixCls', 'data', 'title', 'footer'],
  setup(props) {
    const mergedData = computed(() => props.data || EMPTY_DATA)
    return () => {
      const fullTable = () => {
        return <div>full table</div>
      }

      return fullTable()
    }
  },
})
