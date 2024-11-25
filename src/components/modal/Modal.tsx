import { defineComponent } from 'vue'
import { BooleanType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import Dialog from '../vc-dialog'
import initDefaultProps from '../_utils/props-util'
import Button from '../button'

export const modalProps = () => ({
  visible: BooleanType(undefined),
  open: BooleanType(undefined),
  mask: BooleanType(undefined),

  // 可string| VNode | function()
  title: PropTypes.any,
  footer: PropTypes.any,
  content: PropTypes.any,
  okText: PropTypes.any,
  cancelText: PropTypes.any,

  closable: BooleanType(undefined),
})

export default defineComponent({
  name: 'PModal',
  props: initDefaultProps(modalProps(), {}),
  setup(props, { slots }) {
    const renderFooter = () => {
      const { okText = slots.okText?.(), cancelText = slots.cancelText?.() } = props
      return (
        <>
          <Button>{cancelText}</Button>
          <Button>{okText}</Button>
        </>
      )
    }

    return () => <Dialog v-slots={{ ...slots, footer: renderFooter }} />
  },
})
