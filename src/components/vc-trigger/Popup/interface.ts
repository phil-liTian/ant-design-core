import { BooleanType, FunctionType, ObjectType, StringType } from '@/components/_utils/type'
import type { StretchType } from '../interface'
import type { AlignType } from '@/components/vc-align/interface'

export const innerProps = {
  prefixCls: String,
  visible: Boolean,
  stretch: StringType<StretchType>(),

  destroyPopupOnHide: BooleanType(false),

  // func
  align: ObjectType<AlignType>(),
  getRootDomNode: FunctionType<() => HTMLElement>(),
}

export const popupProps = {
  ...innerProps,
}
