import { defineComponent, shallowRef, watch } from 'vue'
import PopupInner from './PopupInner'
import { popupProps } from './interface'

export default defineComponent({
  name: 'Popup',
  inheritAttrs: false,
  props: popupProps,
  setup(props, { slots, attrs }) {
    const innerVisible = shallowRef(false)

    watch(
      () => props.visible,
      (val) => {
        innerVisible.value = val
      },
      { immediate: true, flush: 'post' },
    )

    return () => {
      const cloneProps = { ...props, ...attrs, visible: innerVisible.value }

      let popupNode = <PopupInner {...cloneProps} v-slots={{ default: slots.default }} />

      return <div>{popupNode}</div>
    }
  },
})
