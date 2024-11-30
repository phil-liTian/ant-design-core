import type { ExtractPropTypes } from 'vue'
import { BooleanType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'

export const dividerProps = () => ({
  prefixCls: String,
  type: StringType<'horizontal' | 'vertical'>('horizontal'),
  dashed: BooleanType(false),
  orientation: StringType<'left' | 'right' | 'center'>('center'),
  plain: BooleanType(false),
  orientationMargin: PropTypes.oneOfType([String, Number]),
})

export type DividerProps = Partial<ExtractPropTypes<ReturnType<typeof dividerProps>>>
