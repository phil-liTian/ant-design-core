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
  setup(props, { slots, attrs }) {
    const { prefixCls, visible, wrapStyle } = props

    return () => {
      let dialogProps = {
        ...props,
        ...attrs,
      }
      const { class: className } = attrs
      return (
        <div class={[`${prefixCls}-root`]}>
          <Mask prefixCls={prefixCls} visible={visible} />
          <div class={`${prefixCls}-wrap`} style={wrapStyle}>
            <Content class={className} {...dialogProps} {...omit(props, [])} v-slots={slots} />
          </div>
        </div>
      )
    }
  },
})
