import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import type { AliasToken } from '@/components/theme/interface/alias'
import type { GenerateStyle } from '@/components/theme/internal'
import genComponentStyleHook, {
  type TokenWithCommonCls,
} from '@/components/theme/utils/genComponentStyleHook'
import type { CSSProperties } from 'vue'

export interface ComponentToken {}

function box(position: CSSProperties['position']): CSSProperties {
  return {
    position,
    top: 0,
    bottom: 0,
    insetInlineEnd: 0,
    insetInlineStart: 0,
  }
}

export const genModalMaskStyle: GenerateStyle<TokenWithCommonCls<AliasToken>> = (
  token,
): CSSObject => {
  const { componentCls, colorBgMask } = token
  return [
    {
      [`${componentCls}-root`]: {
        [`${componentCls}-mask`]: {
          ...box('fixed'),
          zIndex: 1,
          backgroundColor: colorBgMask,
        },
      },
    },
  ]
}

export default genComponentStyleHook('Modal', (token) => {
  return [genModalMaskStyle(token)]
})
