import type {
  CSSInterpolation,
  CSSObject,
} from '@/components/_utils/cssinjs/hooks/useStyleRegister'
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

const genBaseStyle = (token): CSSObject => {
  const { componentCls } = token
  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      borderRadius: '4px',
      backgroundColor: '#fafafa',
      border: '1px solid #d9d9d9',
      color: '#666',

      [`${componentCls}-content`]: {
        flex: 1,
      },
    },

    [`${componentCls}-with-description`]: {},
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

const genActionStyle = (token) => {}

export const genAlertStyle = (token): CSSInterpolation => [genBaseStyle(token), genTypeStyle(token)]

export default genComponentStyleHook('Alert', (token) => {
  return [genAlertStyle(token)]
})
