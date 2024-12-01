import { defineComponent, ref, watch } from 'vue'
import Dialog from './Dialog'
import { dialogPropTypes } from './IDialogPropTypes'
import initDefaultProps from '../_utils/props-util'

const DialogWrap = defineComponent({
  name: 'DialogWrap',
  props: initDefaultProps(dialogPropTypes(), {
    visible: false,
  }),

  setup(props, { slots }) {
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
      }

      if (!animatedVisible.value) return null
      return <Dialog {...dialogProps} v-slots={slots} />
    }
  },
})

export default DialogWrap
