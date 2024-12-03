import { BooleanType } from '@/components/_utils/type'

const props = () => ({
  prefixCls: String,
  // wrapper
  width: [Number, String],
  height: [Number, String],

  // mask
  showMask: BooleanType(true),

  // footer

  // header
})

export const drawerProps = () => ({
  ...props(),
  open: BooleanType(false),
})
