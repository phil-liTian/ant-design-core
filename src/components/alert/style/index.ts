import type {
  CSSInterpolation,
  CSSObject,
} from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import genComponentStyleHook from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {}

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
  }
}

export const genAlertStyle = (token): CSSInterpolation => [genBaseStyle(token)]

export default genComponentStyleHook('Alert', (token) => {
  return [genAlertStyle(token)]
})
