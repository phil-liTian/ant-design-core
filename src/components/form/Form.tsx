import { defineComponent } from 'vue'
import FormItem from './FormItem'

const Form = defineComponent({
  name: 'PForm',
  inheritAttrs: false,
  Item: FormItem,
  setup(props, { slots, attrs }) {
    return () => {
      return <form {...attrs}>{slots.default?.()}</form>
    }
  },
})

export default Form as typeof Form & {
  readonly Item: typeof FormItem
}
