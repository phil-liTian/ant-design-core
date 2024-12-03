import { defineComponent } from 'vue'
import initDefaultProps from '../_utils/props-util'
import { dialogPropTypes } from './IDialogPropTypes'
import Mask from './Mask'
import Content from './Content'
import omit from '../_utils/omit'
import { getMotionName } from './util'
import classNames from '../_utils/classNames'

export default defineComponent({
  name: 'VcDialog',
  inheritAttrs: false,
  props: initDefaultProps(dialogPropTypes(), {
    prefixCls: 'rc-dialog',
    visible: false,
  }),
  setup(props, { slots, attrs }) {
    const {
      prefixCls,
      visible,
      wrapStyle,
      transitionName,
      animation,
      mask,
      maskStyle,
      zIndex,
      wrapClassName,
    } = props

    return () => {
      let dialogProps = {
        ...props,
        ...attrs,
      }
      const { class: className } = attrs
      return (
        <div class={[`${prefixCls}-root`]}>
          <Mask prefixCls={prefixCls} visible={mask && visible} style={{ ...maskStyle, zIndex }} />
          <div class={classNames(`${prefixCls}-wrap`, wrapClassName)} style={wrapStyle}>
            <Content
              {...omit(props, [])}
              motionName={getMotionName(prefixCls!, transitionName, animation)}
              class={className}
              {...dialogProps}
              visible={visible}
              v-slots={slots}
            />
          </div>
        </div>
      )
    }
  },
})
