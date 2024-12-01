import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import type { AliasToken } from '@/components/theme/interface/alias'
import { mergeToken, type GenerateStyle } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
  type TokenWithCommonCls,
} from '@/components/theme/utils/genComponentStyleHook'
import type { CSSProperties } from 'vue'

export interface ComponentToken {}

export interface ModalToken extends FullToken<'Modal'> {
  modalContentBg: string
  modalHeaderTitleFontSize: number
}

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
          zIndex: '1',
          backgroundColor: colorBgMask,
        },

        [`${componentCls}-wrap`]: {
          ...box('fixed'),
          overflow: 'auto',
        },
      },
    },
  ]
}

export const genModalStyle = (token): CSSObject => {
  const { componentCls, modalContentBg, borderRadiusLG, paddingMD } = token

  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap`]: {
        position: 'fixed',
        zIndex: token.zIndexPopupBase,
      },

      [`${componentCls}-content`]: {
        backgroundColor: modalContentBg,
        borderRadius: borderRadiusLG,
        padding: `${paddingMD}px`,
      },

      [`${componentCls}-header`]: {
        color: token.colorText,

        [`${componentCls}-title`]: {
          fontWeight: `${token.fontWeightStrong}`,
          fontSize: token.modalHeaderTitleFontSize,
        },
      },

      [`${componentCls}-footer`]: {
        textAlign: 'end',

        [`.${token.antCls}-btn`]: {
          marginInlineStart: token.marginXS,
        },
      },
    },

    [`${componentCls}`]: {
      position: 'relative',
      top: 100,
      margin: '0 auto',
    },
  }
}

export default genComponentStyleHook('Modal', (token) => {
  const headerFontSize = token.fontSizeHeading5
  const modalToken = mergeToken<ModalToken>(token, {
    modalContentBg: token.colorBgContainer,
    modalHeaderTitleFontSize: headerFontSize,
  })

  return [genModalMaskStyle(token), genModalStyle(modalToken)]
})
