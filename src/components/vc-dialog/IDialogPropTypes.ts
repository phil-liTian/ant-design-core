import { BooleanType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'

export function dialogPropTypes() {
  return {
    prefixCls: String,
    visible: Boolean,

    // header
    title: PropTypes.any,

    // wrap样式
    width: [Number, String],
    height: [Number, String],

    // footer
    cancelText: PropTypes.any,
    okText: PropTypes.any,
    footer: PropTypes.any,
  }
}

export default dialogPropTypes
