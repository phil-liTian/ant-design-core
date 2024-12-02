import type { ExtractPropTypes } from 'vue'
import { BooleanType, StringType, withInstall } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import Spin, { setDefaultIndicator } from './Spin'

Spin.setDefaultIndicator = setDefaultIndicator

export type SpinSize = 'default' | 'small' | 'large'
export function spinProps() {
  return {
    prefixCls: String,
    spining: BooleanType(true),
    size: StringType<SpinSize>('default'),
    wrapperClassName: String,
    delay: Number,
    indicator: PropTypes.any,
    tip: PropTypes.any,
  }
}

export type SpinProps = Partial<ExtractPropTypes<ReturnType<typeof spinProps>>>

export default withInstall(Spin)
