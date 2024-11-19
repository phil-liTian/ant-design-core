import type { ExtractPropTypes, Prop, PropType } from 'vue'
import type { SizeType } from '../config-provider/context'
import PropTypes from '../_utils/vue-types'

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
export type ButtonShape = 'circle' | 'round' | 'default'
export type ButtonHTMLType = 'submit' | 'reset' | 'button'

export const buttonProps = () => ({
  prefixCls: String,
  type: String as PropType<ButtonType>,
  shape: { type: String as PropType<ButtonShape> },
  htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
  size: { type: String as PropType<SizeType>, default: undefined },

  disabled: { type: Boolean, default: undefined },
  ghost: { type: Boolean, default: undefined },
  block: { type: Boolean, default: undefined },
  danger: { type: Boolean, default: undefined },

  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay?: number }>,
    default: (): boolean | { delay?: number } => false,
  },

  icon: PropTypes.any,
  href: String,
  target: String,
  title: String,
})

export default buttonProps

export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>
