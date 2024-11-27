import { defineComponent } from 'vue'
import Input from './Input'

export default defineComponent({
  name: 'PInputPassword',
  setup() {
    return () => <Input type="password" />
  },
})
