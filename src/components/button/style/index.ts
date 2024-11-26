import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import genComponentStyleHook, { type FullToken } from '../../theme/utils/genComponentStyleHook'
import { mergeToken } from '@/components/theme/internal'

export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  colorOutlineDefault: string
  buttonPaddingHorizontal: number
}

// ======================= Shared ============================
const genSharedButtonStyle = (token): CSSObject => {
  const { componentCls, lineWidth, lineType } = token

  return {
    [componentCls]: {
      outline: 'none',
      cursor: 'pointer',
      border: `${lineWidth}px ${lineType} transparent`,
    },
  }
}

// ===========================type=========================
// default
const genDefaultButtonStyle = (token): CSSObject => ({
  backgroundColor: token.colorBgContainer,
  borderColor: token.colorBorder,

  ...genGhostButtonStyle(token.componentCls, token.colorBgContainer, token.colorBgContainer, {
    backgroundColor: token.colorBgContainer,
    borderColor: token.colorPrimary,
    color: token.colorPrimary,
  }),
})

// primary
const genPrimaryButtonStyle = (token): CSSObject => ({
  backgroundColor: token.colorPrimary,
  color: token.colorTextLightSolid,

  [`&${token.componentCls}-dangerous`]: {
    backgroundColor: token.colorError,
  },
})

// dashed
const genDashedButtonStyle = (token): CSSObject => ({
  ...genDefaultButtonStyle(token),
  borderStyle: 'dashed',
})

// link
const genLinkButtonStyle = (token): CSSObject => ({
  color: token.colorLink,
  'background-color': 'transparent',
})

// text
const genTextButtonStyle = (token): CSSObject => ({
  'background-color': 'transparent',
})

// disabled
const genDisabledButtonStyle = (token): CSSObject => ({
  'background-color': token.colorBgContainerDisabled,
})

const genTypeButtonStyle = (token): CSSObject => {
  const { componentCls } = token
  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
    [`${componentCls}-disabled`]: genDisabledButtonStyle(token),
  }
}

// ===========================shape=========================

const genCircleButtonStyle = (token) => ({
  minWidth: `${token.controlHeight}px`,
  borderRadius: '50%',
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
})

const genRoundButtonStyle = (token) => ({
  borderRadius: `${token.controlHeight}px`,
  paddingInlineStart: `${token.controlHeight / 2}px`,
  paddingInlineEnd: `${token.controlHeight / 2}px`,
})

// ===========================size=========================

// common
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls: string = ''): CSSObject => {
  const {
    componentCls,
    fontSize,
    lineHeight,
    buttonPaddingHorizontal,
    lineWidth,
    controlHeight,
    borderRadius,
  } = token

  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth)
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth

  return [
    {
      [`${componentCls}${sizePrefixCls}`]: {
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius: `${borderRadius}px`,
        height: `${controlHeight}px`,
      },
    },

    {
      [`${componentCls}-circle`]: {
        ...genCircleButtonStyle(token),
      },
      [`${componentCls}-round`]: {
        ...genRoundButtonStyle(token),
      },
    },
  ]
}

// base
const genSizeBaseButtonStyle = (token): CSSObject => {
  return genSizeButtonStyle(token)
}

// large
const genSizeLargeButtonStyle = (token): CSSObject => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
  })
  return genSizeButtonStyle(largeToken, '-lg')
}

// small
const genSizeSmallButtonStyle = (token): CSSObject => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
  })
  return genSizeButtonStyle(smallToken, '-sm')
}

// ===========================block=========================
const genBlockButtonStyle = (token): CSSObject => {
  return {
    [`${token.componentCls}-block`]: {
      width: '100%',
    },
  }
}

// ===========================ghost=========================

const genHoverActiveButtonStyle = (hoverStyle: CSSObject) => {
  return {
    '&:hover': hoverStyle,
  }
}

const genGhostButtonStyle = (
  btnCls: string,
  textColor: string,
  borderColor: string,
  hoverStyle: CSSObject,
): CSSObject => {
  return {
    [`&${btnCls}-background-ghost`]: {
      backgroundColor: 'transparent',
      borderColor: borderColor || undefined,
      color: textColor || undefined,

      ...genHoverActiveButtonStyle(hoverStyle),
    },
  }
}

export default genComponentStyleHook('Button', (token) => {
  const { controlTmpOutline, paddingContentHorizontal } = token
  const buttonToken = mergeToken<ButtonToken>(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal,
  })
  return [
    // Shared
    genSharedButtonStyle(buttonToken),

    // Size
    genSizeBaseButtonStyle(buttonToken),
    genSizeSmallButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),

    // type
    genTypeButtonStyle(buttonToken),

    // block
    genBlockButtonStyle(buttonToken),

    // ghost
  ]
})
