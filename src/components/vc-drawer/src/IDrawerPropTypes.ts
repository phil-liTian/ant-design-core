import {
  BooleanType,
  FunctionType,
  NumberType,
  ObjectType,
  StringType,
} from '@/components/_utils/type'
import PropTypes from '@/components/_utils/vue-types'
import type { CSSProperties, TransitionProps } from 'vue'

export type IPlacement = 'left' | 'top' | 'right' | 'bottom'

const props = () => ({
  prefixCls: String,
  // wrapper
  width: [Number, String],
  height: [Number, String],
  style: ObjectType<CSSProperties>({}),
  class: String,
  rootClassName: String,
  rootStyle: ObjectType<CSSProperties>({}),
  wrapperClassName: String,
  open: BooleanType(false),
  placement: StringType<IPlacement>('right'),
  contentWrapperStyle: ObjectType<CSSProperties>({}),
  zIndex: NumberType(1000),
  keyboard: BooleanType(true),

  // mask
  showMask: BooleanType(true),
  maskClosable: { type: Boolean, default: true },
  maskStyle: ObjectType<CSSProperties>({}),

  // =============== motion =================
  maskMotion: ObjectType<TransitionProps>(),
  motion: FunctionType<(placement: IPlacement) => TransitionProps>(),

  // body
  bodyStyle: ObjectType<CSSProperties>({}),

  // event
  afterVisibleChange: Function,
  onClose: PropTypes.func,
})

export const drawerProps = () => ({
  ...props(),
  getContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.object,
  ]),
})

export const drawerChildProps = () => ({
  ...props(),
})
