import { defineComponent } from 'vue'
import { useSelectProps } from './SelectContext'
import useMemo from '../_utils/hooks/useMemo'

export default defineComponent({
  name: 'OptionList',
  setup() {
    const props = useSelectProps()

    const memoFlattenOptions = useMemo(() => props.flattenOptions, [() => props.flattenOptions])

    return () => <div>OptionList</div>
  },
})
