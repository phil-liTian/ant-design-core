import type { CSSObject } from '../_utils/cssinjs/hooks/useStyleRegister'
import type { AliasToken } from '../theme/interface/alias'

export const resetComponent = (token: AliasToken): CSSObject => ({
  boxSizing: 'border-box',
  padding: 0,
  // margin: 0,
  fontSize: `${token.fontSize}px`,
  listStyle: 'none',
  color: token.colorText,
})
