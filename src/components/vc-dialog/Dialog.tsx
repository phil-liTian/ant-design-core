import { defineComponent, shallowRef } from 'vue'
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
    maskClosable: true,
  }),
  setup(props, { slots, attrs }) {
    const wrapperRef = shallowRef()
    const {
      prefixCls,
      visible,
      wrapStyle,
      transitionName,
      maskTransitionName,
      animation,
      maskAnimation,
      mask,
      maskStyle,
      zIndex,
      wrapClassName,
      maskClosable,
    } = props

    const onInternalClose = (e) => {
      props.onClose?.(e)
    }

    const onWrapperClick = (e) => {
      if (!maskClosable) return

      if (wrapperRef.value === e.target) {
        onInternalClose(e)
      }
    }

    return () => {
      let dialogProps = {
        ...props,
        ...attrs,
      }
      const { class: className } = attrs
      return (
        <div class={[`${prefixCls}-root`]}>
          <Mask
            motionName={getMotionName(prefixCls!, maskTransitionName, maskAnimation)}
            prefixCls={prefixCls}
            visible={mask && visible}
            style={{ ...maskStyle, zIndex }}
          />
          <div
            ref={wrapperRef}
            onClick={onWrapperClick}
            class={classNames(`${prefixCls}-wrap`, wrapClassName)}
            style={wrapStyle}
          >
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
