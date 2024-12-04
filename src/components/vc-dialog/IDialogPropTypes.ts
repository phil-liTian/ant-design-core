import type { CSSProperties } from 'vue'
import { BooleanType, FunctionType, NumberType, ObjectType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'

export function dialogPropTypes() {
  return {
    prefixCls: String,
    visible: Boolean,

    // header
    title: PropTypes.any,
    closable: BooleanType(true),
    closeIcon: PropTypes.any,

    // wrap样式
    width: [Number, String],
    height: [Number, String],
    wrapClassName: String,
    wrapStyle: ObjectType<CSSProperties>(undefined),
    maskClosable: { type: Boolean, default: undefined },
    mousePosition: ObjectType<{ x: number; y: number }>(undefined),
    // 动画相关
    transitionName: String,
    maskTransitionName: String,
    animation: String,
    maskAnimation: String,

    // mask样式
    mask: BooleanType(true),
    maskStyle: ObjectType<CSSProperties>(undefined),
    zIndex: NumberType(1000),

    // body
    bodyStyle: ObjectType<CSSProperties>(undefined),

    // footer
    cancelText: PropTypes.any,
    okText: PropTypes.any,
    footer: PropTypes.any,

    // event
    onClose: FunctionType<(e: any) => void>(),
  }
}

export default dialogPropTypes
