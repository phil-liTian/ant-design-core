import PropTypes from '../_utils/vue-types'

export function dialogPropTypes() {
  return {
    prefixCls: String,

    cancelText: PropTypes.any,
    okText: PropTypes.any,
    footer: PropTypes.any,
  }
}
