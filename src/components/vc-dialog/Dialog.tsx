import { defineComponent } from 'vue'
import initDefaultProps from '../_utils/props-util'
import { dialogPropTypes } from './IDialogPropTypes'
import Mask from './Mask'
import Content from './Content'
import omit from '../_utils/omit'

export default defineComponent({
  name: 'VcDialog',
  props: initDefaultProps(dialogPropTypes(), {
    prefixCls: 'rc-dialog',
    visible: false,
  }),
  setup(props, { slots }) {
    const { prefixCls, visible } = props
    console.log('visible', visible)

    return () => (
      <div class={[`${prefixCls}-root`]}>
        <Mask prefixCls={prefixCls} visible={visible} />
        <div class={`${prefixCls}-wrap`}>
          <Content {...omit(props, [])} v-slots={slots} />
        </div>
      </div>
    )
  },
})
