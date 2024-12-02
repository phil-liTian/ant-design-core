import type { CSSProperties } from 'vue'
import { BooleanType, FunctionType, ObjectType } from '../_utils/type'
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
    wrapStyle: ObjectType<CSSProperties>(undefined),
    maskClosable: BooleanType(false),
    mousePosition: ObjectType<{ x: number; y: number }>(undefined),

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
