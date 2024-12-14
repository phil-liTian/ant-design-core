import { defineComponent } from 'vue'
import PopupInner from './PopupInner'
import { popupProps } from './interface'

export default defineComponent({
  name: 'Popup',
  inheritAttrs: false,
  props: popupProps,
  setup(props, { slots, attrs }) {
    return () => {
      const cloneProps = { ...props, ...attrs }

      let popupNode = <PopupInner {...cloneProps} v-slots={{ default: slots.default }} />
      return <div>{popupNode}</div>
    }
  },
})
