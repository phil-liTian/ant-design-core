import { defineComponent } from 'vue'
import Dialog from './Dialog'

const DialogWrap = defineComponent({
  name: 'DialogWrap',

  setup(props, { slots }) {
    return () => <Dialog v-slots={slots} />
  },
})

export default DialogWrap
