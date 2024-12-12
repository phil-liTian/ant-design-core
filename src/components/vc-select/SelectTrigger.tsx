import { defineComponent } from 'vue'
import Trigger from '../vc-trigger'
import { BooleanType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'

export default defineComponent({
  name: 'SelectTrigger',
  props: {
    prefixCls: String,
    visible: BooleanType(undefined),
    popupElement: PropTypes.any,
  },
  setup(props, { slots }) {
    const { prefixCls } = props
    const dropdownPrefixCls = `${prefixCls}-dropdown`
    return () => {
      const { visible, popupElement } = props
      let popupNode = popupElement

      return (
        <Trigger
          popupVisible={visible}
          v-slots={{
            default: slots.default,
            popup: () => <div>{popupNode}</div>,
          }}
        ></Trigger>
      )
    }
  },
})
