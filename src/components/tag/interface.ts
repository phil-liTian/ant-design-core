import type { ExtractPropTypes } from 'vue'
import { BooleanType, EventType, FunctionType, StringType, type LiteralUnion } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { PresetStatusColorType, PresetColorType } from '../_utils/colors'

export const tagProps = () => ({
  prefixCls: String,
  icon: PropTypes.any,
  color: StringType<LiteralUnion<PresetStatusColorType | PresetColorType>>,
  closable: BooleanType(false),
  closeIcon: PropTypes.any,
  visible: BooleanType(),
  onClose: FunctionType<(e) => void>(),
  bordered: BooleanType(true),
  onClick: EventType<(e) => void>(),
})

export type TagProps = Partial<ExtractPropTypes<ReturnType<typeof tagProps>>>

export const checkboxTagProps = () => ({
  prefixCls: String,
  checked: BooleanType(false),
  onChange: FunctionType<(e) => void>(),
})

export type CheckboxTagProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxTagProps>>>
