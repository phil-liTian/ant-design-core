import BaseInput from '@/components/vc-input/BaseInput'
import { defineComponent } from 'vue'

const Input = defineComponent({
  name: 'SelectInput',

  setup() {
    let inputNode: any = <BaseInput />

    return () => <div>Input</div>
  },
})

export default Input
