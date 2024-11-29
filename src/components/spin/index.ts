import { BooleanType, StringType, withInstall } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import Spin, { setDefaultIndicator } from './Spin'

Spin.setDefaultIndicator = setDefaultIndicator

export type SpinSize = 'default' | 'small' | 'large'
export const spinProps = () => ({
  prefixCls: String,
  spining: BooleanType(true),
  size: StringType<SpinSize>('default'),
  wrapperClassName: String,
  delay: Number,
  indicator: PropTypes.any,
  tip: PropTypes.any,
})

export default withInstall(Spin)
