import { defineComponent } from 'vue'
import BaseInputInner from './BaseInputInner'

export default defineComponent({
  name: 'BaseInput',
  setup() {
    return () => {
      return <BaseInputInner />
    }
  },
})
