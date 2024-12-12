import type { CSSObject } from '../_utils/cssinjs/hooks/useStyleRegister'
import type { AliasToken } from '../theme/interface/alias'

export const textEllipsis: CSSObject = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

export const resetComponent = (token: AliasToken): CSSObject => ({
  boxSizing: 'border-box',
  padding: 0,
  // margin: 0,
  fontSize: `${token.fontSize}px`,
  lineHeight: `${token.lineHeight}`,
  listStyle: 'none',
  color: token.colorText,
  fontFamily: token.fontFamily,
})
