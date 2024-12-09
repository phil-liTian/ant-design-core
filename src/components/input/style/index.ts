import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

export interface InputToken extends FullToken<'Input'> {
  inputAffixPadding: number
  inputPaddingVertical: number
  inputPaddingVerticalLG: number
  inputPaddingVerticalSM: number
  inputPaddingHorizontal: number
  inputPaddingHorizontalLG: number
  inputPaddingHorizontalSM: number
  inputBorderHoverColor: string
  inputBorderActiveColor: string
}

const genHoverStyle = (token) => {
  return {
    borderColor: token.inputBorderHoverColor,
    borderInlineEndWidth: token.lineWidth,
  }
}

const genActiveStyle = (token) => ({
  borderColor: token.inputBorderHoverColor,
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  outline: 'none',
})

function genPlaceholderStyle(color: string) {
  return {
    '&::placeholder': {
      color,
      userSelect: 'none',
    },
  }
}
function genBasicInputStyle(token): CSSObject {
  return {
    width: '100%',
    padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
    borderRadius: token.borderRadius,
    fontSize: token.fontSize,
    lineHeight: `${token.lineHeight}`,
    ...genPlaceholderStyle(token.colorTextPlaceholder),

    '&:hover': {
      ...genHoverStyle(token),
    },

    '&:focus': {
      ...genActiveStyle(token),
    },

    'textarea&': {
      maxWidth: '100%',
      height: 'auto',
    },
  }
}

function genInputGroupStyle(token) {
  const { componentCls } = token
  return {
    position: 'relative',
    display: 'table',
    width: '100%',

    [`${componentCls}-group`]: {
      '&-addon, &-wrap': {
        display: 'table-cell',
        width: 1,
      },

      '&-addon': {
        position: 'relative',
        padding: `0 ${token.inputPaddingHorizontal}px`,
        whiteSpace: 'nowrap',
        background: token.colorFillAlter,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        borderRadius: token.borderRadius,
        fontSize: token.fontSize,

        '&:first-child': {
          borderInlineEnd: 0,
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },

        '&:last-child': {
          borderInlineStart: 0,
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
        },
      },
    },

    [componentCls]: {
      display: 'table-cell',
      borderRadius: 0,
    },
  }
}

function genInputStyle(token): CSSObject {
  const { componentCls } = token
  return {
    [`${componentCls}`]: {
      ...genBasicInputStyle(token),
    },
  }
}

function genTextAreaStyle(token): CSSObject {
  const { componentCls } = token
  const textareaPrefixCls = `${componentCls}-textarea`
  return {
    [textareaPrefixCls]: {},
  }
}

function genAffixStyle(token) {
  const { componentCls, inputAffixPadding } = token
  return {
    [`${componentCls}-affix-wrapper`]: {
      display: 'inline-flex',
      ...genBasicInputStyle(token),

      ['input']: {
        padding: 0,
        border: 'none',
      },

      [`${componentCls}`]: {
        '&-prefix': {
          marginRight: inputAffixPadding,
        },

        '&-prefix,&-suffix': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  }
}

function genGroupStyle(token) {
  const { componentCls } = token

  return {
    [`${componentCls}-group`]: {
      ...genInputGroupStyle(token),
      '&-wrapper': {
        display: 'inline-block',
        width: '100%',
      },
    },
  }
}

function genSearchInputStyle(token) {
  const { componentCls } = token
  const searchPrefixCls = `${componentCls}-search`

  return {
    [searchPrefixCls]: {
      [`> ${componentCls}-group`]: {
        [`> ${componentCls}-group-addon:last-child`]: {
          padding: 0,
          border: 0,

          [`${searchPrefixCls}-button`]: {
            borderStartStartRadius: 0,
            borderStartEndRadius: token.borderRadiusSM,
            borderEndEndRadius: token.borderRadiusSM,
            borderEndStartRadius: 0,
          },
        },
      },
    },
  }
}

function genAllowClearStyle(token: InputToken) {
  const { componentCls } = token
  return {
    [`${componentCls}-clear-icon`]: {
      fontSize: token.fontSizeIcon,
      color: token.colorTextQuaternary,
      cursor: 'pointer',
      '&-hidden': {
        visibility: 'hidden',
      },

      '&:hover': {
        color: token.colorTextTertiary,
      },
    },
  }
}

export default genComponentStyleHook('Input', (token) => {
  const {
    lineWidth,
    paddingXXS,
    controlHeight,
    controlHeightLG,
    fontSize,
    fontSizeLG,
    lineHeight,
    lineHeightLG,
    controlHeightSM,
    paddingSM,
    paddingXS,
    controlPaddingHorizontal,
    colorPrimaryHover,
  } = token

  const inputToken = mergeToken<InputToken>(token, {
    inputPaddingVertical: Math.max(
      Math.round(((controlHeight - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      3,
    ),
    inputPaddingVerticalLG:
      Math.ceil(((controlHeightLG - fontSizeLG * lineHeightLG) / 2) * 10) / 10 - lineWidth,
    inputPaddingVerticalSM: Math.max(
      Math.round(((controlHeightSM - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      0,
    ),
    inputPaddingHorizontal: paddingSM - lineWidth,
    inputPaddingHorizontalSM: paddingXS - lineWidth,
    inputPaddingHorizontalLG: controlPaddingHorizontal - lineWidth,
    inputBorderHoverColor: colorPrimaryHover,
    inputBorderActiveColor: colorPrimaryHover,
    inputAffixPadding: token.paddingXXS,
  })
  return [
    genInputStyle(inputToken),
    genTextAreaStyle(inputToken),
    genAffixStyle(inputToken),
    genGroupStyle(inputToken),
    genSearchInputStyle(inputToken),
    genAllowClearStyle(inputToken),
  ]
})
