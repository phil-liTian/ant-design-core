import { defineComponent, ref, watch } from 'vue'
import Dialog from './Dialog'
import { dialogPropTypes } from './IDialogPropTypes'
import initDefaultProps from '../_utils/props-util'
import Portal from '../_utils/PortalWrapper'

const DialogWrap = defineComponent({
  name: 'DialogWrap',
  props: initDefaultProps(dialogPropTypes(), {
    visible: false,
  }),

  setup(props, { slots, attrs }) {
    const animatedVisible = ref(props.visible)
    watch(
      () => props.visible,
      (val) => {
        animatedVisible.value = val
      },
    )
    return () => {
      const dialogProps = {
        ...props,
        ...attrs,
      }

      if (!animatedVisible.value) return null
      return (
        <Portal visible={true}>
          <Dialog {...dialogProps} v-slots={slots} />
        </Portal>
      )
    }
  },
})

export default DialogWrap
