import type {
  CSSInterpolation,
  CSSObject,
} from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import type { GenerateStyle } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {}

type AlertToken = FullToken<'Alert'> & {
  alertIconSizeLG: number
  alertPaddingHorizontal: number
}

const genAlertTypeStyle = (
  bgColor: string,
  borderColor: string,
  iconColor: string,
  token,
  alertCls: string,
) => ({
  backgroundColor: bgColor,
  border: `1px solid ${borderColor}`,

  [`${alertCls}-icon`]: {
    color: iconColor,
  },
})

const genBaseStyle = (token: AlertToken): CSSObject => {
  const {
    componentCls,
    motionEaseInOutCirc,
    motionDurationSlow: duration,
    borderRadiusLG: borderRadius,
    colorText,
    paddingContentVerticalSM, //
    alertPaddingHorizontal,
    alertIconSizeLG,
  } = token
  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      alignItems: 'center',
      padding: `${paddingContentVerticalSM}px ${alertPaddingHorizontal}px`,
      borderRadius: `${borderRadius}px`,
      backgroundColor: '#fafafa',
      border: '1px solid #d9d9d9',

      [`${componentCls}-content`]: {
        flex: 1,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: '10px',
      },

      '&-message': {
        color: colorText,
      },
    },

    [`${componentCls}-motion-leave`]: {
      opacity: 1,
      transition: `opacity ${duration} ${motionEaseInOutCirc}, max-height ${duration} ${motionEaseInOutCirc}, padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc}, margin-bottom ${duration} ${motionEaseInOutCirc}`,
    },

    [`${componentCls}-motion-leave-active`]: {
      maxHeight: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginBottom: 0,
      opacity: 0,
    },

    [`${componentCls}-with-description`]: {},

    [`${componentCls}-banner`]: {
      border: '0 !important',
    },
  }
}

// 处理type样式
const genTypeStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    componentCls,

    colorInfoBg,
    colorInfoBorder,
    colorInfo,

    colorSuccessBg,
    colorSuccessBorder,
    colorSuccess,

    colorWarningBg,
    colorWarningBorder,
    colorWarning,

    colorError,
    colorErrorBg,
    colorErrorBorder,
  } = token
  return {
    [`${componentCls}`]: {
      '&-info': genAlertTypeStyle(colorInfoBg, colorInfoBorder, colorInfo, token, componentCls),

      '&-success': {
        ...genAlertTypeStyle(colorSuccessBg, colorSuccessBorder, colorSuccess, token, componentCls),
      },

      '&-warning': genAlertTypeStyle(
        colorWarningBg,
        colorWarningBorder,
        colorWarning,
        token,
        componentCls,
      ),

      '&-error': genAlertTypeStyle(colorErrorBg, colorErrorBorder, colorError, token, componentCls),
    },
  }
}

const genActionStyle = (token) => {
  const { componentCls, closeIcon } = token

  return {
    [`${componentCls}`]: {
      '&-action': {},

      '&-close-icon': {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
      },

      '&-close-text': {
        color: closeIcon,
      },
    },
  }
}

export const genAlertStyle = (token): CSSInterpolation => [
  genBaseStyle(token),
  genTypeStyle(token),
  genActionStyle(token),
]

export default genComponentStyleHook('Alert', (token) => {
  const alertToken: AlertToken = {
    ...token,
    alertIconSizeLG: token.fontSizeLG * 1.7142,
    alertPaddingHorizontal: 12,
  }

  return [genAlertStyle(alertToken)]
})
