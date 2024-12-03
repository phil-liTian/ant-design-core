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
  modalHeaderCloseSize: number
  modalCloseBtnSize: number
  modalConfirmIconSize: number
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
        [`${componentCls}.${token.antCls}-zoom-enter`]: {
          opacity: '0',
        },

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
  const {
    componentCls,
    modalContentBg,
    borderRadiusLG,
    paddingMD,
    modalCloseBtnSize,
    modalHeaderCloseSize,
  } = token

  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap`]: {
        position: 'fixed',
        zIndex: `${token.zIndexPopupBase}`,
      },

      [`${componentCls}-content`]: {
        backgroundColor: modalContentBg,
        borderRadius: borderRadiusLG,
        padding: `${paddingMD}px`,

        [`${componentCls}-close`]: {
          position: 'absolute',
          top: `${(modalHeaderCloseSize - modalCloseBtnSize) / 2}px`,
          insetInlineEnd: `${(modalHeaderCloseSize - modalCloseBtnSize) / 2}px`,
        },
      },

      [`${componentCls}-header`]: {
        color: token.colorText,
        marginBottom: token.marginXS,

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

// 处理confirm样式
const genModalConfirmStyle = (token): CSSObject => {
  const { componentCls } = token
  const confirmComponentCls = `${componentCls}-confirm`
  console.log('confirmComponentCls', confirmComponentCls)

  return {
    [`${confirmComponentCls}`]: {
      [`${confirmComponentCls}-body`]: {
        [`.${token.iconCls}`]: {
          fontSize: token.modalConfirmIconSize,
          marginInlineEnd: token.marginXS,
        },
      },

      [`${confirmComponentCls}-btns`]: {
        textAlign: 'end',

        [`.${token.antCls}-btn`]: {
          marginInlineStart: token.marginXS,
        },
      },
    },

    [`${confirmComponentCls}-error ${confirmComponentCls}-body > .${token.antCls}`]: {
      color: token.colorError,
    },

    [`${confirmComponentCls}-info ${confirmComponentCls}-body > .${token.iconCls}`]: {
      color: token.colorInfo,
    },

    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > .${token.iconCls}`]: {
      color: token.colorWarning,
    },

    [`${confirmComponentCls}-confirm ${confirmComponentCls}-body > .${token.iconCls}`]: {
      color: token.colorWarning,
    },
  }
}

export default genComponentStyleHook('Modal', (token) => {
  const headerPaddingVertical = token.padding
  const headerFontSize = token.fontSizeHeading5
  const headerLineHeight = token.lineHeightHeading5

  const modalToken = mergeToken<ModalToken>(token, {
    modalContentBg: token.colorBgContainer,
    modalHeaderTitleFontSize: headerFontSize,
    modalHeaderCloseSize: headerLineHeight * headerFontSize + headerPaddingVertical * 2,
    modalCloseBtnSize: token.controlHeightLG * 0.55,
    modalConfirmIconSize: token.fontSize * token.lineHeight,
  })

  return [
    genModalMaskStyle(modalToken),
    genModalStyle(modalToken),
    genModalConfirmStyle(modalToken),
  ]
})
