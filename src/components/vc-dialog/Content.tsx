import { defineComponent, Transition } from 'vue'
import Button from '../button'
import { dialogPropTypes } from './IDialogPropTypes'

export default defineComponent({
  name: 'DialogContent',
  props: {
    ...dialogPropTypes(),
  },

  setup(props, { slots }) {
    return () => (
      <Transition>
        <div>content</div>
      </Transition>
    )
  },
})
