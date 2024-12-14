import { BooleanType, FunctionType, ObjectType, StringType } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import type { AlignType } from '../vc-align/interface'

export type StretchType = string
export const triggerProps = () => ({
  prefixCls: String,
  popupVisible: BooleanType(undefined),
  stretch: String,
  popupStyle: ObjectType(),
  getTriggerDOMNode: FunctionType<(d?: HTMLElement) => HTMLElement>(),

  // dropdown
  // >>> placement
  builtinPlacements: PropTypes.object,
  popupPlacement: String,
  popupAlign: ObjectType({}),
})

export type BuiltinPlacements = Record<string, AlignType>
