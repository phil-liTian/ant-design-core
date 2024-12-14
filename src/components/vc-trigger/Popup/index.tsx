import { defineComponent } from 'vue'
import PopupInner from './PopupInner'

export default defineComponent({
  name: 'Popup',
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () => {
      const cloneProps = { ...props, ...attrs }

      let popupNode = <PopupInner {...cloneProps} v-slots={{ default: slots.default }} />
      return <div>{popupNode}</div>
    }
  },
})
