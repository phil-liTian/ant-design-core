import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

interface RadioToken extends FullToken<'Radio'> {
  radioSize: number
  radioCheckedColor: string
  dotPadding: number
  radioDotSize: number
  radioButtonPaddingHorizontal: number
}

const getRadioBasicStyle = (token): CSSObject => {
  const { componentCls, radioSize, radioCheckedColor, colorWhite, colorBorder, radioDotSize } =
    token

  const radioInnerPrefixCls = `${componentCls}-inner`

  return {
    [`${componentCls}-wrapper`]: {
      display: 'inline-flex',
      alignItems: 'center',

      [`${componentCls}`]: {
        [`${componentCls}-inner`]: {
          '&:after': {
            position: 'absolute',
            display: 'block',
            content: '""',
            width: `${radioSize}px`,
            height: `${radioSize}px`,
            borderRadius: `${radioSize}px`,
            backgroundColor: colorWhite,
            transform: 'scale(0)',
            // opacity: 0,
            // ltr
            insetBlockStart: '50%', // top
            insetInlineStart: '50%', // left
            borderBlockStart: 0, // border-top
            borderInlineStart: 0, // border-left
            marginBlockStart: `${radioSize / -2}px`, // margin-top
            marginInlineStart: `${radioSize / -2}px`, // margin-left
            transition: `all ${token.motionDurationSlow}`,
          },

          '&:hover': {
            borderColor: token.colorPrimary,
          },

          position: 'relative',
          display: 'block',
          borderRadius: '50%',
          width: `${radioSize}px`,
          height: `${radioSize}px`,
          border: `${token.lineWidth}px solid ${colorBorder}}`,
        },

        [`${componentCls}-input`]: {
          position: 'absolute',
          opacity: 0,
          // zIndex: 1,
        },

        [`span + *`]: {
          paddingInlineStart: `${token.paddingXS}px`,
          paddingInlineEnd: `${token.paddingXS}px`,
        },
      },

      [`${componentCls}-checked`]: {
        [`${radioInnerPrefixCls}`]: {
          borderColor: radioCheckedColor,
          background: radioCheckedColor,

          '&:after': {
            transform: `scale(${radioDotSize / radioSize}) !important`,
            opacity: 1,
          },
        },
      },
    },
  }
}

const genRadioButtonStyle = (token): CSSObject => {
  const { componentCls, radioButtonPaddingHorizontal, borderRadius, controlHeight, lineWidth } =
    token
  return {
    [`${componentCls}-button-wrapper`]: {
      position: 'relative',
      display: 'inline-block',
      height: `${controlHeight}px`,
      lineHeight: `${controlHeight - lineWidth * 2}px`,
      border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      borderInlineStartWidth: 0,
      borderInlineEndWidth: `${lineWidth}px`,
      paddingInline: `${radioButtonPaddingHorizontal}px`,

      [`${componentCls}-button`]: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        height: '100%',
        [`${componentCls}-inner, input[type='radio']`]: {
          width: 0,
          height: 0,
          opacity: 0,
        },
      },

      '&:not(:first-child)': {
        '&::before': {
          position: 'absolute',
          content: '""',
          width: 0,
          height: '100%',
          paddingBlock: `${lineWidth}px`,
          insetBlockStart: `-${lineWidth}px`,
          insetInlineStart: `-${lineWidth}px`,
          backgroundColor: token.colorBorder,
        },
      },

      '&:first-child': {
        borderInlineStartWidth: `${token.lineWidth}px`,
        borderStartStartRadius: `${borderRadius}px`,
        borderEndStartRadius: `${borderRadius}px`,
      },

      '&:last-child': {
        borderStartEndRadius: `${borderRadius}px`,
        borderEndEndRadius: `${borderRadius}px`,
      },

      '&-checked': {
        borderColor: token.colorPrimary,

        '&::before': {
          width: '1px !important',
          backgroundColor: `${token.colorPrimary} !important`,
        },

        '&:first-child': {
          borderColor: token.colorPrimary,
        },
      },
    },
  }
}

export default genComponentStyleHook('Button', (token) => {
  const { fontSizeLG, colorPrimary, padding, lineWidth } = token
  const radioSize = fontSizeLG
  const dotPadding = 4

  const radioToken = mergeToken<RadioToken>(token, {
    radioSize,
    radioCheckedColor: colorPrimary,
    dotPadding,
    radioDotSize: radioSize - (dotPadding + token.lineWidth) * 2,
    radioButtonPaddingHorizontal: padding - lineWidth,
  })

  return [genRadioButtonStyle(radioToken), getRadioBasicStyle(radioToken)]
})
