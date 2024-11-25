import { defineComponent } from 'vue'
import initDefaultProps from '../_utils/props-util'
import { dialogPropTypes } from './IDialogPropTypes'
import Mask from './Mask'
import Content from './Content'

export default defineComponent({
  name: 'VcDialog',
  props: initDefaultProps(dialogPropTypes(), {
    prefixCls: 'rc-dialog',
  }),
  setup(props, { slots }) {
    const { prefixCls } = props
    return () => (
      <div class={[`${prefixCls}-root`]}>
        <Mask />
        <div class={`${prefixCls}-wrap`}>
          <Content v-slots={slots} />
        </div>
      </div>
    )
  },
})
